import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog o kontrole ojetých vozů | KontrolyAut" },
      { name: "description", content: "Rady a tipy, jak nenaletět při koupi ojetého vozu." },
      { property: "og:title", content: "Blog | KontrolyAut" },
      { property: "og:description", content: "Články o kontrole a koupi ojetých vozů." },
    ],
  }),
  component: BlogList,
});

function BlogList() {
  const { data, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_image_url, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  return (
    <section className="container-page py-16">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold tracking-wider uppercase text-primary">Blog</span>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Články a rady</h1>
        <p className="mt-4 text-muted-foreground">Praktické tipy pro každého, kdo kupuje ojetý vůz.</p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && <p>Načítám…</p>}
        {(data ?? []).map((p) => (
          <Link
            key={p.id}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group rounded-2xl overflow-hidden border border-border bg-white hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all"
          >
            <div className="aspect-[16/9] bg-muted overflow-hidden">
              {p.cover_image_url && (
                <img src={p.cover_image_url} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              )}
            </div>
            <div className="p-5">
              <h2 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
