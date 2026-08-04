import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const url = `https://kontrolyaut.lovable.app/blog/${params.slug}`;
    const title = "Článek z blogu | KontrolyAut";
    const description = "Rady a zkušenosti z kontrol ojetých vozů před koupí.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BlogPost,
});


function BlogPost() {
  const { slug } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });
  if (isLoading) return <div className="container-page py-20">Načítám…</div>;
  if (error || !data) return <div className="container-page py-20">Článek nenalezen.</div>;

  return (
    <article className="container-page py-16 max-w-3xl">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Zpět na blog
      </Link>
      {data.cover_image_url && (
        <img src={data.cover_image_url} alt={data.title} className="w-full rounded-2xl mb-8 aspect-[16/9] object-cover" />
      )}
      <h1 className="text-4xl md:text-5xl font-bold">{data.title}</h1>
      {data.excerpt && <p className="mt-4 text-lg text-muted-foreground">{data.excerpt}</p>}
      <div className="prose prose-slate max-w-none mt-8 whitespace-pre-line text-foreground/90 leading-relaxed">
        {data.content}
      </div>
    </article>
  );
}
