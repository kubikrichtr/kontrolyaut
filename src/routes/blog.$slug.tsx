import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";

const SITE = "https://kontrolyaut.lovable.app";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw error;
    if (!data) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => {
    const url = `${SITE}/blog/${params.slug}`;
    const title = loaderData?.title
      ? `${loaderData.title} | KontrolyAut`.slice(0, 60)
      : "Článek z blogu | KontrolyAut";
    const description =
      loaderData?.excerpt?.slice(0, 158) ??
      (loaderData?.content ? loaderData.content.replace(/\s+/g, " ").slice(0, 158) : null) ??
      "Rady a zkušenosti z kontrol ojetých vozů před koupí.";
    const image = loaderData?.cover_image_url ?? undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(image ? [{ property: "og:image", content: image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(image ? [{ name: "twitter:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: loaderData
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: loaderData.title,
                description,
                image: image ? [image] : undefined,
                datePublished: loaderData.published_at ?? loaderData.created_at,
                mainEntityOfPage: url,
                author: { "@type": "Person", name: "Lukáš Doubek" },
                publisher: { "@type": "Organization", name: "KontrolyAut", url: SITE },
              }),
            },
          ]
        : [],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const data = Route.useLoaderData();
  if (!data) return <div className="container-page py-20">Článek nenalezen.</div>;

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
