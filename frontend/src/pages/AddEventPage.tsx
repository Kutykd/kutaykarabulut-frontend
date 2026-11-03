import { useNavigate } from "react-router-dom";
import type { EventFormValues } from "../types/campus-event";
import { useEvents } from "../context/useEvents";
import EventForm from "../components/forms/EventForm";

const emptyForm: EventFormValues = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <EventForm
      initialValues={emptyForm}
      submitText="Kaydet"
      onSubmit={(values) => {
        addEvent(values);
        navigate("/admin");
      }}
    />
  );
}

export default AddEventPage;
