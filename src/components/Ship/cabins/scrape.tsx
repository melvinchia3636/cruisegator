/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import store from "../../../state_manage/store";
import { setCabinsData } from "state_manage/actions";

const getData  = (): void => {
	const getCategories = (e: any): Element[] => {
		console.log(e[e.length-1]);	
		if (!e[e.length-1]?.nextElementSibling?.querySelector("a")?.classList?.contains("tooltips")) return e;
		return e.concat(getCategories([e[e.length-1].nextElementSibling]));
	};
	const { shipraw_data } = store.getState();
	const html: Document = shipraw_data[2];
	store.dispatch(setCabinsData(Array.from(html.querySelectorAll(".portlet-body .portlet")).map(e => {
		e.nextElementSibling;
		const metavalue: string[] = e.querySelector("#catcontent-main span")?.textContent?.match(/Sleeps up to:\s*(\d+)\s+(\d+)\s*Staterooms\s+Cabin:\s*(\d+)\s+sqft\s*\((\d+)\s*m2\)\s+(?:Balcony:\s*(\d+)\s*sqft.\((\d+)\s*m2\)|)/)?.slice(1) || [];
		const metakey: string[] = [
			"capacity",
			"amount",
			"room_sqft",
			"room_m2",
			"balcony_sqft",
			"balcony_m2"
		];
		const metadata = Object.fromEntries(metavalue.map((e, i) => [metakey[i], e]));
		const details: Element = e.querySelector("div.content.style-cattext") as Element;
		return {
			name: e.querySelector(".portlet-title")?.textContent?.trim(),
			categories: Array.from(e.querySelectorAll(".col-xs-2 > p > a")).map(e => {
				return {
					name: e.textContent,
					description: e.getAttribute("title")?.replace(/Category .*?:/, "").trim()
				};
			}),
			...metadata,
			image: Array.from(e.querySelectorAll("img")).map(e => e.src).filter(e => e.includes("cabinpics")),
			location: Array.from(details.querySelectorAll("p[style~='float:left']")).map(e => {return {deck: e.textContent?.replace("-", "").trim(), categories: getCategories([e.nextElementSibling]).map(e => e.textContent)};})
		};
	})));
};

export { getData };