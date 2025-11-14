export interface JobListItem {
  id: string;
  slug: string | null;
  title: string | null;
  workTime: string | null;
  status?: string;
  salary_range?: {
    min?: number | null;
    max?: number | null;
    currency?: string | null;
    display_text?: string | null;
  };
  candidates?: number;
  description?: string;
  list_card?: {
    badge?: string;
    started_on_text?: string | null;
    cta?: string;
  };
}