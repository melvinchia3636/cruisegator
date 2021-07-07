const axios = require('axios');
const jsdom = require("jsdom");

const getRawData = html => JSON.parse(html.getElementById("__NEXT_DATA__")?.innerHTML || "[]").props.pageProps.apolloState;

module.exports = async (req, res) => {
	const request = await axios.get(`https://www.cruisecritic.com/cruiseto/cruiseitineraries.cfm?shipID=` + req.params.id).catch(() => null);
	if (request && request.status === 404) {
		res.send({});
		return;
	};

	const data = await request && request?.data;
	const dom = new jsdom.JSDOM(data);
	const html = dom.window.document;

	if (JSON.stringify(stupidly_messy_data) !== "{}") {
		const inner_messy_data = getRawData(html);
		const itineraries_raw_data = Object.entries(inner_messy_data).filter(([k, _]) => k.match(/^Itinerary:\d+$/));
		const itineraries_raw_data_data = itineraries_raw_data.map(([_, v]) => v);
		const itineraries_data = itineraries_raw_data_data.map(e => {
			const departurePort = inner_messy_data[e.departurePort.id];
			const itinerary = inner_messy_data[e.itinerary.id].results.map(({ id }) => inner_messy_data[id]).map(({ day, port }) => {return {day, port: inner_messy_data[port.id].name};});
			const sailings = inner_messy_data[e.sailings.id].results.map(({ id }) => inner_messy_data[id].departureDate);
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

		res.send(itineraries_data);
	}
}