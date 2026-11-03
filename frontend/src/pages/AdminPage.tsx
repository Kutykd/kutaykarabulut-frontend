import { Link } from "react-router-dom";
import { useEvents } from "../context/useEvents";
import { formatDate } from "../utils/format-date";

function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) deleteEvent(id);
  }

  return (
    <>
      <p>
        <Link className="buton" to="/admin/new">
          + Yeni etkinlik
        </Link>
      </p>

      {events.length === 0 ? (
        <p className="sonuc">Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td data-baslik="Etkinlik">{e.title}</td>
                <td data-baslik="Tarih">{formatDate(e.date)}</td>
                <td data-baslik="Kategori">{e.category}</td>
                <td className="islemler">
                  <Link className="buton" to={`/admin/${e.id}/edit`}>
                    Düzenle
                  </Link>
                  <button type="button" className="buton buton-sil" onClick={() => handleDelete(e.id, e.title)}>
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AdminPage;
