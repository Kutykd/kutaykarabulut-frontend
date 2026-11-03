import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/useEvents";
import { findEventById } from "../utils/filter-events";
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";

function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = findEventById(events, id ?? "");

  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Güncelle</h2>
      <EventForm
        initialValues={{ ...event, capacity: String(event.capacity) }}
        submitText="Güncelle"
        onSubmit={(values) => {
          updateEvent(event.id, values);
          navigate("/admin");
        }}
      />
    </>
  );
}

export default EditEventPage;
