import { useSavedEvents } from "@/store/useSavedEvents";
import { Event } from "@/types/ticketmaster";

export function useToggleSave(event: Event) {
  const { saveEvent, removeEvent, isEventSaved } = useSavedEvents();
  const isSaved = isEventSaved(event?.id);

  const handleSaveToggle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!event) return;

    if (isSaved) {
      removeEvent(event.id);
    } else {
      const result = saveEvent(event);
      if (!result.success) {
        alert(result.message);
      }
    }
  };

  return { isSaved, handleSaveToggle };
}
