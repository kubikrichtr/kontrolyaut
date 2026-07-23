import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/klient")({
  component: ClientZone,
});

function ClientZone() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? "");
      if (data.user) {
        const { data: r } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "admin")
          .maybeSingle();
        setIsAdmin(!!r);
      }
    })();
  }, []);

  const { data: orders } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inspection_orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  }

  return (
    <section className="container-page py-12">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Klientská zóna</h1>
          <p className="text-sm text-muted-foreground mt-1">Přihlášen jako {email}</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Link to="/admin" className="btn-outline">
              <ShieldCheck className="h-4 w-4" /> Admin
            </Link>
          )}
          <button onClick={signOut} className="btn-outline">
            <LogOut className="h-4 w-4" /> Odhlásit
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Vaše objednávky kontrol</h2>
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          {(orders?.length ?? 0) === 0 ? (
            <div className="p-8 text-sm text-muted-foreground text-center">Zatím nemáte žádné objednávky.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-3">Datum</th>
                  <th className="p-3">Vůz</th>
                  <th className="p-3">Termín</th>
                  <th className="p-3">Stav</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="p-3">{new Date(o.created_at).toLocaleDateString("cs-CZ")}</td>
                    <td className="p-3">{o.car_brand} {o.car_model}</td>
                    <td className="p-3">{o.preferred_date ?? "—"}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1">
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
