export interface ItinerariesData {
	id:            number;
	title:         string;
	length:        number;
	departurePort: DeparturePort;
	itinerary:     Itinerary[];
	sailings:      string[];
}

export interface DeparturePort {
	image: string;
	name:  string;
}

export interface Itinerary {
	day:  number;
	port: string;
}

export interface ItinerariessProps {
	id: string;
	itineraries_data: ItinerariesData[],
	shipraw_data: Document[]
}