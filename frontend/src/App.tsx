import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menu: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" }
];

// "2026-10-12" → "12 Ekim 2026"
function formatDate(date: string) {
  return new Date(date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Her çizimde hesaplananlar; state değil.
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let title = "Kampüs Etkinlikleri";
  let text = "";
  if (page === "home") text = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  if (page === "events") {
    title = "Tüm Etkinlikler";
    text = "Ekim ayında kampüste düzenlenen etkinlikler.";
  }
  if (page === "detail") title = selected ? selected.title : "Etkinlik bulunamadı";
  if (page === "add") title = "Etkinlik Ekle";
  if (page === "update") title = "Etkinlik Güncelle";

  useEffect(() => {
    document.title = title === "Kampüs Etkinlikleri" ? title : `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p className="kart-kategori">{event.category}</p>
        <p>
          Tarih: <time dateTime={`${event.date}T${event.time}`}>{formatDate(event.date)}, {event.time}</time>
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <p>
          <a
            className="kart-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              go("detail", event.id);
            }}
          >
            Detayları gör
          </a>
        </p>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </header>

      <nav className="menu">
        <ul>
          {menu.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                aria-current={page === item.name ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.name);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {page === "home" && (
          <>
            <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi" aria-label="Yaklaşan etkinlikler">
              {upcoming.map(renderCard)}
            </section>
            <p>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" role="search" onSubmit={(e) => e.preventDefault()}>
              <p className="alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </p>
              <p className="alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </p>
            </form>

            <p className="sonuc" aria-live="polite">
              {filtered.length === 0 ? "Aramanıza uygun etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi" aria-label="Tüm etkinlikler">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <div className="mesaj mesaj-hata" role="alert">
              <p>Bu etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
            </div>
            <p>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                &larr; Listeye dön
              </a>
            </p>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            <div className="detay-ust">
              {selected.image && (
                <figure>
                  <img src={selected.image} alt={`${selected.title} afişi`} width="480" height="270" />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              )}
              <section className="kunye">
                <h2>Etkinlik Künyesi</h2>
                <dl>
                  <dt>Tarih</dt>
                  <dd>
                    <time dateTime={`${selected.date}T${selected.time}`}>
                      {formatDate(selected.date)}, {selected.time}
                    </time>
                  </dd>
                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </section>
            </div>
            <h2>Açıklama</h2>
            <p>{selected.description}</p>
            <p className="form-butonlar">
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                &larr; Listeye dön
              </a>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("update", selected.id);
                }}
              >
                Bu etkinliği güncelle
              </a>
            </p>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p className="bilgi">Bu sprintte form sadece görünümdür, kayıt yapılmaz.</p>

            <form className="form" onSubmit={(e) => e.preventDefault()}>
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
                  {page === "add" ? "Kaydet" : "Güncelle"}
                </button>
              </p>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Kutay Karabulut &middot; 2321032056 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;
