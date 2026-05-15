"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GapAlerts } from "./GapAlerts";

interface AlertsModalProps {
  open: boolean;
  onClose: () => void;
  alerts: { title: string; description: string; recommendations: string[]; severity: "warning" | "critical" | "info" }[];
}

export function AlertsModal({ open, onClose, alerts }: AlertsModalProps) {
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
            className="fixed inset-4 sm:inset-auto sm:top-[10%] sm:left-1/2 sm:-translate-x-1/2 sm:w-[560px] sm:max-h-[75vh] bg-card border border-border rounded-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Lacunas de Formação</h2>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <GapAlerts alerts={alerts} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
