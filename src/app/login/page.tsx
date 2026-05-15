"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciais inválidas. Tente novamente.");
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8 text-center border-b border-border bg-muted/20">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <Stethoscope className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground">BioMédica</h1>
          <p className="text-sm text-muted-foreground mt-1">Portal Acadêmico Integrado</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-xs text-warning text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                E-mail Institucional
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none placeholder:text-muted-foreground/50"
                placeholder="aluno@biomedica.edu.br"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none placeholder:text-muted-foreground/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Autenticando..." : "Entrar no Portal"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
