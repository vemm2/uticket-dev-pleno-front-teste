import { TicketmasterResponse } from "@/types/ticketmaster";

const BASE_URL = process.env.TICKETMASTER_BASE_URL;
const API_KEY = process.env.TICKETMASTER_API_KEY;

async function fetchTicketmaster<T>(
  endpoint: string,
  config: RequestInit = {},
): Promise<T> {
  // Monta a URL garantindo que o apikey sempre esteja lá
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}${separator}apikey=${API_KEY}`;

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  return response.json();
}

// --- Funções Específicas ---

export const ticketmasterApi = {
  // Exemplo para a Home (ISR)
  getPopularEvents: () =>
    fetchTicketmaster<TicketmasterResponse>(
      "/events.json?size=12&sort=relevance,desc",
      {
        next: { revalidate: 3600 }, // Revalida a cada 1 hora
      },
    ),

  // Exemplo para a Busca (SSR)
  searchEvents: (term: string) =>
    fetchTicketmaster<TicketmasterResponse>(`/events.json?keyword=${term}`, {
      cache: "no-store", // Força SSR (sem cache fixo)
    }),

  // Exemplo para Detalhes (SSG)mas m
  getEventById: (id: string) =>
    fetchTicketmaster<Event>(`/events/${id}.json`, {
      next: { revalidate: 86400 }, // Revalida a cada 24h
    }),
};
