"use client";

import { useState } from "react";
import { toggleUserCourseAccess, createUser } from "@/app/admin/actions";
import { Lock, Unlock, User, CheckCircle2, LogOut, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  completedTopicsCount: number;
  accesses: number[];
};

export function AdminPanel({ initialUsers, parts }: { initialUsers: AdminUser[], parts: { id: number, title: string }[] }) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserAccesses, setNewUserAccesses] = useState<number[]>([]);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");

  const handleToggleAccess = async (userId: string, partId: number, hasAccess: boolean) => {
    const actionId = `${userId}-${partId}`;
    setLoadingIds(prev => [...prev, actionId]);
    
    try {
      await toggleUserCourseAccess(userId, partId, hasAccess);
      
      setUsers(prev => prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            accesses: hasAccess 
              ? u.accesses.filter(id => id !== partId) 
              : [...u.accesses, partId]
          };
        }
        return u;
      }));
    } catch (e) {
      console.error(e);
      alert("Erro ao alterar acesso.");
    } finally {
      setLoadingIds(prev => prev.filter(id => id !== actionId));
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError("");
    try {
      await createUser({
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        initialAccesses: newUserAccesses
      });
      // Apenas recarrega a página para puxar os dados atualizados do banco
      window.location.reload();
    } catch (error: any) {
      setCreateError(error.message || "Erro ao criar usuário");
      setCreateLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg font-bold text-sm"
        >
          <Plus className="w-4 h-4" />
          Novo Aluno
        </button>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors rounded-lg font-bold text-sm"
        >
          <LogOut className="w-4 h-4" />
          Sair do Sistema
        </button>
      </div>

      {users.map((user) => (
        <div key={user.id} className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-foreground">{user.completedTopicsCount} tópicos concluídos</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Controle Curricular (Semestres)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {parts.map(part => {
                const hasAccess = user.accesses.includes(part.id);
                const isLoading = loadingIds.includes(`${user.id}-${part.id}`);

                return (
                  <button
                    key={part.id}
                    disabled={isLoading}
                    onClick={() => handleToggleAccess(user.id, part.id, hasAccess)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                      hasAccess 
                        ? "bg-primary/5 border-primary/30 hover:bg-primary/10" 
                        : "bg-muted/30 border-border hover:bg-muted/80",
                      isLoading && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span className={cn(
                      "text-xs font-bold truncate pr-2",
                      hasAccess ? "text-primary" : "text-muted-foreground"
                    )}>
                      {part.title.replace(/^\d+º Semestre — /, "")}
                    </span>
                    {hasAccess ? (
                      <Unlock className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowCreateModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Matricular Aluno</h2>
                    <p className="text-xs text-muted-foreground">Crie um novo acesso e defina a grade</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 scrollbar-thin flex-1">
                <form id="createUserForm" onSubmit={handleCreateUser} className="space-y-6">
                  {createError && (
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-xs text-warning text-center font-medium">
                      {createError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        required
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none placeholder:text-muted-foreground/50"
                        placeholder="Nome do aluno"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        required
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none placeholder:text-muted-foreground/50"
                        placeholder="aluno@instituicao.br"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                      Senha Provisória
                    </label>
                    <input
                      type="password"
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none placeholder:text-muted-foreground/50"
                      placeholder="Deixe em branco para usar 'aluno123'"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                      Grade Curricular Inicial (Semestres Liberados)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {parts.map(part => (
                        <label key={part.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded text-primary focus:ring-primary border-border bg-muted/50"
                            checked={newUserAccesses.includes(part.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewUserAccesses(prev => [...prev, part.id]);
                              } else {
                                setNewUserAccesses(prev => prev.filter(id => id !== part.id));
                              }
                            }}
                          />
                          <span className="text-xs font-medium text-foreground">
                            {part.title.replace(/^\d+º Semestre — /, "")}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-4 border-t border-border bg-muted/30 flex justify-end flex-shrink-0">
                <button
                  type="submit"
                  form="createUserForm"
                  disabled={createLoading}
                  className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {createLoading ? "Criando..." : "Matricular Aluno"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
