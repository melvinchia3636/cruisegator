const axios = require('axios');
const jsdom = require("jsdom");

const getMoreInfo = (id, company) => {
	let result;
	switch (company) {
        case "Royal Caribbean": {
            const data = require("./data/royal_caribbean.js");
            result = data[id]; break;
        }
        case "MSC Cruises": {
            const data = require("./data/msc.js");
            result = data[id]; break;
        }
        case "Celebrity Cruises": {
            const data = require("./data/celebrity.js");
            result = data[id]; break;
        }
        default: result = {
            service_info: [],
            interesting_fact: []
        };
	}
	return result;
};

module.exports = async (req, res) => {
    const request = await axios.get("https://www.cruisemapper.com/ships/" + req.params.id).catch(() => null);
    if (request && request.status === 404) {
        res.send({});
        return
    };
    const data = await request && request?.data;
    const dom = new jsdom.JSDOM(data);
    const html = dom.window.document;

	if (!html.querySelector("body")) return;
	const specification_data_current = Object.fromEntries(Array.from(html.querySelectorAll(".specificationTable")).map(e => Array.from(e.querySelectorAll("tr")).map(e => e.querySelectorAll("td"))).flat().map(e => Array.from(e).map(e => e.textContent?.trim() || "")));
	const splitted_id = req.params.id.split("-");
	const splitted_id_nonum = splitted_id.slice(0, splitted_id.length-1).join(" ").replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
	const company = html.querySelector("a.shipCompanyLink")?.textContent || "N/A";
	const more_info = getMoreInfo(splitted_id_nonum, company);
	const result = {
		specification_data: specification_data_current,
		...more_info
	};
	store.dispatch(setSpecificationData(result));
}