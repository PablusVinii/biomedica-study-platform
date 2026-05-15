"use client";
import { motion } from "framer-motion";
import { AlertTriangle, Info, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  title: string;
  description: string;
  recommendations: string[];
  severity: "warning" | "critical" | "info";
}

export function GapAlerts({ alerts }: { alerts: Alert[] }) {
  const icons = { warning: AlertTriangle, critical: AlertTriangle, info: Info };
  const colors = {
    warning: "border-warning/40 bg-warning/5",
    critical: "border-destructive/40 bg-destructive/5",
    info: "border-primary/40 bg-primary/5",
  };
  const iconColors = {
    warning: "text-warning",
    critical: "text-destructive",
    info: "text-primary",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-warning" />
        Alertas de Lacunas de Formação
      </h2>
      {alerts.map((alert, i) => {
        const Icon = icons[alert.severity];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn("rounded-xl border p-4", colors[alert.severity])}
          >
            <div className="flex items-start gap-3">
              <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", iconColors[alert.severity])} />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">{alert.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                <ul className="mt-3 space-y-1.5">
                  {alert.recommendations.map((rec, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-foreground/80">
                      <ExternalLink className="w-3 h-3 text-primary flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
