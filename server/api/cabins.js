const axios = require('axios');
const jsdom = require("jsdom");

module.exports = async (req, res) => {
    const getCategories = e => {
        if (!e[e.length - 1]?.nextElementSibling?.querySelector("a")?.classList?.contains("tooltips")) return e;
        return e.concat(getCategories([e[e.length - 1].nextElementSibling]));
    };

    const getOthers = e => {
        const result = [];
        while (e.nodeName !== "H4") {
            if (e.nodeName !== "#comment") result.push(e);
            if (!e.nextSibling) break;
            e = e.nextSibling;
        }
        return result;
    };


    const request = await axios.get("https://www.cruisedeckplans.com/DP/deckplans/" + req.params.id.split(" ").join("-")).catch(() => null);
    if (request && request.status === 404) {
        res.send({});
        return
    };
    const data = await request && request?.data;
    const dom = new jsdom.JSDOM(data)
    const html = dom.window.document

    const result = Array.from(html.querySelectorAll(".portlet-body .portlet.box")).map(e => {
        e.nextElementSibling;
        const metavalue = e.querySelector("#catcontent-main span")?.textContent?.match(/Sleeps up to:\s*(\d+)\s+(\d+)\s*Staterooms\s+Cabin:\s*(\d+)\s+sqft\s*\((\d+)\s*m2\)\s+(?:Balcony:\s*(\d+)\s*sqft.\((\d+)\s*m2\)|)/)?.slice(1) || [];
        const metakey = [
            "capacity",
            "amount",
            "room_sqft",
            "room_m2",
            "balcony_sqft",
            "balcony_m2"
        ];
        const metadata = Object.fromEntries(metavalue.map((e, i) => [metakey[i], e]));
        const details = e.querySelector("div.content.style-cattext");
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
                full: "https://www.cruisedeckplans.com" + (e.querySelector("img")?.parentElement)?.href || "",
                thumb: "https://www.cruisedeckplans.com" + e.querySelector("img")?.src.replace('..', '') || ""
            },
            image: Array.from(e.querySelectorAll("img")).map(e => "https://www.cruisedeckplans.com/DP" + e.src.replace(/^\/ship/, "").replace('..', '')).filter(e => e.includes("cabinpics")),
            location: Array.from(details.querySelectorAll("p[style~='float:left']")).map(e => {
                return {
                    deck: e.textContent?.replace(/-\s+$/, "").trim() || "",
                    categories: getCategories([e.nextElementSibling]).map(e => {
                        return {
                            name: e.textContent || "",
                            background: e.style.backgroundImage || ""
                        };
                    })
                };
            }),
            features: details.querySelector("div[style~='background-color:#E1F0FF']")?.innerHTML?.split("<br>").map(e => e.trim().replace(/^-\s+/, "").replace(/\.$/, "")).filter(e => e) || [],
            important_size_info: Array.from(details.querySelectorAll("h4")).filter(e => e.textContent?.toLowerCase() === "important size information").map(e => e.nextElementSibling?.textContent)[0] || "",
            perks: perks?.textContent?.replace(/\/\s+$/, "").split("/").map(e => e.trim()).filter(e => e) || [],
            others: getOthers(perks?.nextSibling).map(e => {
                return {
                    type: ["NOTE", "IMPORTANT NOTE"].includes(e.textContent?.split(":")[0] || "") ? "NOTE" : e.nodeName,
                    content: e.textContent?.trim() !== "/" ? e.textContent?.trim() || "" : ""
                };
            }).filter(e => e.content)
        };
    });

    res.send(result);
}