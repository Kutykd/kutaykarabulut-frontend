import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { useEvents } from "../../context/useEvents";
import { findEventById } from "../../utils/filter-events";

const pages = [
  { path: "/", title: "Kampüs Etkinlikleri", text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." },
  { path: "/events", title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler." },
  { path: "/admin", title: "Etkinlik Yönetimi" },
  { path: "/admin/new", title: "Etkinlik Ekle" },
  { path: "/login", title: "Giriş Yap" },
  { path: "/register", title: "Kayıt Ol" },
  { path: "/forgot-password", title: "Şifremi Unuttum" },
];

// Başlık adresten gelir; detay ve düzenlemede etkinliğin adı yazar.
function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  const match = matchPath("/events/:id", pathname) ?? matchPath("/admin/:id/edit", pathname);
  const event = match ? findEventById(events, match.params.id ?? "") : undefined;
  const page = pages.find((p) => matchPath(p.path, pathname));

  const title = event ? event.title : page ? page.title : "Sayfa Bulunamadı";
  const text = event ? `${event.category} · ${event.location}` : page?.text;

  useEffect(() => {
    const site = "Kampüs Etkinlikleri";
    document.title = title === site ? site : `${site} — ${title}`;
  }, [title]);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;
