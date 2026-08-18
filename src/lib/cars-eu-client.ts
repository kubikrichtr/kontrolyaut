import { createClient } from "@supabase/supabase-js";

// Sdílený backend Cars-EU (pouze veřejné čtení referencí)
const CARS_EU_URL = "https://ajafqafoonxoubbhcxnk.supabase.co";
const CARS_EU_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZxYWZvb254b3ViYmhjeG5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNzM1NTQsImV4cCI6MjA4MzY0OTU1NH0.j5SJwClkiZD_fIVTI4UBKRK2Z76ykMuk1HLF169c-6A";

export const carsEu = createClient(CARS_EU_URL, CARS_EU_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export type CarsEuReview = {
  id: string;
  customer_name: string | null;
  customer_location: string | null;
  car_name: string | null;
  rating: number | null;
  text: string | null;
  images: string[] | null;
  created_at: string;
};

// Blog: články spravované v admin menu CARS-EU, označené pro tento web
export const KONTROLY_SITES = ["kontrolyaut", "kontrolyaut.cz"] as const;

export type CarsEuBlogPost = {
  id: string;
  slug: string;
  title: string;
  perex: string | null;
  content: string;
  cover_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  status: string;
  published_at: string | null;
  author: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  created_at: string;
  source_site: string | null;
};
