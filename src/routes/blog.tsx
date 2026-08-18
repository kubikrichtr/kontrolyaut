import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { carsEu, KONTROLY_SITES, type CarsEuBlogPost } from "@/lib/cars-eu-client";
import heroWorkshop from "@/assets/hero-workshop.png.asset.json";

const OG_IMAGE = `https://kontrolyaut.cz${heroWorkshop.url}`;

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog o kontrole ojetých vozů | KontrolyAut" },
      { name: "description", content: "Rady a tipy, jak nenaletět při koupi ojetého vozu — články od technika." },
      { property: "og:title", content: "Blog o kontrole ojetých vozů | KontrolyAut" },
      { property: "og:description", content: "Články o kontrole, výběru a koupi ojetých vozů." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kontrolyaut.cz/blog" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog o kontrole ojetých vozů | KontrolyAut" },
      { name: "twitter:description", content: "Články o kontrole, výběru a koupi ojetých vozů." },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://kontrolyaut.cz/blog" }],
  }),

  component: BlogList,
});

function BlogList() {
  const { data, isLoading } = useQuery({
    queryKey: ["carseu-blog"],
    queryFn: async () => {
      const { data, error } = await carsEu
        .from("blog_posts")
        .select("id, slug, title, perex, cover_image_url, category, published_at")
        .in("source_site", KONTROLY_SITES as unknown as string[])
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Pick<
        CarsEuBlogPost,
        "id" | "slug" | "title" | "perex" | "cover_image_url" | "category" | "published_at"
      >[];
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
        {!isLoading && (data ?? []).length === 0 && (
          <p className="text-muted-foreground">Zatím zde nejsou žádné články.</p>
        )}
        {(data ?? []).map((p) => (
          <Link
            key={p.id}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group rounded-2xl overflow-hidden border border-border bg-white hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all"
          >
            <div className="aspect-[16/9] bg-muted overflow-hidden">
              {p.cover_image_url && (
                <img
                  src={p.cover_image_url}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>
            <div className="p-5">
              {p.category && (
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</span>
              )}
              <h2 className="mt-1 font-semibold text-lg line-clamp-2 group-hover:text-primary transition">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.perex}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
