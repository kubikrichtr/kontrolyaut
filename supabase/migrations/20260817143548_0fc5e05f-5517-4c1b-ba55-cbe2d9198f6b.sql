REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "public read blog" ON public.blog_posts;
CREATE POLICY "anon read published blog" ON public.blog_posts FOR SELECT TO anon USING (published = true);
CREATE POLICY "auth read blog" ON public.blog_posts FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "public read faq" ON public.faq_items;
CREATE POLICY "anon read published faq" ON public.faq_items FOR SELECT TO anon USING (published = true);
CREATE POLICY "auth read faq" ON public.faq_items FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "public read realized" ON public.realized_inspections;
CREATE POLICY "anon read published realized" ON public.realized_inspections FOR SELECT TO anon USING (published = true);
CREATE POLICY "auth read realized" ON public.realized_inspections FOR SELECT TO authenticated USING (published = true OR public.has_role(auth.uid(), 'admin'::app_role));

REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;