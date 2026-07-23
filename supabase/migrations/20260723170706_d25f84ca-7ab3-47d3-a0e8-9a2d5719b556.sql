
-- User roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile upsert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Orders (kontroly objedn\u00e1vky)
CREATE TABLE public.inspection_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  car_brand TEXT NOT NULL,
  car_model TEXT,
  car_year INT,
  car_url TEXT,
  location TEXT,
  preferred_date DATE,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  source_site TEXT NOT NULL DEFAULT 'kontrolyaut.cz',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.inspection_orders TO anon, authenticated;
GRANT UPDATE, DELETE ON public.inspection_orders TO authenticated;
GRANT ALL ON public.inspection_orders TO service_role;
ALTER TABLE public.inspection_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can create order" ON public.inspection_orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "own orders read" ON public.inspection_orders FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin updates" ON public.inspection_orders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin delete" ON public.inspection_orders FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Realizovan\u00e9 kontroly
CREATE TABLE public.realized_inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  car_brand TEXT NOT NULL,
  car_model TEXT NOT NULL,
  year INT,
  image_url TEXT,
  score INT,
  score_label TEXT DEFAULT 'BODY',
  summary TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.realized_inspections TO anon, authenticated;
GRANT ALL ON public.realized_inspections TO authenticated, service_role;
ALTER TABLE public.realized_inspections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read realized" ON public.realized_inspections FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin write realized" ON public.realized_inspections FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- FAQ
CREATE TABLE public.faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faq_items TO anon, authenticated;
GRANT ALL ON public.faq_items TO authenticated, service_role;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read faq" ON public.faq_items FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin write faq" ON public.faq_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Blog
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT ALL ON public.blog_posts TO authenticated, service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read blog" ON public.blog_posts FOR SELECT TO anon, authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin write blog" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed FAQ
INSERT INTO public.faq_items (question, answer, sort_order) VALUES
('Kolik stojí kontrola ojetého vozu?', 'Základní kontrola ojetého vozu stojí 2 490 Kč včetně DPH. Součástí je diagnostika elektroniky, kontrola karoserie, podvozku, motoru a testovací jízda.', 1),
('Jak dlouho kontrola trvá?', 'Standardní kontrola trvá 60–90 minut. Výsledek a doporučení dostanete okamžitě na místě a písemný protokol e-mailem do 24 hodin.', 2),
('Jaké vozy kontrolujete?', 'Kontrolujeme všechny osobní vozy do 3,5 t, benzín, diesel, hybrid i elektromobil. Pro elektromobily nabízíme také samostatný test baterie.', 3),
('Kde kontroly provádíte?', 'Působíme po celé ČR. Přijedeme přímo za prodejcem – k autobazaru, do servisu nebo na adresu soukromého prodejce.', 4),
('Co všechno kontrolujete?', 'Kontrolujeme přes 100 bodů – historii vozu (VIN, servisní záznamy, tachometr), technický stav (motor, převodovka, podvozek, brzdy), karoserii (lak, tmely, koroze), interiér a elektroniku.', 5),
('Dostanu písemný protokol?', 'Ano. Po kontrole dostanete detailní protokol s fotografiemi a doporučením, zda vůz koupit, nebo se mu vyhnout.', 6);

INSERT INTO public.realized_inspections (title, car_brand, car_model, year, image_url, score, score_label, summary) VALUES
('Škoda Octavia III 2.0 TDI', 'Škoda', 'Octavia III', 2018, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', 87, 'BODY', 'Bez skrytých závad, doporučeno ke koupi.'),
('BMW 320d F30', 'BMW', '320d', 2017, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', 78, 'BODY', 'Menší závady na podvozku, doporučena sleva.'),
('Volkswagen Passat B8', 'Volkswagen', 'Passat B8', 2019, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', 92, 'BODY', 'Skvělý stav, plná servisní historie.'),
('Audi A4 B9 2.0 TDI', 'Audi', 'A4 B9', 2018, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 84, 'BODY', 'Kvalitní vůz bez závažných problémů.');

INSERT INTO public.blog_posts (slug, title, excerpt, content, cover_image_url, published, published_at) VALUES
('na-co-si-dat-pozor-pri-koupi-ojeteho-vozu', 'Na co si dát pozor při koupi ojetého vozu', 'Nejčastější chyby kupujících a jak se jim vyhnout.', E'# Na co si dát pozor při koupi ojetého vozu\n\nKoupě ojetého vozu je zásadní rozhodnutí. V tomto článku najdete přehled nejdůležitějších bodů, které byste měli před podpisem smlouvy prověřit.\n\n## 1. Historie vozu\nZkontrolujte VIN, servisní knihu a záznamy o nehodách.\n\n## 2. Stáčený tachometr\nAž třetina ojetých vozů v ČR má stočený tachometr. Ověřte kilometry v STK databázi.\n\n## 3. Technický stav\nMotor, převodovka, podvozek, brzdy – to všechno je potřeba prověřit odborníkem.', 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200', true, now()),
('proc-si-nechat-udelat-nezavislou-kontrolu', 'Proč si nechat udělat nezávislou kontrolu vozu', 'Ušetříte desítky tisíc a nervy.', E'# Nezávislá kontrola se vyplatí\n\nProdejci znají triky, jak zamaskovat závady. Nezávislý technik odhalí to, co běžný kupující nevidí.\n\n- Diagnostika elektroniky\n- Měření tloušťky laku\n- Kontrola podvozku na zvedáku\n- Testovací jízda', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200', true, now());
