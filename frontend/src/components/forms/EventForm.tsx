import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Category, EventFormValues } from "../../types/campus-event";
import { validateEvent, type FormErrors } from "../../utils/validate";

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

interface EventFormProps {
  initialValues: EventFormValues;
  submitText: string;
  onSubmit: (values: EventFormValues) => void;
}

// Ekle ve Güncelle aynı formu kullanır; kaydetmek sayfanın işi.
function EventForm({ initialValues, submitText, onSubmit }: EventFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateEvent(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(values);
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <p className="alan">
        <label htmlFor="title">Etkinlik Adı *</label>
        <input
          type="text"
          id="title"
          name="title"
          maxLength={80}
          placeholder="Örn. Kariyer Günleri 2026"
          value={values.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
        />
        <span className="hata-metni">{errors.title}</span>
      </p>

      <p className="alan">
        <label htmlFor="category">Kategori *</label>
        <select
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span className="hata-metni">{errors.category}</span>
      </p>

      <p className="alan">
        <label htmlFor="date">Tarih *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={values.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        <span className="hata-metni">{errors.date}</span>
      </p>

      <p className="alan">
        <label htmlFor="time">Saat *</label>
        <input
          type="time"
          id="time"
          name="time"
          value={values.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
        />
        <span className="hata-metni">{errors.time}</span>
      </p>

      <p className="alan">
        <label htmlFor="location">Yer *</label>
        <input
          type="text"
          id="location"
          name="location"
          maxLength={80}
          placeholder="Örn. A Blok Konferans Salonu"
          value={values.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
        />
        <span className="hata-metni">{errors.location}</span>
      </p>

      <p className="alan">
        <label htmlFor="capacity">Kontenjan *</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          min={1}
          max={1000}
          value={values.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
        />
        <span className="hata-metni">{errors.capacity}</span>
      </p>

      <p className="alan">
        <label htmlFor="description">Açıklama *</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={values.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        />
        <span className="hata-metni">{errors.description}</span>
      </p>

      <p className="form-butonlar">
        <button type="submit" className="buton">
          {submitText}
        </button>
      </p>
    </form>
  );
}

export default EventForm;
