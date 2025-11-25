export interface Technique {
  name: string;
  translation: string;
  meta: string;
  dan: string;
  tags: string[];
  videoUrl: string;
  embedUrl?: string;
  searchUrl?: string;
}

export interface TechniqueGroup {
  id: string;
  label: string;
  description: string;
  techniques: Technique[];
}
