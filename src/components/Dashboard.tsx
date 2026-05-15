"use client";
import { useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { BlockCard } from "./BlockCard";
import { BibliographyModal } from "./BibliographyModal";
import { AlertsModal } from "./AlertsModal";
import { AppendixModal } from "./AppendixModal";
import { GapAlerts } from "./GapAlerts";
import { useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";
import { useTheme } from "@/hooks/useTheme";
import { allCurriculumData, formationGapAlerts } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BookCopy, AlertTriangle } from "lucide-react";

export function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPart = parseInt(searchParams.get("part") || "1", 10);

  const [activePart, setActivePart] = useState(initialPart);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBib, setShowBib] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showAppendix, setShowAppendix] = useState(false);
  const { 
    toggle, 
    isCompleted, 
    getBlockProgress, 
    totalCompleted, 
    loaded, 
    notebookUrls, 
    saveNotebookUrl, 
    blockNotes,
    saveModuleNote,
    accesses,
    curriculum 
  } = useProgress();

  const parts = curriculum;
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    (window as any).toggleAppendix = () => setShowAppendix(true);
    return () => { delete (window as any).toggleAppendix; };
  }, []);

  const currentPart = useMemo(
    () => parts.find(p => p.id === activePart),
    [activePart, parts]
  );

  const totalTopics = useMemo(
    () => parts.reduce((acc, p) => acc + p.blocks.reduce((a: any, b: any) => a + b.topics.length, 0), 0),
    [parts]
  );

  // CR Estimado dinamicamente: 0 tópicos = 0.0, todos = 10.0
  const estimatedCR = useMemo(() => {
    if (totalTopics === 0) return "0.0";
    const ratio = totalCompleted / totalTopics;
    return (ratio * 10).toFixed(1);
  }, [totalCompleted, totalTopics]);

  const handleSelectPart = useCallback((id: number) => {
    if (!accesses.includes(id)) return; // Prevent selection if locked
    setActivePart(id);
    setMobileMenuOpen(false);
    router.replace(`?part=${id}`, { scroll: false });
  }, [router, accesses]);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          parts={parts}
          activePart={activePart}
          onSelectPart={handleSelectPart}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          getBlockProgress={getBlockProgress}
          accesses={accesses}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed left-0 top-0 z-40 lg:hidden">
              <Sidebar
                parts={parts}
                activePart={activePart}
                onSelectPart={handleSelectPart}
                collapsed={false}
                onToggle={() => setMobileMenuOpen(false)}
                getBlockProgress={getBlockProgress}
                accesses={accesses}
              />
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content — margem gerenciada por CSS; sem acesso a window no SSR */}
      <motion.main
        animate={{ marginLeft: sidebarCollapsed ? 64 : 280 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen [margin-left:0] lg:[margin-left:var(--sidebar-w)]"
      >
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          toggleSidebar={() => setMobileMenuOpen(!mobileMenuOpen)}
          totalTopics={totalTopics}
          completedTopics={totalCompleted}
          onShowAlerts={() => setShowAlerts(true)}
          onShowBibliography={() => setShowBib(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          {/* Academic Portal Welcome */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-background to-accent/5 border border-primary/20 shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl font-black text-foreground tracking-tight mb-1">
                  Portal do Aluno
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Engenharia Biomédica • <span className="text-primary">Bacharelado</span>
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-center px-4 py-2 bg-card rounded-xl border border-border shadow-sm">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Semestre Atual</p>
                  <p className="text-lg font-black text-primary">{(currentPart?.title.match(/^(\d+)/)?.[1] || "1")}º</p>
                </div>
                <div className="text-center px-4 py-2 bg-card rounded-xl border border-border shadow-sm">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">CR Estimado</p>
                  <p className="text-lg font-black text-accent">{estimatedCR}</p>
                </div>
                <div className="text-center px-4 py-2 bg-card rounded-xl border border-border shadow-sm">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Status</p>
                  <p className="text-lg font-black text-green-500">Ativo</p>
                </div>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-accent/10 blur-3xl rounded-full" />
          </div>

          <AnimatePresence mode="wait">
            {currentPart && !accesses.includes(currentPart.id) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-12 text-center bg-card border border-border rounded-2xl flex flex-col items-center justify-center gap-4"
              >
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold">Módulo Bloqueado</h2>
                <p className="text-sm text-muted-foreground max-w-md">
                  Você ainda não possui acesso a este semestre. Fale com a administração para solicitar a liberação do conteúdo.
                </p>
              </motion.div>
            )}

            {currentPart && accesses.includes(currentPart.id) && (
              <motion.div
                key={currentPart.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Part Header */}
                <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-0.5 w-8 bg-primary rounded-full" />
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                        Conteúdo Programático
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground tracking-tight">{currentPart.title.replace(/^\d+º Semestre — /, "")}</h2>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex-1 h-2 rounded-full bg-muted/50 overflow-hidden max-w-[280px]">
                        <motion.div
                          animate={{
                            width: `${getBlockProgress(
                              currentPart.blocks.flatMap(b => b.topics.map(t => t.id))
                            )}%`,
                          }}
                          transition={{ duration: 0.5 }}
                          className={cn(
                            "h-full rounded-full",
                            getBlockProgress(currentPart.blocks.flatMap(b => b.topics.map(t => t.id))) === 100 ? "bg-accent" : "bg-primary"
                          )}
                        />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">
                        {getBlockProgress(currentPart.blocks.flatMap(b => b.topics.map(t => t.id)))}% do curso
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium bg-muted/40 px-3 py-1.5 rounded-full border border-border/50">
                    <BookCopy className="w-3.5 h-3.5" />
                    {currentPart.blocks.length} Unidades • {currentPart.blocks.reduce((a, b) => a + b.topics.length, 0)} Atividades
                  </div>
                </div>

                {/* Blocks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPart.blocks.map((block, i) => (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <BlockCard
                        block={block}
                        isCompleted={isCompleted}
                        toggleTopic={toggle}
                        getBlockProgress={getBlockProgress}
                        notebookUrl={notebookUrls[String(block.id)]}
                        onSaveNotebookUrl={(url) => saveNotebookUrl(String(block.id), url)}
                        note={blockNotes[block.id]}
                        onSaveNote={(data) => saveModuleNote(block.id, data)}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Inline gap alerts for parts with highlights */}
                {currentPart.blocks.some(b => b.highlights && b.highlights.length > 0) && (
                  <div className="mt-8 p-6 rounded-2xl border border-warning/20 bg-warning/5 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <AlertTriangle className="w-16 h-16 text-warning" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-sm font-bold text-warning flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        Diretriz de Formação Suplementar
                      </h3>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed mb-4 max-w-2xl">
                        Identificamos que os tópicos acima exigem competências que transcendem a ementa base nacional. 
                        Recomendamos o aprofundamento prático via plataformas de regulação e interoperabilidade.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Normas ABNT", "HL7 Academy", "RNDS Developer", "Vigilância ANVISA"].map(p => (
                          <span key={p} className="text-[10px] px-3 py-1.5 rounded-lg bg-warning/10 text-warning font-bold border border-warning/20 transition-colors hover:bg-warning/20 cursor-default">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>

      {/* Modals */}
      <BibliographyModal open={showBib} onClose={() => setShowBib(false)} parts={allCurriculumData} />
      <AlertsModal open={showAlerts} onClose={() => setShowAlerts(false)} alerts={formationGapAlerts} />
      <AppendixModal open={showAppendix} onClose={() => setShowAppendix(false)} />
    </div>
  );
}
