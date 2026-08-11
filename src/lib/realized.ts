/**
 * Realizované kontroly se čtou přímo ze sdílené databáze CARS-EU,
 * kde je spravuje admin menu cars-eu.cz (source_site = "kontrolyaut").
 */
const CARS_EU_URL = "https://ajafqafoonxoubbhcxnk.supabase.co";
const CARS_EU_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZxYWZvb254b3ViYmhjeG5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNzM1NTQsImV4cCI6MjA4MzY0OTU1NH0.j5SJwClkiZD_fIVTI4UBKRK2Z76ykMuk1HLF169c-6A";

export interface RealizedInspection {
  id: string;
  title: string;
  customer_name: string | null;
  description: string | null;
  images: string[] | null;
  completed_at: string | null;
}

export async function fetchRealizedInspections(): Promise<RealizedInspection[]> {
  const params = new URLSearchParams({
    select: "id,title,customer_name,description,images,completed_at",
    source_site: "eq.kontrolyaut",
    is_published: "is.true",
    order: "sort_order.asc,completed_at.desc",
    limit: "8",
  });
  const res = await fetch(`${CARS_EU_URL}/rest/v1/realized_inspections?${params.toString()}`, {
    headers: { apikey: CARS_EU_ANON, Authorization: `Bearer ${CARS_EU_ANON}` },
  });
  if (!res.ok) throw new Error(`realized_inspections ${res.status}`);
  return (await res.json()) as RealizedInspection[];
}
