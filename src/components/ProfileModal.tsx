"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, ShieldCheck } from "lucide-react";
import { updateProfile } from "@/app/actions";
import { useSession } from "next-auth/react";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProfileModal({ open, onClose }: ProfileModalProps) {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await updateProfile({ name, password });
      setMessage({ text: "Perfil atualizado com sucesso!", type: "success" });
      setPassword(""); // Clear password field
      
      // Update the local session if possible so the UI reflects the new name
      await update({ name });
      
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 2000);
    } catch (error) {
      setMessage({ text: "Erro ao atualizar perfil.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Meu Perfil</h2>
                  <p className="text-xs text-muted-foreground">Gerencie seus dados e credenciais</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {message && (
                <div className={`p-3 rounded-lg text-xs font-medium text-center border ${
                  message.type === "success" 
                    ? "bg-green-500/10 text-green-500 border-green-500/20" 
                    : "bg-destructive/10 text-destructive border-destructive/20"
                }`}>
                  {message.text}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    E-mail Institucional (Fixo)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={session?.user?.email || ""}
                    className="w-full px-4 py-3 rounded-xl bg-muted/80 border border-border text-sm outline-none cursor-not-allowed opacity-70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Nome de Exibição
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none placeholder:text-muted-foreground/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none placeholder:text-muted-foreground/50"
                    placeholder="Deixe em branco para não alterar"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Preencha apenas se quiser trocar a senha atual.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
