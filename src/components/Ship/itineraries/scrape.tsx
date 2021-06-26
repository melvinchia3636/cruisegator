/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import store from "../../../state_manage/store";
import { setItinerariesData } from "state_manage/actions";
import { string } from "prop-types";

declare global {
	interface ArrayConstructor {
		lastElement(arr: any[]) : any;
	}
}

Array.lastElement = (arr: any[]) => {
	return arr[arr.length-1];
};

const getItiID = (id: string): number|undefined => {
	const ids = require("./test.json");
	const id2 = id.toLowerCase();

	const result = ids.filter((e: {id: string, name: string}) => {
		const id1 = e.name.toLowerCase();
		return id2.includes(id1) || id1.includes(id2);
	});
	if (result.length <= 1) return result[0]?.id;

	const result2 = result.map((e: any) => {
		const id3 = id2.split(" ");
		return id3.map(i => e.name.toLowerCase().split(" ").includes(i)).filter((e: boolean) => e).length;
	});
	return result[result2.indexOf(Math.max(...result2))]?.id;
};

const getData  = (): void => {
	const { shipraw_data } = store.getState();
	const html: Document[] = shipraw_data;
	const stupidly_messy_data = JSON.parse(html[1].querySelector("#__NEXT_DATA__")?.innerHTML || "{}");
	if (JSON.stringify(stupidly_messy_data) !== "{}") {
		const inner_messy_data = stupidly_messy_data.props.pageProps.apolloState;
		const itineraries_raw_data = Object.entries(inner_messy_data).filter(([k, _]: any) => k.match(/^Itinerary:\d+$/));
		const itineraries_raw_data_data = itineraries_raw_data.map(([_, v]) => v);
		const itineraries_data = itineraries_raw_data_data.map((e: any) => {
			const departurePort = inner_messy_data[e.departurePort.id];
			const itinerary = inner_messy_data[e.itinerary.id].results.map(({ id }: any) => inner_messy_data[id]).map(({ day, port }: any) => {return {day, port: inner_messy_data[port.id].name};});
			const sailings = inner_messy_data[e.sailings.id].results.map(({ id }: any) => inner_messy_data[id].departureDate);
			return {
				id: e.id,
				title: e.title.replace(/^\d*?\s.*?N.*?\s/, ""),
				length: e.length,
				departurePort: {
					image: departurePort.imageUrl,
					name: departurePort.name
				},
				itinerary,
				sailings
			};
		});
		store.dispatch(setItinerariesData(itineraries_data.length > 0 ? itineraries_data : "no data"));
	}
};

export { getData, getItiID };