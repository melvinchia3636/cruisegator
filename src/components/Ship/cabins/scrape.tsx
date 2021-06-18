/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import store from "../../../state_manage/store";
import { setCabinsData } from "state_manage/actions";
import { Metadata } from "./interface";

const getData  = (): void => {
	const getCategories = (e: any): Element[] => {
		if (!e[e.length-1]?.nextElementSibling?.querySelector("a")?.classList?.contains("tooltips")) return e;
		return e.concat(getCategories([e[e.length-1].nextElementSibling]));
	};
	const getOthers = (e: ChildNode): ChildNode[] => {
		const result: ChildNode[] = [];
		while (e.nodeName !== "H4") {
			if (e.nodeName !== "#comment") result.push(e);
			if (!e.nextSibling) break;
			e = e.nextSibling;
		}
		return result;
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
		const metadata: Metadata = Object.fromEntries(metavalue.map((e, i) => [metakey[i], e])) as unknown as Metadata;
		const details: Element = e.querySelector("div.content.style-cattext") as Element;
		const perks = Array.from(details.querySelectorAll("h4")).filter(e => e.textContent?.toLowerCase() === "perks").map(e => e.nextSibling)[0];
		return {
			name: e.querySelector(".portlet-title")?.textContent?.trim() || "",
			categories: Array.from(e.querySelectorAll(".col-xs-2 > p > a")).map(e => {
				return {
					name: e.textContent || "",
					description: e.getAttribute("title")?.replace(/Category .*?:/, "").trim() || "",
					background: e.parentElement?.style.backgroundImage || ""
				};
			}),
			...metadata,
			diagram: {
				full: "https://www.cruisedeckplans.com"+(e.querySelector("img")?.parentElement as unknown as HTMLAnchorElement)?.href.replace(window.origin, "") || "",
				thumb: "https://www.cruisedeckplans.com"+e.querySelector("img")?.src.replace(window.origin, "") || ""
			},
			image: Array.from(e.querySelectorAll("img")).map(e => "https://www.cruisedeckplans.com/DP"+e.src.replace(window.origin, "")).filter(e => e.includes("cabinpics")),
			location: Array.from(details.querySelectorAll("p[style~='float:left']")).map(e => {return {
				deck: e.textContent?.replace("-", "").trim() || "", 
				categories: getCategories([e.nextElementSibling]).map(e => e.textContent || "")
			};}),
			features: details.querySelector("div[style~='background-color:#E1F0FF']")?.innerHTML?.split("<br>").map(e => e.trim().replace(/^-\s+/, "").replace(/\.$/, "")).filter(e => e) || [],
			important_size_info: Array.from(details.querySelectorAll("h4")).filter(e => e.textContent?.toLowerCase() === "important size information").map(e => e.nextElementSibling?.textContent)[0] || "",
			perks: perks?.textContent?.trim() || "",
			others: getOthers(perks?.nextSibling as ChildNode).map(e => {return {
				type: e.nodeName,
				content: e.textContent?.trim() || ""
			};}).filter(e => e.content)
		};
	})));
};

export { getData };