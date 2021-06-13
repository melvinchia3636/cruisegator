/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import store from "../../../state_manage/store";
import { setItinerariesData } from "state_manage/actions";

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
				title: e.title,
				length: e.length,
				departurePort: {
					image: departurePort.imageUrl,
					name: departurePort.name
				},
				itinerary,
				sailings
			};
		});
		store.dispatch(setItinerariesData(itineraries_data));
	}
};

export { getData };