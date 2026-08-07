GRANT SELECT ON public.faq_items TO anon, authenticated;
GRANT SELECT ON public.realized_inspections TO anon, authenticated;
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT ALL ON public.faq_items TO service_role;
GRANT ALL ON public.realized_inspections TO service_role;
GRANT ALL ON public.blog_posts TO service_role;