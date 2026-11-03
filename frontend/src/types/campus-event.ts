// Bir etkinlik neye benzer: alanlar ve izin verilen kategoriler.
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

// Formdaki alanlar; kutular metin tuttuğu için hepsi string.
export interface EventFormValues {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}
