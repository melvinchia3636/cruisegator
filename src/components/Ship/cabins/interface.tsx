export interface CabinsProps {
	id: string;
	shipraw_data: Document[],
	cabins_data: CabinsData[]
}

export interface CabinsData extends Metadata {
	name:                 string;
	categories:           Category[];
	diagram:			  Diagram;
	image:                string[];
	location:             Location[];
	features:             string[];
	important_size_info:  string;
	perks:                string;
	others:               Other[];
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
	categories: string[];
}

export interface Other {
	type:    string;
	content: string;
}