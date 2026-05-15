"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Map, AlertTriangle, ExternalLink } from "lucide-react";
import { appendixA, appendixB, appendixC } from "@/lib/appendix-data";

interface AppendixModalProps {
  open: boolean;
  onClose: () => void;
}

export function AppendixModal({ open, onClose }: AppendixModalProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Apêndices e Referências</h2>
                <p className="text-sm text-muted-foreground">Visão integrada e mapeamento curricular</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-12 scrollbar-thin">
            
            {/* Apêndice A */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">{appendixA.title}</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-3 border-l-2 border-primary pl-2 uppercase tracking-wider">Manuais de Referência Globais</h4>
                  <div className="grid gap-3">
                    {appendixA.manuals.map((manual, i) => (
                      <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border">
                        <p className="text-sm font-medium text-foreground">{manual.title}</p>
                        {manual.volumes && (
                          <ul className="mt-2 space-y-1 pl-4">
                            {manual.volumes.map((vol, j) => (
                              <li key={j} className="text-xs text-muted-foreground list-disc">{vol}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-3 border-l-2 border-primary pl-2 uppercase tracking-wider">Sociedades e Organizações</h4>
                    <div className="space-y-2">
                      {appendixA.societies.map((soc, i) => (
                        <a 
                          key={i} 
                          href={soc.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all group"
                        >
                          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{soc.name}</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-3 border-l-2 border-primary pl-2 uppercase tracking-wider">Periódicos Científicos</h4>
                    <div className="flex flex-wrap gap-2">
                      {appendixA.journals.map((journal, i) => (
                        <span key={i} className="text-[10px] px-2.5 py-1.5 rounded-md bg-muted/40 border border-border text-muted-foreground">
                          {journal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Apêndice B */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Map className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">{appendixB.title}</h3>
              </div>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 font-bold text-foreground border-b border-border min-w-[140px]">Bloco</th>
                      <th className="p-3 font-bold text-foreground border-b border-border min-w-[140px]">UFPE (Perfil 5801)</th>
                      <th className="p-3 font-bold text-foreground border-b border-border min-w-[140px]">UFU</th>
                      <th className="p-3 font-bold text-foreground border-b border-border min-w-[140px]">UNINTER</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {appendixB.mapping.map((row, i) => (
                      <tr key={i} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium text-primary">{row.block}</td>
                        <td className="p-3 text-muted-foreground">{row.ufpe}</td>
                        <td className="p-3 text-muted-foreground">{row.ufu}</td>
                        <td className="p-3 text-muted-foreground leading-relaxed">{row.uninter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Apêndice C */}
            <section className="p-6 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <AlertTriangle className="w-16 h-16 text-primary" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-primary">{appendixC.title}</h3>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {appendixC.content}
              </div>
            </section>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/30 text-center">
            <p className="text-[10px] text-muted-foreground">
              BioMédica Study Platform — Material de apoio integrado para Engenharia Biomédica
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
