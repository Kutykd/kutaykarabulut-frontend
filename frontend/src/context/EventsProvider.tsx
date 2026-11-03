import { useState, type ReactNode } from "react";
import type { CampusEvent, EventFormValues } from "../types/campus-event";
import { events as initialEvents } from "../data/events";
import { EventsContext } from "./events-context";

// Formdan gelen metinleri etkinlik kaydına çevirir.
function toEvent(id: string, values: EventFormValues): CampusEvent {
  return {
    id,
    title: values.title.trim(),
    category: values.category as CampusEvent["category"],
    capacity: Number(values.capacity),
    date: values.date,
    time: values.time,
    location: values.location.trim(),
    description: values.description.trim(),
  };
}

function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(values: EventFormValues) {
    setEvents([...events, toEvent(`event-${Date.now()}`, values)]);
  }

  function updateEvent(id: string, values: EventFormValues) {
    setEvents(events.map((e) => (e.id === id ? { ...toEvent(id, values), image: e.image } : e)));
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export default EventsProvider;
