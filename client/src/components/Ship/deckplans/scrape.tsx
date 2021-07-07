/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import store from "../../../state_manage/store";
import { setDeckPlansData } from "state_manage/actions";
import axios from "axios";

const getData  = async (id: string): Promise<void> => {
	const response = await axios.get(`https://codeblog-corsanywhere.herokuapp.com/https://www.cruisedeckplans.com/DP/deckplans/deckbydeck.php?ship=${id}&deck=8`); //&deck=${firstdeck}
	const raw = response.data;
	const parser = new DOMParser();
	const html = parser.parseFromString(raw, "text/html");
	const {0: firstdeck, length: l, [l-1]: lastdeck}: number[] = Array.from(html.querySelector(".panel-body")?.querySelectorAll("a") || []).map(e => parseInt((e.href.match(/&deck=(\d+)$/) || [])[1])).filter(e => e);
	const panels = html.querySelectorAll(".panel.panel-default");
	const staterooms_raw = Array.from(panels).filter(e => e.querySelector(".panel-title")?.textContent?.includes("Stateroom"))[0].querySelector(".panel-body");
	const staterooms_inner = staterooms_raw?.querySelector(".sublisting")?.innerHTML || "";
	const staterooms_inner_raw = staterooms_inner.split("<br>").filter(e => e.trim()).map(e => parser.parseFromString(e, "text/html"));
	const staterooms_inner_raw_group = [...Array(Math.ceil(staterooms_inner_raw.length / 2))].map(_ => staterooms_inner_raw.splice(0, 2));
	const staterooms = staterooms_inner_raw_group.map(([title, categories]) => ({
		name: title.querySelector("div")?.textContent,
		img: title.querySelector("img")?.src.replace(window.location.origin, ""),
		categories: Array.from(categories.querySelectorAll("p > a")).map(e => {
			return {
				name: e.textContent || "",
				description: e.getAttribute("title")?.replace(/Category .*?:/, "").trim() || "",
				background: e.parentElement?.style.backgroundImage || ""
			};
		}),
	}));
	
	store.dispatch(setDeckPlansData({
		decks: {
			firstdeck,
			lastdeck
		},
		staterooms
	}));
};

export { getData };