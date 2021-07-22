/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import store from "../../../state_manage/store";
import { setItinerariesData } from "state_manage/actions";
import { string } from "prop-types";
import axios from "axios";

declare global {
	interface ArrayConstructor {
		lastElement(arr: any[]) : any;
	}
}

Array.lastElement = (arr: any[]) => {
	return arr[arr.length-1];
};

const getData  = (itiID: number | undefined): void => {
	axios.get("https://api.cruisegator.thecodeblog.net/ship/itineraries/"+itiID).then(res => {
		const data = res && res?.data;
		store.dispatch(setItinerariesData(data.length > 0 ? data : "no data"));
	}).catch(() => null);
	
};

export { getData };