export interface Topic {
  id: string;
  title: string;
  content?: string | null;
  notebookLmUrl?: string | null;
  videoUrl?: string | null;
}

export interface Block {
  id: number;
  title: string;
  content?: string | null;
  topics: Topic[];
  bibliography?: string | string[] | null;
  highlights?: string | string[] | null;
  notebookLmUrl?: string | null;
}

export interface Part {
  id: number;
  title: string;
  icon: string;
  courseId?: number;
  course?: {
    id: number;
    title: string;
    description: string | null;
  };
  blocks: Block[];
}
