"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Activity } from "lucide-react";
import * as Icons from "lucide-react";
import { Part } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarProps {
  parts: Part[];
  activePart: number;
  onSelectPart: (id: number) => void;
  collapsed: boolean;
  onToggle: () => void;
  getBlockProgress: (topicIds: string[]) => number;
}

function getIcon(name: string): LucideIcon {
  const icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return icon || Activity;
}

export function Sidebar({ parts, activePart, onSelectPart, collapsed, onToggle, getBlockProgress }: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-border z-40 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border min-h-[56px]">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <div className="overflow-hidden">
                <h1 className="text-sm font-bold text-foreground truncate">BioMédica</h1>
                <p className="text-[10px] text-muted-foreground truncate">Engenharia Biomédica</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mx-auto">
            <Activity className="w-4 h-4 text-primary" />
          </div>
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute top-3.5 -right-3 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary/20 transition-colors z-50"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin">
        {parts.map((part) => {
          const Icon = getIcon(part.icon);
          const allTopicIds = part.blocks.flatMap(b => b.topics.map(t => t.id));
          const progress = getBlockProgress(allTopicIds);
          const isActive = activePart === part.id;
          
          // Extract semester info from title if present
          const semesterMatch = part.title.match(/^(\d+)º Semestre/);
          const semesterNum = semesterMatch ? semesterMatch[1] : null;
          const displayTitle = part.title.replace(/^\d+º Semestre — /, "");

          return (
            <button
              key={part.id}
              onClick={() => onSelectPart(part.id)}
              className={cn(
                "w-full flex flex-col gap-1 px-3 py-3 text-left transition-all duration-200 group relative",
                isActive
                  ? "bg-primary/10 text-primary border-r-2 border-primary shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/30 hover:text-foreground"
              )}
              title={`${part.title}`}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors shadow-sm",
                  isActive ? "bg-primary/20" : "bg-muted"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-1 min-w-0"
                    >
                      {semesterNum && (
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-primary/70">
                            Semestre {semesterNum}
                          </span>
                        </div>
                      )}
                      <p className="text-xs font-bold truncate leading-tight">
                        {displayTitle}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!collapsed && (
                <div className="pl-11 pr-2 w-full">
                  <div className="h-1 rounded-full bg-muted/50 overflow-hidden mt-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "h-full rounded-full shadow-sm",
                        progress === 100 ? "bg-accent" : "bg-primary"
                      )}
                    />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border mt-auto">
        <button
          onClick={() => (window as any).toggleAppendix?.()}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
            "text-muted-foreground hover:bg-primary/10 hover:text-primary"
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <Icons.BookCopy className="w-4 h-4" />
          </div>
          {!collapsed && (
            <span className="text-xs font-medium">Apêndices</span>
          )}
        </button>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3"
            >
              <p className="text-[10px] text-muted-foreground text-center">
                Grade consolidada UFPE • UFU • UNINTER
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
