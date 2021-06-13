import * as constants from "../constants";
import { OverviewData } from "components/Ship/overview/interface";
import { SpecificationData } from "components/Ship/specifications/interface";
import { ItinerariesData } from "components/Ship/itineraries/interface";

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

export function setItinerariesData(payload: ItinerariesData[]): {
    type: string;
    payload: ItinerariesData[];
} {
	return {type: constants.SET_ITINERARIES_DATA, payload};
}

export function setCabinsData(payload: any) {
	return {type: constants.SET_CABINS_DATA, payload};
}