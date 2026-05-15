"use client";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "biomedica-progress";
const STORAGE_KEY_URLS = "biomedica-notebook-urls";

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [notebookUrls, setNotebookUrls] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(STORAGE_KEY);
      if (storedProgress) {
        setCompleted(new Set(JSON.parse(storedProgress)));
      }
      const storedUrls = localStorage.getItem(STORAGE_KEY_URLS);
      if (storedUrls) {
        setNotebookUrls(JSON.parse(storedUrls));
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    }
  }, [completed, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY_URLS, JSON.stringify(notebookUrls));
    }
  }, [notebookUrls, loaded]);

  const toggle = useCallback((topicId: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  }, []);

  const isCompleted = useCallback((topicId: string) => completed.has(topicId), [completed]);

  const saveNotebookUrl = useCallback((id: string, url: string) => {
    setNotebookUrls(prev => ({
      ...prev,
      [id]: url.trim()
    }));
  }, []);

  const getBlockProgress = useCallback((topicIds: string[]) => {
    if (topicIds.length === 0) return 0;
    const done = topicIds.filter(id => completed.has(id)).length;
    return Math.round((done / topicIds.length) * 100);
  }, [completed]);



  const totalCompleted = completed.size;

  return {
    toggle,
    isCompleted,
    getBlockProgress,
    totalCompleted,
    loaded,
    notebookUrls,
    saveNotebookUrl
  };
}
