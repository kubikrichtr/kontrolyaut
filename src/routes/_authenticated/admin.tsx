import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

const OTHER_SITES = [
  { name: "Stavbaterie.cz", url: "https://stavbaterie.cz" },
  { name: "Cars-eu.cz", url: "https://cars-eu.cz" },
  { name: "KontrolyAut.cz", url: "/" },
];

function AdminPage() {
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return setIsAdmin(false);
      const { data } = await supabase
        .from("user_roles").select("role")
        .eq("user_id", u.user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
    })();
  }, []);

  const { data: orders } = useQuery({
    queryKey: ["admin-orders"],
    enabled: isAdmin === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inspection_orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isAdmin === null) return <div className="container-page py-16">Načítám…</div>;
  if (!isAdmin) {
    return (
      <div className="container-page py-16">
        <h1 className="text-2xl font-bold">Přístup zamítnut</h1>
        <p className="text-muted-foreground mt-2">Tato sekce je pouze pro administrátory. Kontaktujte správce, aby vám přidělil oprávnění.</p>
      </div>
    );
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("inspection_orders").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Stav aktualizován");
    qc.invalidateQueries({ queryKey: ["admin-orders"] });
  }

  return (
    <section className="container-page py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Administrace</h1>
          <p className="text-sm text-muted-foreground mt-1">Společné admin menu pro všechny 3 weby.</p>
        </div>
        <Link to="/klient" className="btn-outline">Zpět do klientské zóny</Link>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-3">Přepnout web</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {OTHER_SITES.map((s) => (
            <a key={s.name} href={s.url} target={s.url.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-border bg-white p-4 hover:border-primary hover:shadow-md transition">
              <span className="font-semibold">{s.name}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Objednávky kontrol</h2>
        <div className="rounded-2xl border border-border bg-white overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="p-3">Datum</th>
                <th className="p-3">Zákazník</th>
                <th className="p-3">Kontakt</th>
                <th className="p-3">Vůz</th>
                <th className="p-3">Termín</th>
                <th className="p-3">Zdroj</th>
                <th className="p-3">Stav</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((o) => (
                <tr key={o.id} className="border-t border-border align-top">
                  <td className="p-3 whitespace-nowrap">{new Date(o.created_at).toLocaleDateString("cs-CZ")}</td>
                  <td className="p-3">{o.full_name}</td>
                  <td className="p-3">
                    <div>{o.email}</div>
                    <div className="text-muted-foreground text-xs">{o.phone}</div>
                  </td>
                  <td className="p-3">{o.car_brand} {o.car_model}</td>
                  <td className="p-3">{o.preferred_date ?? "—"}</td>
                  <td className="p-3 text-xs text-muted-foreground">{o.source_site}</td>
                  <td className="p-3">
                    <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="rounded-md border border-border px-2 py-1 text-xs bg-white">
                      <option value="new">Nová</option>
                      <option value="confirmed">Potvrzená</option>
                      <option value="done">Dokončená</option>
                      <option value="cancelled">Zrušená</option>
                    </select>
                  </td>
                </tr>
              ))}
              {(orders?.length ?? 0) === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Žádné objednávky.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
