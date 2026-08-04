import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import logoAsset from "@/assets/kontroly-logo.svg.asset.json";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Přihlášení do klientské zóny | KontrolyAut" },
      { name: "description", content: "Přihlaste se do klientské zóny KontrolyAut a sledujte stav svých objednaných kontrol." },
      { property: "og:title", content: "Přihlášení do klientské zóny | KontrolyAut" },
      { property: "og:description", content: "Klientská zóna KontrolyAut — přehled objednaných kontrol vozů." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kontrolyaut.lovable.app/auth" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Přihlášení do klientské zóny | KontrolyAut" },
      { name: "twitter:description", content: "Klientská zóna KontrolyAut." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://kontrolyaut.lovable.app/auth" }],
  }),

  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: window.location.origin, data: { full_name: name } },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Účet vytvořen. Můžete se přihlásit.");
      setMode("login");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      nav({ to: "/klient" });
    }
  }

  async function google() {
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (res.error) toast.error(res.error.message);
  }

  const inputCls = "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";
  return (
    <section className="container-page py-16 flex justify-center">
      <div className="w-full max-w-md rounded-3xl border border-border bg-white p-8 shadow-xl shadow-primary/5">
        <div className="flex justify-center mb-6"><img src={logoAsset.url} alt="" className="h-12" /></div>
        <div className="flex gap-2 p-1 rounded-full bg-muted mb-6">
          <button onClick={() => setMode("login")} className={`flex-1 py-2 rounded-full text-sm font-medium transition ${mode === "login" ? "bg-white shadow-sm" : "text-muted-foreground"}`}>Přihlášení</button>
          <button onClick={() => setMode("signup")} className={`flex-1 py-2 rounded-full text-sm font-medium transition ${mode === "signup" ? "bg-white shadow-sm" : "text-muted-foreground"}`}>Registrace</button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <input placeholder="Jméno a příjmení" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          )}
          <input required type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
          <input required type="password" placeholder="Heslo" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} minLength={6} />
          <button disabled={loading} className="btn-primary w-full">
            {loading ? "Pracuji…" : mode === "login" ? "Přihlásit se" : "Vytvořit účet"}
          </button>
        </form>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px bg-border flex-1" /> nebo <div className="h-px bg-border flex-1" />
        </div>
        <button onClick={google} className="btn-outline w-full">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.6 2.1 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.6c-.5 2.9-2.2 5.4-4.7 7l7.6 5.9c4.5-4.1 7-10.2 7-17.4z"/><path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C1 16.5 0 20.1 0 24s1 7.5 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2.1 1.4-4.8 2.3-7.6 2.3-6.3 0-11.6-4.1-13.5-9.7l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>
          Přihlásit přes Google
        </button>
      </div>
    </section>
  );
}
