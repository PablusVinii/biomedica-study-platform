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
import { formationGapAlerts } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BookCopy, AlertTriangle, GraduationCap, ArrowLeft, ChevronRight, Activity } from "lucide-react";

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

  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
 
  const courses = useMemo(() => {
    const unique = new Map();
    curriculum.forEach(p => {
      if (p.course) unique.set(p.course.id, p.course);
    });
    return Array.from(unique.values());
  }, [curriculum]);
 
  // Auto-select course if part is in URL
  useEffect(() => {
    if (loaded && curriculum.length > 0) {
      const part = curriculum.find(p => p.id === initialPart);
      if (part && part.courseId) {
        setSelectedCourseId(part.courseId);
      }
    }
  }, [loaded, curriculum, initialPart]);
 
  const filteredParts = useMemo(() => {
    if (!selectedCourseId) return [];
    return curriculum.filter(p => p.courseId === selectedCourseId);
  }, [curriculum, selectedCourseId]);
 
  const parts = filteredParts;
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    (window as any).toggleAppendix = () => setShowAppendix(true);
    (window as any).setSelectedCourseId = (id: number | null) => setSelectedCourseId(id);
    return () => { 
      delete (window as any).toggleAppendix; 
      delete (window as any).setSelectedCourseId;
    };
  }, []);

  const currentPart = useMemo(
    () => parts.find(p => p.id === activePart),
    [activePart, parts]
  );

  const totalTopics = useMemo(
    () => parts.reduce((acc, p) => acc + p.blocks.reduce((a, b) => a + b.topics.length, 0), 0),
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

  if (selectedCourseId === null) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
        <div className="w-full max-w-4xl space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-black text-foreground tracking-tight">Meus Cursos</h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Selecione uma das formações acadêmicas abaixo para acessar o conteúdo e acompanhar seu progresso.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {courses.map((course, idx) => {
              const courseParts = curriculum.filter(p => p.courseId === course.id);
              const allTopicIds = courseParts.flatMap(p => p.blocks.flatMap(b => b.topics.map(t => t.id)));
              const progress = getBlockProgress(allTopicIds);
              
              return (
                <motion.button
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => {
                    setSelectedCourseId(course.id);
                    const firstPart = courseParts[0]?.id || 1;
                    setActivePart(firstPart);
                  }}
                  className="group relative p-8 rounded-3xl bg-card border border-border shadow-xl hover:shadow-primary/5 hover:border-primary/50 transition-all text-left overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <GraduationCap className="w-24 h-24" />
                  </div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{course.title}</h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description || "Bacharelado / Especialização Profissional"}</p>
                    </div>

                    <div className="pt-4 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        <span>Progresso Total</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-bold text-primary pt-2 group-hover:translate-x-1 transition-transform">
                      Acessar Currículo
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] pt-8"
          >
            Plataforma Acadêmica Consolidada • {new Date().getFullYear()}
          </motion.p>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-background">
      <button 
        onClick={() => setSelectedCourseId(null)}
        className="fixed top-20 left-4 z-50 p-2 rounded-full bg-card/80 border border-border backdrop-blur-sm text-muted-foreground hover:text-primary transition-all lg:hidden"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
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
                  {currentPart?.course?.title || "Engenharia Biomédica"} • <span className="text-primary">{currentPart?.course?.description || "Bacharelado"}</span>
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
      <BibliographyModal open={showBib} onClose={() => setShowBib(false)} parts={parts} />
      <AlertsModal open={showAlerts} onClose={() => setShowAlerts(false)} alerts={formationGapAlerts} />
      <AppendixModal open={showAppendix} onClose={() => setShowAppendix(false)} />
    </div>
  );
}
