import type { EventFormValues } from "../types/campus-event";

export type FormErrors = Partial<Record<string, string>>;

export function validateEvent(values: EventFormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.title.trim().length < 3) errors.title = "Etkinlik adı en az 3 karakter olmalı.";
  if (values.category === "") errors.category = "Bir kategori seçin.";
  if (values.date === "") errors.date = "Tarih seçin.";
  if (values.time === "") errors.time = "Saat seçin.";
  if (values.location.trim() === "") errors.location = "Yer boş olamaz.";
  const capacity = Number(values.capacity);
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000) {
    errors.capacity = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";
  }
  if (values.description.trim().length < 10) errors.description = "Açıklama en az 10 karakter olmalı.";
  return errors;
}

export function isEmail(text: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim());
}
