import type { PageName } from "../../types/page";

const menu: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" }
];

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

// Tıklamayı onNavigate ile App'e bildirir; sayfayı App değiştirir.
function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <ul>
        {menu.map((item) => (
          <li key={item.name}>
            <a
              href="#"
              aria-current={current === item.name ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.name);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
