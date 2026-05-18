"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, CheckCircle2, Circle, AlertTriangle, FileText, X, GraduationCap, Link2, Save, ExternalLink, StickyNote, Tag, Plus, Lightbulb } from "lucide-react";
import { Block, Topic } from "@/lib/types";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { LearningPathSection } from "./LearningPathSection";
import { SafeLearningPath } from "./SafeLearningPath";

interface BlockCardProps {
  block: Block;
  isCompleted: (id: string) => boolean;
  toggleTopic: (id: string) => void;
  getBlockProgress: (ids: string[]) => number;
  notebookUrl?: string;
  onSaveNotebookUrl: (url: string) => void;
  note?: { title: string; content: string; tags: string[] };
  onSaveNote: (data: { title: string; content: string; tags: string[] }) => void;
}

export function BlockCard({ block, isCompleted, toggleTopic, getBlockProgress, notebookUrl, onSaveNotebookUrl, note, onSaveNote }: BlockCardProps) {
  const [open, setOpen] = useState(false);
  const [showBib, setShowBib] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [topicModalTab, setTopicModalTab] = useState<"content" | "learning-path">("content");
  const [showNotebookInput, setShowNotebookInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState(notebookUrl || "");
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [noteDraft, setNoteDraft] = useState({
    title: note?.title || "",
    content: note?.content || "",
    tags: note?.tags || []
  });
  const [newTag, setNewTag] = useState("");

  const topicIds = block.topics.map(t => t.id);
  const progress = getBlockProgress(topicIds);

  const handleSaveUrl = () => {
    onSaveNotebookUrl(urlDraft);
    setShowNotebookInput(false);
  };

  const handleSaveNote = () => {
    onSaveNote(noteDraft);
    setShowNoteEditor(false);
  };

  const addTag = () => {
    if (newTag.trim() && !noteDraft.tags.includes(newTag.trim())) {
      setNoteDraft(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setNoteDraft(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  // Parsing JSON data from DB if needed
  const highlights = typeof block.highlights === 'string' ? JSON.parse(block.highlights) : (block.highlights || []);
  const bibliography = typeof block.bibliography === 'string' ? JSON.parse(block.bibliography) : (block.bibliography || []);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 hover:bg-muted/40 transition-colors text-left"
      >
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors",
          progress === 100
            ? "bg-accent/20 text-accent"
            : progress > 0
            ? "bg-primary/20 text-primary"
            : "bg-muted text-muted-foreground"
        )}>
          {block.id}
        </div>
        <div className="flex-1 text-left min-w-0">
          <h3 className="text-sm font-semibold text-card-foreground truncate">{block.title}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden max-w-[220px]">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
                className={cn("h-full rounded-full", progress === 100 ? "bg-accent" : "bg-primary")}
              />
            </div>
            <span className="text-[11px] text-muted-foreground font-medium whitespace-nowrap">{progress}%</span>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border/40"
          >
            <div className="p-4 space-y-5">
              {/* Block Content (Intro) */}
              {block.content && (
                <div className="p-3 rounded-lg bg-muted/30 border border-border/50 text-xs text-muted-foreground leading-relaxed italic">
                  {block.content}
                </div>
              )}

              {/* Highlights / Callouts */}
              {highlights && highlights.length > 0 && (
                <div className="rounded-lg bg-warning/10 border border-warning/30 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-xs font-semibold text-warning">Ênfase Regulatória / Prática</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                  {highlights.map((h: string, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{h}</span>
                    </div>
                  ))}
                  </div>
                </div>
              )}

              {/* Topics checklist */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-1 block mb-2">
                  Módulos de Estudo
                </span>
                {block.topics.map((topic) => {
                  const done = isCompleted(topic.id);
                  return (
                    <div key={topic.id} className="flex items-center gap-2 group">
                      <button
                        onClick={() => toggleTopic(topic.id)}
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                          done ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {done ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setSelectedTopic(topic)}
                        className={cn(
                          "flex-1 flex items-center justify-between p-2.5 rounded-lg text-left transition-all duration-200",
                          done ? "bg-accent/5" : "hover:bg-muted/60"
                        )}
                      >
                        <span className={cn(
                          "text-xs leading-relaxed transition-colors",
                          done ? "text-accent font-medium" : "text-card-foreground font-medium"
                        )}>
                          {topic.title}
                        </span>
                        {topic.content && (
                          <FileText className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* NotebookLM URL */}
              <div className="pt-2 border-t border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    NotebookLM
                  </span>
                  <div className="flex items-center gap-2">
                    {notebookUrl && (
                      <a
                        href={notebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Abrir
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setUrlDraft(notebookUrl || "");
                        setShowNotebookInput(!showNotebookInput);
                      }}
                      className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      <Link2 className="w-3 h-3" />
                      {notebookUrl ? "Editar URL" : "Adicionar URL"}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {showNotebookInput && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-2 mt-1">
                        <input
                          type="url"
                          value={urlDraft}
                          onChange={(e) => setUrlDraft(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSaveUrl()}
                          placeholder="https://notebooklm.google.com/notebook/..."
                          className="flex-1 text-xs px-3 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors placeholder:text-muted-foreground/50"
                        />
                        <button
                          onClick={handleSaveUrl}
                          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-primary/20 text-primary text-xs font-bold hover:bg-primary/30 transition-colors"
                        >
                          <Save className="w-3 h-3" />
                          Salvar
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                  {notebookUrl && !showNotebookInput && (
                    <p className="text-[10px] text-muted-foreground/60 truncate mt-1">{notebookUrl}</p>
                  )}
                </div>

              {/* Module Notes Section */}
              <div className="pt-2 border-t border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <StickyNote className="w-3 h-3" />
                    Minhas Anotações
                  </span>
                  <button
                    onClick={() => {
                      setNoteDraft({
                        title: note?.title || "",
                        content: note?.content || "",
                        tags: note?.tags || []
                      });
                      setShowNoteEditor(!showNoteEditor);
                    }}
                    className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {note?.content ? "Editar Notas" : "Escrever Notas"}
                  </button>
                </div>

                <AnimatePresence>
                  {showNoteEditor && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden space-y-3 mt-2 p-3 rounded-xl bg-muted/30 border border-border"
                    >
                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                          Tema / Título
                        </label>
                        <input
                          type="text"
                          value={noteDraft.title}
                          onChange={(e) => setNoteDraft(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Ex: Conceitos Fundamentais de Fluidos"
                          className="w-full text-xs px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                          Assunto / Anotação
                        </label>
                        <textarea
                          value={noteDraft.content}
                          onChange={(e) => setNoteDraft(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="Escreva aqui o que você aprendeu..."
                          rows={4}
                          className="w-full text-xs px-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none scrollbar-thin"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                          Tags
                        </label>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {noteDraft.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                              {tag}
                              <button onClick={() => removeTag(tag)} className="hover:text-destructive transition-colors">
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                            <input
                              type="text"
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                              placeholder="Adicionar tag..."
                              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={addTag}
                            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => setShowNoteEditor(false)}
                          className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-muted-foreground hover:bg-muted transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSaveNote}
                          className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-[11px] font-bold hover:opacity-90 transition-opacity shadow-sm"
                        >
                          <Save className="w-3 h-3" />
                          Salvar Notas
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {note?.content && !showNoteEditor && (
                  <div className="mt-2 p-3 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
                    {note.title && <h4 className="text-xs font-bold text-foreground">{note.title}</h4>}
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {note.content}
                    </p>
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map(tag => (
                          <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium border border-border/50">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bibliography toggle */}
              <div className="border-t border-border/40 pt-2">
                <button
                  onClick={() => setShowBib(!showBib)}
                  className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors font-semibold"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {showBib ? "Ocultar Bibliografia" : "Ver Bibliografia Recomendada"}
                </button>

                <AnimatePresence>
                  {showBib && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-2.5 space-y-2 pl-4 border-l-2 border-primary/30">
                        {bibliography.map((bib: string, i: number) => (
                          <li key={i} className="text-xs text-muted-foreground leading-relaxed font-sans">
                            {bib}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Topic Content Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedTopic(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="border-b border-border bg-muted/30">
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">{selectedTopic.title}</h2>
                      <p className="text-xs text-muted-foreground">Material de Estudo • {block.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-0 px-6 border-t border-border/50">
                  <button
                    onClick={() => setTopicModalTab("content")}
                    className={cn(
                      "px-4 py-3 text-sm font-semibold border-b-2 transition-colors",
                      topicModalTab === "content"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <BookOpen className="w-4 h-4 inline-block mr-2" />
                    Conteúdo
                  </button>
                  {selectedTopic.learningPath && (
                    <button
                      onClick={() => setTopicModalTab("learning-path")}
                      className={cn(
                        "px-4 py-3 text-sm font-semibold border-b-2 transition-colors",
                        topicModalTab === "learning-path"
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Lightbulb className="w-4 h-4 inline-block mr-2" />
                      Caminho de Aprendizagem
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin">
                {topicModalTab === "content" ? (
                  <>
                    {(selectedTopic as any).videoUrl && (
                      <div className="space-y-4">
                        {(selectedTopic as any).videoUrl.split(";").filter((url: string) => url.trim()).map((url: string, index: number) => {
                          const videoId = getYouTubeId(url.trim());
                          if (!videoId) return null;
                          return (
                            <div key={index} className="space-y-2">
                              {((selectedTopic as any).videoUrl || "").split(";").filter((u: string) => u.trim()).length > 1 && (
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                                  Vídeo {index + 1}
                                </span>
                              )}
                              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black border border-border">
                                <iframe
                                  src={`https://www.youtube.com/embed/${videoId}`}
                                  title={`Aula Parte ${index + 1}`}
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {selectedTopic.content ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                          components={{
                            h1: ({ children }) => <h1 className="text-xl font-bold text-foreground mt-6 mb-3">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-lg font-bold text-foreground mt-5 mb-2">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-base font-bold text-primary mt-4 mb-2">{children}</h3>,
                            h4: ({ children }) => <h4 className="text-sm font-semibold text-foreground mt-3 mb-1">{children}</h4>,
                            p: ({ children }) => <p className="text-sm text-foreground leading-relaxed mb-3">{children}</p>,
                            strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                            em: ({ children }) => <em className="italic text-muted-foreground">{children}</em>,
                            ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 mb-3">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 mb-3">{children}</ol>,
                            li: ({ children }) => <li className="text-sm text-foreground leading-relaxed">{children}</li>,
                            code: ({ children, className }) => {
                              const isBlock = className?.includes("language-");
                              return isBlock
                                ? <code className="block bg-muted p-3 rounded-lg text-xs font-mono text-foreground overflow-x-auto">{children}</code>
                                : <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-primary">{children}</code>;
                            },
                            table: ({ children }) => (
                              <div className="overflow-x-auto my-4 rounded-lg border border-border">
                                <table className="w-full text-xs border-collapse">{children}</table>
                              </div>
                            ),
                            th: ({ children }) => <th className="p-2 bg-muted font-bold text-foreground text-left border-b border-border">{children}</th>,
                            td: ({ children }) => <td className="p-2 text-muted-foreground border-b border-border/50">{children}</td>,
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-primary/50 pl-4 my-3 text-sm text-muted-foreground italic">{children}</blockquote>
                            ),
                          }}
                        >
                          {selectedTopic.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-muted-foreground gap-3">
                        <BookOpen className="w-12 h-12 opacity-20" />
                        <p className="text-sm">Conteúdo em desenvolvimento para este módulo.</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {selectedTopic.learningPath ? (
                      <SafeLearningPath
                        learningPath={selectedTopic.learningPath}
                        topicTitle={selectedTopic.title}
                      />
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-muted-foreground gap-3">
                        <Lightbulb className="w-12 h-12 opacity-20" />
                        <p className="text-sm">Caminho de aprendizagem em desenvolvimento.</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="p-4 border-t border-border bg-muted/30 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-[10px] font-medium text-muted-foreground">MODO DE ESTUDO ATIVO</span>
                </div>
                <button
                  onClick={() => {
                    toggleTopic(selectedTopic.id);
                    setSelectedTopic(null);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                    isCompleted(selectedTopic.id)
                      ? "bg-muted text-muted-foreground"
                      : "bg-accent text-accent-foreground hover:shadow-lg hover:shadow-accent/20"
                  )}
                >
                  {isCompleted(selectedTopic.id) ? "Módulo Concluído" : "Marcar como Concluído"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
