"use client";
import { useState, useCallback, useEffect } from "react";
import { toggleTopicProgress, saveTopicNotebookUrl, getUserData } from "@/app/actions";

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [notebookUrls, setNotebookUrls] = useState<Record<string, string>>({});
  const [accesses, setAccesses] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getUserData().then((data) => {
      if (data) {
        setCompleted(new Set(data.progresses.map((p) => p.topicId)));
        const urls: Record<string, string> = {};
        data.notes.forEach((n) => {
          if (n.notebookUrl) urls[n.topicId] = n.notebookUrl;
        });
        setNotebookUrls(urls);
        setAccesses(data.accesses || []);
      }
      setLoaded(true);
    });
  }, []);

  const toggle = useCallback((topicId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      const isCurrentlyCompleted = next.has(topicId);
      const isNowCompleted = !isCurrentlyCompleted;
      
      if (isCurrentlyCompleted) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      
      toggleTopicProgress(topicId, isNowCompleted).catch(console.error);
      return next;
    });
  }, []);

  const isCompleted = useCallback((topicId: string) => completed.has(topicId), [completed]);

  const saveNotebookUrl = useCallback((topicId: string, url: string) => {
    setNotebookUrls((prev) => {
      const next = { ...prev, [topicId]: url.trim() };
      saveTopicNotebookUrl(topicId, url.trim()).catch(console.error);
      return next;
    });
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
    saveNotebookUrl,
    accesses
  };
}
