export interface CabinsProps {
	id: string;
	cabins_data: CabinsData[],
	setCabinsData: any
}

export interface CabinsData extends Metadata {
	name:                 string;
	categories:           Category[];
	diagram:			  Diagram;
	image:                string[];
	location:             Location[];
	features:             string[];
	important_size_info:  string;
	perks:                string[];
	others:               Other[];
	state?:		          any;
	setState?: 			  any;
}

export interface Metadata {
	capacity:             string;
	amount:               string;
	room_sqft:            string;
	room_m2:              string;
	balcony_sqft?:        string;
	balcony_m2?:          string;
}

export interface Category {
	name:        string;
	description: string;
	background: string;
}

export interface Diagram {
	full: string, 
	thumb: string
}

export interface Location {
	deck:       string;
	categories: LocationCategory[];
}

export interface LocationCategory {
	name: string;
	background: any
}

export interface Other {
	type:    string;
	content: string;
}