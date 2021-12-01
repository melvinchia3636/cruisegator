import { SpecificationData } from "../specifications/interface";

export interface RawJsonData {
	widgets: {
		shipNewsButton?: {
			state: boolean
		},
		rating?: {
			stars: number
		},
		shipCurrentPositionMap: {
			lon: number,
			lat: number
		}
	},
	config: {

	}
}

export interface RatingProps {
	rating: number
}

export interface HomeportProps {
	homeports: {
        icon: string;
        text: string[];
    }[]
}

export interface ShipProps {
	shipraw_data: Document;
	overview_data: OverviewData;
	specification_data: SpecificationData;
	setSpecificationData: (data: SpecificationData) => {
		type: string;
		payload: SpecificationData;
	};
	id: string;
	changeTab: (newtab: number) => {
		type: string;
		payload: number;
	},
	setLoaded: any
}

export interface OverviewData extends HomeportProps, RatingProps {
	is_new: boolean,
	location: string,
	coordinates: string,
	destination: string,
	last_ais_report: {
		status: "green" | "yellow" | "red",
		text: string
	},
	speed: {
		knot: string,
		kmph: string[] | string
	},
	position: {
		lon: number;
		lat: number;
	}
}

export interface MapProps {
	position: {
		lon: number,
		lat: number
	}
}