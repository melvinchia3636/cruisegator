const axios = require('axios');
const jsdom = require("jsdom");

module.exports = {
	DatabaseList: async (req, res) => {
	
		const result = [];
		const page_num = parseInt(req.params.page);
		
		for (let i = page_num*2-1; i <= page_num*2; i++) {
			const request = await axios.get("https://www.cruisemapper.com/ships?page="+i).catch(() => null);
			if (request && request.status === 404) break;
			const data = await request && request?.data;
			const dom = new jsdom.JSDOM(data);
			const html = dom.window.document;
			
			result.push(Array.from(html.querySelector(".shipList")?.querySelectorAll(".shipListItem") || []).map(data => {
				const raw = data.querySelectorAll("table td:last-child");
				const second = Array(2).fill(0).map((_, i) => (raw[i].textContent || "/").split("/").map(e => e.trim())).flat();
				const line_id_raw = data.querySelector(".labelCategory")?.href.split("-")
				return {
					link: (()=>{const a=data.querySelector("a")?.href.split("/"); return a[a.length-1];})(),
					image: "https://www.cruisemapper.com/"+data.querySelector("img")?.src,
					name: data.querySelector("a[rel=\"bookmark\"]")?.textContent,
					lines: data.querySelector(".labelCategory")?.textContent,
					line_id: line_id_raw[line_id_raw.length-1],
					cruise: data.querySelector(".cruiseTitle")?.textContent,
					...Object.fromEntries((["year", "age", "passenger"]).map((e, i) => [e, second[i]]))
				};
			}));
		}
		res.send(result.flat());
	},
	DatabaseSearch: async (req, res) => {
		const request = await axios.get("https://www.cruisemapper.com/ship/search.json?s="+encodeURIComponent(req.query.q), {
			headers: {
				"X-Requested-With": "XMLHttpRequest",
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0"
			}
		})
		const data = await request && request?.data;
		res.send(data)
	}
}