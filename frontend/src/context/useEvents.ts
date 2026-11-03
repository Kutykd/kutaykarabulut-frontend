import { useContext } from "react";
import { EventsContext } from "./events-context";

export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) throw new Error("useEvents, EventsProvider içinde kullanılmalı.");
  return value;
}
