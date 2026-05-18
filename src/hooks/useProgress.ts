"use client";
import { useState, useCallback, useEffect } from "react";
import { toggleTopicProgress, saveTopicNotebookUrl, getUserData, saveBlockNote } from "@/app/actions";
import { Part } from "@/lib/types";
import { normalizeLearningPath } from "@/lib/learning-path-utils";

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [notebookUrls, setNotebookUrls] = useState<Record<string, string>>({});
  const [blockNotes, setBlockNotes] = useState<Record<number, { title: string; content: string; tags: string[] }>>({});
  const [accesses, setAccesses] = useState<number[]>([]);
  const [curriculum, setCurriculum] = useState<Part[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUserData().then((data) => {
      if (data) {
        setUser(data.user);
        setCompleted(new Set(data.progresses.map((p) => p.topicId)));

        const urls: Record<string, string> = {};
        data.notes.forEach((n) => {
          if (n.notebookUrl) urls[n.topicId] = n.notebookUrl;
        });
        setNotebookUrls(urls);

        const bNotes: Record<number, { title: string; content: string; tags: string[] }> = {};
        data.blockNotes.forEach((bn: any) => {
          bNotes[bn.blockId] = {
            title: bn.title || "",
            content: bn.content || "",
            tags: bn.tags ? bn.tags.split(",") : []
          };
        });
        setBlockNotes(bNotes);

        // Normalize learning paths to ensure all JSON fields are properly parsed
        const normalizedCurriculum = (data.curriculum as any[])?.map((part: any) => ({
          ...part,
          blocks: part.blocks?.map((block: any) => ({
            ...block,
            topics: block.topics?.map((topic: any) => ({
              ...topic,
              learningPath: topic.learningPath ? normalizeLearningPath(topic.learningPath) : null
            })) || []
          })) || []
        })) || [];

        setCurriculum(normalizedCurriculum as Part[]);
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

  const saveModuleNote = useCallback((blockId: number, data: { title: string; content: string; tags: string[] }) => {
    setBlockNotes((prev) => {
      const next = { ...prev, [blockId]: data };
      saveBlockNote(blockId, {
        title: data.title,
        content: data.content,
        tags: data.tags.join(",")
      }).catch(console.error);
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
    blockNotes,
    saveModuleNote,
    accesses,
    curriculum,
    user
  };
}
