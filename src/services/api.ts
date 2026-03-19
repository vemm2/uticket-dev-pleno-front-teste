'use server';

import { Event, TicketmasterResponse } from "@/types/ticketmaster";

const BASE_URL = process.env.TICKETMASTER_BASE_URL;
const API_KEY = process.env.TICKETMASTER_API_KEY;

async function fetchTicketmaster<T>(
  endpoint: string,
  config: RequestInit = {},
): Promise<T> {
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}${separator}apikey=${API_KEY}`;

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  return response.json();
}

// --- Server Actions ---

export async function getPopularEvents() {
  return fetchTicketmaster<TicketmasterResponse>(
    "/events.json?size=12&sort=relevance,desc",
    {
      next: { revalidate: 3600 }, // Revalida a cada 1 hora
    },
  );
}

export async function searchEvents(filters: {
  keyword?: string;
  city?: string;
  page?: number;
  startDate?: string;
  endDate?: string;
  category?: string;
}) {
  const params = new URLSearchParams();

  if (filters.keyword) params.append('keyword', filters.keyword);
  if (filters.city) params.append('city', filters.city);
  if (filters.category) params.append('classificationName', filters.category);
  if (filters.startDate) params.append('startDateTime', filters.startDate);
  if (filters.endDate) params.append('endDateTime', filters.endDate);

  params.append('page', String(filters.page || 0));
  params.append('size', '12');

  return fetchTicketmaster<TicketmasterResponse>(
    `/events.json?${params.toString()}`,
    {
      cache: "no-store", // sem cache fixo
    },
  );
}

export async function getEventById(id: string) {
  return fetchTicketmaster<Event>(`/events/${id}.json`, {
    next: { revalidate: 86400 }, // Revalida a cada 24h
  });
}