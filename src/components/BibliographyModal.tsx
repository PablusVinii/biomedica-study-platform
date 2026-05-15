"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen } from "lucide-react";
import { Part } from "@/lib/types";

interface BibliographyModalProps {
  open: boolean;
  onClose: () => void;
  parts: Part[];
}

export function BibliographyModal({ open, onClose, parts }: BibliographyModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:top-[5%] sm:left-1/2 sm:-translate-x-1/2 sm:w-[640px] sm:max-h-[85vh] bg-card border border-border rounded-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Central de Bibliografia</h2>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {parts.map(part => (
                <div key={part.id}>
                  <h3 className="text-sm font-bold text-primary mb-3">
                    Parte {part.id} — {part.title}
                  </h3>
                  {part.blocks.map(block => (
                    <div key={block.id} className="mb-3">
                      <p className="text-xs font-semibold text-foreground mb-1">
                        Bloco {block.id}. {block.title}
                      </p>
                      <ul className="space-y-0.5 pl-4">
                        {(typeof block.bibliography === 'string' ? JSON.parse(block.bibliography) : (block.bibliography || [])).map((bib: string, i: number) => (
                          <li key={i} className="text-xs text-muted-foreground list-disc">{bib}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
