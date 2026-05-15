"use client";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, BookOpen, AlertTriangle, LogOut, ShieldAlert, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ProfileModal } from "./ProfileModal";

interface HeaderProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  toggleSidebar: () => void;
  totalTopics: number;
  completedTopics: number;
  onShowAlerts: () => void;
  onShowBibliography: () => void;
}

export function Header({ theme, toggleTheme, toggleSidebar, totalTopics, completedTopics, onShowAlerts, onShowBibliography }: HeaderProps) {
  const { data: session } = useSession();
  const [showProfile, setShowProfile] = useState(false);
  const isAdmin = (session?.user as any)?.role === "ADMIN";
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Progresso Geral:</span>
              <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full ${overallProgress === 100 ? "bg-accent" : "bg-primary"}`}
                />
              </div>
              <span className="text-xs font-semibold text-primary">{overallProgress}%</span>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {completedTopics}/{totalTopics} tópicos
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onShowBibliography}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="Bibliografia Central"
          >
            <BookOpen className="w-4 h-4" />
          </button>
          <button
            onClick={onShowAlerts}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-warning"
            title="Alertas de Lacunas"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-border mx-1" />

          {isAdmin && (
            <Link href="/admin" className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary" title="Painel do Reitor">
              <ShieldAlert className="w-4 h-4" />
            </Link>
          )}

          <button
            onClick={() => setShowProfile(true)}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
            title="Meu Perfil"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            onClick={() => signOut()}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-destructive"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
    </header>
  );
}
