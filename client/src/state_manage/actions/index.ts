import * as constants from "../constants";
import { OverviewData } from "components/Ship/overview/interface";
import { SpecificationData } from "components/Ship/specifications/interface";
import { ItinerariesData } from "components/Ship/itineraries/interface";
import { CabinsData } from "components/Ship/cabins/interface";
import { GalleryData } from "components/Ship/gallery/interface";

export function changeTab(payload: number): {
    type: string;
    payload: number;
} {
	return { type: constants.CHANGE_TAB, payload };
}

export function setShiprawData(payload: Document[]): {
    type: string;
    payload: Document[];
} {
	return {type: constants.SET_SHIPRAW_DATA, payload};
}

export function setOverviewData(payload: OverviewData): {
    type: string;
    payload: OverviewData;
} {
	return {type: constants.SET_OVERVIEW_DATA, payload};
}

export function setSpecificationData(payload: SpecificationData): {
    type: string;
    payload: SpecificationData;
} {
	return {type: constants.SET_SPECIFICATION_DATA, payload};
}

export function setItinerariesData(payload: ItinerariesData[] | "no data"): {
    type: string;
    payload: ItinerariesData[] | "no data";
} {
	return {type: constants.SET_ITINERARIES_DATA, payload};
}

export function setCabinsData(payload: CabinsData[]): {
    type: string;
    payload: CabinsData[];
} {
	return {type: constants.SET_CABINS_DATA, payload};
}

export function setGalleryData(payload: GalleryData[] | "no data"): {
    type: string;
    payload: GalleryData[] | "no data"
} {
	return {type: constants.SET_GALLERY_DATA, payload};
}

export function setDeckPlansData(payload: any): {
    type: string;
    payload: any
} {
	return {type: constants.SET_DECK_PLANS_DATA, payload};
}