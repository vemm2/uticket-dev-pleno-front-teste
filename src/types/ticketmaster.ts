export interface TicketmasterResponse {
  _embedded?: {
    events: Event[];
  };
  page: PageInfo;
  _links?: Links;
}

export interface Event {
  id: string;
  name: string;
  info?: string;
  pleaseNote?: string;
  seatmap?: {
    staticUrl: string;
  };
  type: string;
  url: string;
  images: Image[];
  sales?: {
    public: {
      startDateTime: string;
      startTBD: boolean;
      startTBA: boolean;
      endDateTime: string;
    };
  };
  dates: {
    start: {
      localDate: string;
      localTime?: string;
      dateTime?: string;
      dateTBD: boolean;
      dateTBA: boolean;
      timeTBA: boolean;
      noSpecificTime: boolean;
    };
    status: {
      code: string; // Ex: 'onsale', 'offsale', 'canceled'
    };
    spanMultipleDays: boolean;
  };
  classifications?: Classification[];
  priceRanges?: PriceRange[];
  _embedded?: {
    venues?: Venue[];
    attractions?: Attraction[];
  };
}

export interface PriceRange {
  type: string;
  currency: string;
  min: number;
  max: number;
}

export interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  locale: string;
  postalCode?: string;
  timezone?: string;
  city: { name: string };
  state?: { name: string; stateCode: string };
  country: { name: string; countryCode: string };
  address?: { line1: string };
  location?: {
    longitude: string;
    latitude: string;
  };
}

export interface Attraction {
  id: string;
  name: string;
  url?: string;
  images: Image[];
  externalLinks?: {
    twitter?: ExternalLink[];
    facebook?: ExternalLink[];
    wiki?: ExternalLink[];
    instagram?: ExternalLink[];
    homepage?: ExternalLink[];
  };
}

export interface ExternalLink {
  url: string;
}

export interface Classification {
  primary: boolean;
  segment: { id: string; name: string };
  genre: { id: string; name: string };
  subGenre: { id: string; name: string };
  type?: { id: string; name: string };
  subType?: { id: string; name: string };
  family: boolean;
}

export interface PageInfo {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface Links {
  first?: { href: string };
  self?: { href: string };
  next?: { href: string };
  last?: { href: string };
}
