/**
 * Formata data para exibição
 */

import { Classification, Event, Image, PriceRange } from "@/types/ticketmaster";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("pt-BR", options);
};

/**
 * Formata preço em Real
 */
export const formatPrice = (value: number) => {
  if (!value) return "Grátis";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

/**
 * Extrai a melhor imagem do evento
 */
export const getEventImage = (images: Image[]) => {
  if (!images || images.length === 0) {
    return "https://via.placeholder.com/400x300?text=Sem+Imagem";
  }

  const largeImage = images.find(
    (img) => img.ratio === "16_9" && img.width > 1000,
  );
  const mediumImage = images.find(
    (img) => img.ratio === "16_9" && img.width > 500,
  );

  return largeImage?.url || mediumImage?.url || images[0].url;
};

/**
 * Extrai categorias do evento
 */
export const getEventCategories = (
  classifications: Classification[] | undefined,
) => {
  if (!classifications || classifications.length === 0) return [];

  const categories = [];
  const classification = classifications[0];

  if (classification.segment?.name)
    categories.push(classification.segment.name);
  if (classification.genre?.name) categories.push(classification.genre.name);
  if (classification.subGenre?.name)
    categories.push(classification.subGenre.name);

  return categories;
};

/**
 * Extrai preço do evento
 */
export const getEventPrice = (priceRanges: PriceRange[] | undefined) => {
  if (!priceRanges || priceRanges.length === 0) {
    return { min: 0, max: 0, currency: "BRL" };
  }

  const price = priceRanges[0];
  return {
    min: price.min || 0,
    max: price.max || 0,
    currency: price.currency || "BRL",
  };
};

/**
 * Determina status do evento
 */
export const getEventStatus = (event: Event): string => {
  const startDateTime = event.dates?.start?.dateTime;

  // ✅ Correção: Só criamos a Date se startDateTime for "truthy" (não undefined)
  const startDate = startDateTime ? new Date(startDateTime) : null;
  const now = new Date();

  if (event.dates?.status?.code === "cancelled") return "Cancelado";
  if (event.dates?.status?.code === "postponed") return "Adiado";

  // Se não tem data de início, tratamos como "A definir" ou verificamos outros campos
  if (startDate && startDate < now) return "Encerrado";

  // ... resto da lógica
  return "Inscrições abertas";
};

/**
 * Calcula contagem regressiva para o evento
 */
export const getCountdown = (dateString: string) => {
  const eventDate = new Date(dateString);
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();

  if (diff < 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, expired: false };
};

/**
 * Formata data para ISO 8601
 */
export const formatToISODate = (date: string, isEnd: boolean = false) => {
  if (!date) return "";
  const time = isEnd ? "23:59:59Z" : "00:00:00Z";
  return `${date}T${time}`;
};
