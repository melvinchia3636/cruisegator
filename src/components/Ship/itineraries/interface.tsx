export interface MoreInfoData {
	service_info: object,
	interesting_fact: object
}

export interface ItinerariesData extends MoreInfoData {
	itineraries_data: string[][]
}

export interface ItinerariessProps {
	id: string;
	itineraries_data: ItinerariesData,
	shipraw_data: any
}