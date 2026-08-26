import { createFileRoute, Link } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { carsEu, KONTROLY_SITES, type CarsEuBlogPost } from "@/lib/cars-eu-client";
import heroWorkshop from "@/assets/hero-workshop.png.asset.json";

const OG_IMAGE = `https://kontrolyaut.cz${heroWorkshop.url}`;

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();


export const Route = createFileRoute("/blog/")({
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

type BlogCard = Pick<
  CarsEuBlogPost,
  "id" | "slug" | "title" | "perex" | "cover_image_url" | "category" | "published_at"
>;

const PAGE_SIZE = 9;

function BlogList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["carseu-blog"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const from = (pageParam as number) * PAGE_SIZE;
      const { data, error } = await carsEu
        .from("blog_posts")
        .select("id, slug, title, perex, cover_image_url, category, published_at")
        .in("source_site", KONTROLY_SITES as unknown as string[])
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .range(from, from + PAGE_SIZE - 1);
      if (error) throw error;
      return (data ?? []) as BlogCard[];
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
  });

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const posts = useMemo(() => (data?.pages ?? []).flat(), [data]);
  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category).filter(Boolean) as string[])).sort(),
    [posts],
  );
  const filtered = useMemo(() => {
    const q = norm(query.trim());
    return posts.filter((p) => {
      if (category && p.category !== category) return false;
      if (!q) return true;
      return norm(`${p.title} ${p.perex ?? ""} ${p.category ?? ""}`).includes(q);
    });
  }, [posts, query, category]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) fetchNextPage();
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


  return (
    <section className="container-page py-16">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold tracking-wider uppercase text-primary">Blog</span>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Články a rady</h1>
        <p className="mt-4 text-muted-foreground">Praktické tipy pro každého, kdo kupuje ojetý vůz.</p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hledat v článcích…"
            aria-label="Hledat v článcích"
            className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory(null)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                category === null
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              Vše
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c === category ? null : c)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && <p>Načítám…</p>}
        {!isLoading && filtered.length === 0 && (
          <p className="text-muted-foreground">
            {posts.length === 0 ? "Zatím zde nejsou žádné články." : "Žádné články neodpovídají hledání."}
          </p>
        )}

        {filtered.map((p) => (
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
