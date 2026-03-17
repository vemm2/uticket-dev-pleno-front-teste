import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event } from "@/types/ticketmaster";

interface SavedEventsState {
  savedEvents: Event[];
  maxEvents: number;
  saveEvent: (event: Event) => { success: boolean; message: string };
  removeEvent: (eventId: string) => void;
  isEventSaved: (eventId: string) => boolean;
  clearSavedEvents: () => void;
  getRemainingSlots: () => number;
}

export const useSavedEvents = create<SavedEventsState>()(
  persist(
    (set, get) => ({
      savedEvents: [],
      maxEvents: 5, // Limite exigido pela regra de negócio

      saveEvent: (event) => {
        const { savedEvents, maxEvents } = get();

        // Verifica se já está salvo
        if (savedEvents.some((e) => e.id === event.id)) {
          return { success: false, message: "Evento já está nos favoritos!" };
        }

        // Verifica o limite máximo
        if (savedEvents.length >= maxEvents) {
          return {
            success: false,
            message: `Limite de ${maxEvents} eventos salvos atingido!`,
          };
        }

        // Adiciona ao estado (o middleware persist guarda no localStorage automaticamente)
        set({ savedEvents: [...savedEvents, event] });
        return { success: true, message: "Evento salvo com sucesso!" };
      },

      removeEvent: (eventId) => {
        set((state) => ({
          savedEvents: state.savedEvents.filter((e) => e.id !== eventId),
        }));
      },

      isEventSaved: (eventId) => {
        return get().savedEvents.some((e) => e.id === eventId);
      },

      clearSavedEvents: () => {
        set({ savedEvents: [] });
      },

      getRemainingSlots: () => {
        return get().maxEvents - get().savedEvents.length;
      },
    }),
    {
      // Nome da chave que ficará guardada no Application > Local Storage do navegador
      name: "eventhub_saved_events",
    },
  ),
);
