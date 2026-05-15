export interface Topic {
  id: string;
  title: string;
  content?: string;
  notebookLmUrl?: string;
}

export interface Block {
  id: number;
  title: string;
  content?: string;
  topics: Topic[];
  bibliography: string[];
  highlights?: string[];
  notebookLmUrl?: string;
}

export interface Part {
  id: number;
  title: string;
  icon: string;
  blocks: Block[];
}
