export interface ItinerariesData {
  id: number;
  title: string;
  length: number;
  departurePort: DeparturePort;
  itinerary: Itinerary[];
  sailings: string[];
  state?: any;
  setState?: any;
}

export interface DeparturePort {
  image: string;
  name: string;
}

export interface Itinerary {
  day: number;
  port: string;
}

export interface ItinerariesProps {
  id: number | undefined;
  itineraries_data: ItinerariesData[] | 'no data';
  setLoaded: any;
}
