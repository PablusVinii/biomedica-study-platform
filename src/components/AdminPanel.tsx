"use client";

import { useState } from "react";
import { toggleUserCourseAccess, createUser } from "@/app/admin/actions";
import { updateCourseTopic, updateCourseBlock, createCourseTopic } from "@/app/admin/curriculum-actions";
import { Lock, Unlock, User, CheckCircle2, LogOut, Plus, X, BookOpen, Settings2, Edit2, PlayCircle, Save, Trash2, ChevronRight, ChevronDown } from "lucide-react";
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

export function AdminPanel({ 
  initialUsers, 
  parts, 
  curriculum 
}: { 
  initialUsers: AdminUser[], 
  parts: { id: number, title: string }[],
  curriculum: any[]
}) {
  const [activeTab, setActiveTab] = useState<"users" | "content">("users");
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

  const [expandedParts, setExpandedParts] = useState<number[]>([]);
  const [expandedBlocks, setExpandedBlocks] = useState<number[]>([]);
  const [editingTopic, setEditingTopic] = useState<any>(null);
  const [editingBlock, setEditingBlock] = useState<any>(null);

  const togglePart = (id: number) => {
    setExpandedParts(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleBlock = (id: number) => {
    setExpandedBlocks(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex p-1 bg-muted rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("users")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
            activeTab === "users" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <User className="w-4 h-4" />
          Gestão de Alunos
        </button>
        <button
          onClick={() => setActiveTab("content")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
            activeTab === "content" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <BookOpen className="w-4 h-4" />
          Gestão de Conteúdo
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        {activeTab === "users" ? (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg font-bold text-sm"
          >
            <Plus className="w-4 h-4" />
            Novo Aluno
          </button>
        ) : (
          <div></div> // Spacer
        )}

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors rounded-lg font-bold text-sm"
        >
          <LogOut className="w-4 h-4" />
          Sair do Sistema
        </button>
      </div>

      {activeTab === "users" ? (
        <div className="space-y-6">
          {users.map((user) => (
            <div key={user.id} className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
              {/* Existing user row content... */}
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
        </div>
      ) : (
        <div className="space-y-4">
          {curriculum.map((part) => (
            <div key={part.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => togglePart(part.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Settings2 className="w-5 h-5 text-primary" />
                  <span className="font-black text-foreground">{part.title}</span>
                </div>
                {expandedParts.includes(part.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>

              <AnimatePresence>
                {expandedParts.includes(part.id) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-border/50"
                  >
                    <div className="p-4 space-y-3 bg-muted/20">
                      {part.blocks.map((block: any) => (
                        <div key={block.id} className="bg-background border border-border/60 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleBlock(block.id)}
                            className="w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors"
                          >
                            <span className="text-sm font-bold text-foreground">{block.title}</span>
                            <div className="flex items-center gap-2 pr-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingBlock(block);
                                }}
                                className="p-1.5 hover:bg-primary/20 rounded-lg transition-all"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-primary" />
                              </button>
                              {expandedBlocks.includes(block.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </div>
                          </button>

                          <AnimatePresence>
                            {expandedBlocks.includes(block.id) && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                className="overflow-hidden border-t border-border/40"
                              >
                                <div className="p-2 space-y-1">
                                  {block.topics.map((topic: any) => (
                                    <div key={topic.id} className="flex items-center justify-between p-2 hover:bg-muted/20 rounded-md group">
                                      <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-foreground">{topic.title}</span>
                                        {topic.videoUrl && (
                                          <div className="flex items-center gap-1 text-[10px] text-accent font-bold">
                                            <PlayCircle className="w-3 h-3" />
                                            Vídeo Ativo
                                          </div>
                                        )}
                                      </div>
                                      <button
                                        onClick={() => setEditingTopic(topic)}
                                        className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-primary/20 rounded transition-all"
                                      >
                                        <Edit2 className="w-3.5 h-3.5 text-primary" />
                                      </button>
                                    </div>
                                  ))}
                                  <button 
                                    onClick={() => setEditingTopic({ blockId: block.id, title: "", videoUrl: "", content: "", isNew: true })}
                                    className="w-full mt-2 p-2 border border-dashed border-border rounded-md text-[10px] font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-1"
                                  >
                                    <Plus className="w-3 h-3" />
                                    Adicionar Aula / Tema
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

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

      <AnimatePresence>
        {/* Topic Editor Modal */}
        {editingTopic && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setEditingTopic(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Edit2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{editingTopic.isNew ? "Adicionar Aula" : "Editar Aula"}</h2>
                    <p className="text-xs text-muted-foreground">{editingTopic.isNew ? "Crie um novo tópico de estudo" : "Ajuste o conteúdo e o link do vídeo"}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingTopic(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Título do Tema
                  </label>
                  <input
                    type="text"
                    value={editingTopic.title}
                    onChange={(e) => setEditingTopic({ ...editingTopic, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    URL do Vídeo (YouTube)
                  </label>
                  <div className="relative">
                    <PlayCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={editingTopic.videoUrl || ""}
                      onChange={(e) => setEditingTopic({ ...editingTopic, videoUrl: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none"
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    O aluno poderá assistir à aula diretamente no portal.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Conteúdo Programático (Markdown)
                  </label>
                  <textarea
                    value={editingTopic.content || ""}
                    onChange={(e) => setEditingTopic({ ...editingTopic, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none resize-none scrollbar-thin"
                    placeholder="Descreva o conteúdo do tema..."
                  />
                </div>
              </div>

              <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-3">
                <button
                  onClick={() => setEditingTopic(null)}
                  className="px-6 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-all"
                >
                  Cancelar
                </button>
                  <button
                  onClick={async () => {
                    setCreateLoading(true);
                    try {
                      if (editingTopic.isNew) {
                        await createCourseTopic(editingTopic.blockId, {
                          title: editingTopic.title,
                          videoUrl: editingTopic.videoUrl,
                          content: editingTopic.content
                        });
                      } else {
                        await updateCourseTopic(editingTopic.id, {
                          title: editingTopic.title,
                          videoUrl: editingTopic.videoUrl,
                          content: editingTopic.content
                        });
                      }
                      setEditingTopic(null);
                      window.location.reload();
                    } catch (e) {
                      alert("Erro ao salvar aula.");
                    } finally {
                      setCreateLoading(false);
                    }
                  }}
                  disabled={createLoading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {createLoading ? "Salvando..." : (editingTopic.isNew ? "Criar Aula" : "Salvar Alterações")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      <AnimatePresence>
        {/* Block Editor Modal */}
        {editingBlock && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setEditingBlock(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Edit2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Editar Bloco / Tema</h2>
                    <p className="text-xs text-muted-foreground">Ajuste o título principal do conjunto de aulas</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingBlock(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Título do Bloco (Tema da Aula)
                  </label>
                  <input
                    type="text"
                    value={editingBlock.title}
                    onChange={(e) => setEditingBlock({ ...editingBlock, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none"
                    placeholder="Ex: Fundamentos de Engenharia de Software"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Descrição Curta / Introdução
                  </label>
                  <textarea
                    value={editingBlock.content || ""}
                    onChange={(e) => setEditingBlock({ ...editingBlock, content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm outline-none resize-none"
                    placeholder="Uma breve introdução sobre o que será visto neste bloco..."
                  />
                </div>
              </div>

              <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-3">
                <button
                  onClick={() => setEditingBlock(null)}
                  className="px-6 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    setCreateLoading(true);
                    try {
                      await updateCourseBlock(editingBlock.id, {
                        title: editingBlock.title,
                        content: editingBlock.content
                      });
                      setEditingBlock(null);
                      window.location.reload();
                    } catch (e) {
                      alert("Erro ao salvar bloco.");
                    } finally {
                      setCreateLoading(false);
                    }
                  }}
                  disabled={createLoading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {createLoading ? "Salvando..." : "Salvar Bloco"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

