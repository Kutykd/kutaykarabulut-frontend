interface EventFormProps {
  onSubmit: () => void;
}

// Form ne yapılacağını bilmez; gönderimi onSubmit ile App'e bildirir.
function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="bilgi">Bu sprintte form sadece görünümdür, kayıt yapılmaz.</p>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <p className="alan">
          <label htmlFor="ad">Etkinlik Adı *</label>
          <input type="text" id="ad" name="ad" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" required />
        </p>

        <p className="alan">
          <label htmlFor="kategori">Kategori *</label>
          <select id="kategori" name="kategori" required>
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </p>

        <p className="alan">
          <label htmlFor="tarih">Tarih *</label>
          <input type="date" id="tarih" name="tarih" required />
        </p>

        <p className="alan">
          <label htmlFor="saat">Saat *</label>
          <input type="time" id="saat" name="saat" required />
        </p>

        <p className="alan">
          <label htmlFor="yer">Yer *</label>
          <input type="text" id="yer" name="yer" maxLength={80} placeholder="Örn. A Blok Konferans Salonu" required />
        </p>

        <p className="alan">
          <label htmlFor="kontenjan">Kontenjan</label>
          <input type="number" id="kontenjan" name="kontenjan" min={1} max={1000} />
        </p>

        <p className="alan">
          <label htmlFor="aciklama">Açıklama</label>
          <textarea id="aciklama" name="aciklama" rows={5} />
        </p>

        <p className="form-butonlar">
          <button type="submit" className="buton">
            Kaydet
          </button>
        </p>
      </form>
    </>
  );
}

export default EventForm;
