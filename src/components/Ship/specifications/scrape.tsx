import store from "../../../state_manage/store";
import { setSpecificationData } from "state_manage/actions";
import { SpecificationData, MoreInfoData } from "./interface";

const getMoreInfo = (id: string, company: string): MoreInfoData => {
	let result: MoreInfoData;
	switch (company) {
	case "Royal Caribbean": {
		const data = require("./data/royal_caribbean.ts").default;
		result = data[id]; break;
	}
	case "MSC Cruises": {
		const data = require("./data/msc.ts").default;
		result = data[id]; break;
	}
	case "Celebrity Cruises": {
		const data = require("./data/celebrity.ts").default;
		result = data[id]; break;
	}
	default: result = {
		service_info: [],
		interesting_fact: []
	};
	}
	return result;
};

const getData  = ( id: string ): void => {
	const { shipraw_data } = store.getState();
	const html: Document = shipraw_data[0];
	if (!html.querySelector("body")) return;
	const specification_data_current: string[][] = Array.from(html.querySelectorAll(".specificationTable")).map(e => Array.from(e.querySelectorAll("tr")).map(e => e.querySelectorAll("td"))).flat().map(e => Array.from(e).map(e => e.textContent?.trim() || ""));
	const splitted_id: string[] = id.split("-");
	const splitted_id_nonum: string = splitted_id.slice(0, splitted_id.length-1).join(" ").replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
	const company: string = html.querySelector("a.shipCompanyLink")?.textContent || "N/A";
	const more_info: MoreInfoData = getMoreInfo(splitted_id_nonum, company);
	const result: SpecificationData = {
		specification_data: specification_data_current,
		...more_info
	};
	store.dispatch(setSpecificationData(result));
};

export { getData };