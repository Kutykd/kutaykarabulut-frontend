import { createContext } from "react";
import type { CampusEvent, EventFormValues } from "../types/campus-event";

export interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (values: EventFormValues) => void;
  updateEvent: (id: string, values: EventFormValues) => void;
  deleteEvent: (id: string) => void;
}

export const EventsContext = createContext<EventsContextValue | null>(null);
