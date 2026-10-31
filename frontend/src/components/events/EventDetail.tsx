import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

// Etkinliği bulmak App'in işi; bileşen verileni gösterir.
function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <div className="detay-ust">
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} afişi`} width="480" height="270" />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}
        <section className="kunye">
          <h2>Etkinlik Künyesi</h2>
          <dl>
            <dt>Tarih</dt>
            <dd>
              <time dateTime={`${event.date}T${event.time}`}>
                {formatDate(event.date)}, {event.time}
              </time>
            </dd>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
        </section>
      </div>
      <h2>Açıklama</h2>
      <p>{event.description}</p>
      <p className="form-butonlar">
        <a
          className="buton"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
        >
          &larr; Listeye dön
        </a>
        <a
          className="buton"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onEdit(event.id);
          }}
        >
          Bu etkinliği güncelle
        </a>
      </p>
    </article>
  );
}

export default EventDetail;
