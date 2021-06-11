import store from '../../../state_manage/store'
import { setOverviewData } from "state_manage/actions";
import { RawJsonData, OverviewData } from './interface'

const getData  = async () => {
	const { shipraw_data, overview_data } = store.getState()
	const check_status = ( text: string ): 'green' | 'yellow' | 'red' => {
		if (text.includes('minute') || text.includes('second')) return 'green';
		if (text.includes('hour')) return 'yellow';
		return 'red'
	}
	if (overview_data.name) return
	const html: Document = shipraw_data[0]
	const raw: string = (html.querySelectorAll('head script')[1].textContent?.match(/{.+}/) || ['{}'])[0].replaceAll('\'', '"');
	const parser = require('really-relaxed-json').createParser();
	const obj: string = parser.stringToJson(raw);
	const json: RawJsonData = JSON.parse(obj);
	const position_info: string = (html.querySelector('.currentItineraryInfo')?.textContent || '').replace(/\s+/gm, ' ');
	const currentLocation: string[] = position_info.match(/current location is at (.*?)\(/) || [];
	const currentCoordinates: string[] = position_info.match(/\(coordinates\s*((?:\d|\.|-)+\s*[N|E|S|W]\s*\/\s*(?:\d|\.|-)+\s*[N|E|S|W])\)/) || [];
	const destination: string[] = position_info.match(/en route to (.*?)\./) || [];
	const last_ais_report: string[] = position_info.match(/The AIS position was reported (.*?)\./) || [];
	const speed_kn: string[] = position_info.match(/speed of ([\d.]*?\s*kn)/) || [];
	const speed_mkph: string[] = position_info.match(/\(([\d.]*?\s*kph)\s*\/\s*([\d.]*?\s*mph)\)/) || [];
	const ais_report: string = last_ais_report[last_ais_report.length-1] || 'N/A';
	const kmph: string[] = speed_mkph.slice(1, speed_mkph.length)
	
	const result: OverviewData = {
		is_new: json.widgets?.shipNewsButton?.state || false,
		rating: json.widgets.rating?.stars || 0,
		name: html.querySelector('h1[itemprop="name"]')?.textContent || 'N/A',
		company: html.querySelector('a.shipCompanyLink')?.textContent || 'N/A',
		image: 'https://www.cruisemapper.com/'+(html.querySelector('img[itemprop="image"]') as HTMLImageElement)?.src.replace('http://localhost:3000', '') || '',
		homeports: [...html.querySelectorAll('.homeports a')].map(e => {
			const content = e.textContent || '';
			const bracket = content.match(/\(.*?\)/) || []
			return {
				icon: e.querySelector('span')?.classList.value || '',
				text: [bracket[bracket.length-1], content.split('(')[0]]
			}
		}),
		location: currentLocation[currentLocation.length-1] || 'N/A',
		coordinates: currentCoordinates[currentCoordinates.length-1] || 'N/A',
		destination: destination[destination.length-1] || 'N/A',
		last_ais_report: {
			text: ais_report,
			status: check_status(ais_report),
		},
		speed: {
			knot: speed_kn[speed_kn.length-1] || 'N/A',
			kmph: kmph.length > 0 ? kmph : 'N/A'
		},
		position: json.widgets.shipCurrentPositionMap
	};

	store.dispatch(setOverviewData(result));
}

export { getData };