/* eslint-disable operator-linebreak */
/* eslint-disable global-require */
import { setOverviewData } from '../../../state_manage/actions';
import store from '../../../state_manage/store';
import { RawJsonData, OverviewData } from './interface';

const getData = (): void => {
  const { shipraw_data: shiprawData } = store.getState();
  const checkStatus = (text: string): 'green' | 'yellow' | 'red' => {
    if (text.includes('minute') || text.includes('second')) return 'green';
    if (text.includes('hour')) return 'yellow';
    return 'red';
  };
  const html: Document = shiprawData;
  const raw: string = (html.querySelectorAll('head script')[1]?.textContent?.match(/{.+}/) || [
    '{}',
  ])[0].replaceAll("'", '"');
  const parser = require('really-relaxed-json').createParser();
  const obj: string = parser.stringToJson(raw);
  const json: RawJsonData = JSON.parse(obj);
  if (!json.widgets) return;
  const positionInfo: string = (
    html.querySelector('.currentItineraryInfo')?.textContent || ''
  ).replace(/\s+/gm, ' ');
  const currentLocation: string[] = positionInfo.match(/location (?:is|was) at (.*?)\(/) || [];
  const currentCoordinates: string[] =
    positionInfo.match(
      /\(coordinates\s*((?:\d|\.|-)+\s*[N|E|S|W]\s*\/\s*(?:\d|\.|-)+\s*[N|E|S|W])\)/,
    ) || [];
  const destination: string[] = positionInfo.match(/en route to (.*?)\./) || [];
  const lastAISReport: string[] = positionInfo.match(/The AIS position was reported (.*?)\./) || [];
  const speedKN: string[] = positionInfo.match(/speed of ([\d.]*?\s*kn)/) || [];
  const speedMKPH: string[] =
    positionInfo.match(/\(([\d.]*?\s*kph)\s*\/\s*([\d.]*?\s*mph)\)/) || [];
  const AISReport: string = lastAISReport[lastAISReport.length - 1] || 'N/A';
  const kmph: string[] = speedMKPH.slice(1, speedMKPH.length);

  const result: OverviewData = {
    is_new: json.widgets?.shipNewsButton?.state || false,
    rating: json.widgets.rating?.stars || 0,
    homeports: [...html.querySelectorAll('.homeports a')].map((e) => {
      const content = e.textContent || '';
      const bracket = content.match(/\(.*?\)/) || [];
      return {
        icon: e.querySelector('span')?.classList.value || '',
        text: [bracket[bracket.length - 1], content.split('(')[0]],
      };
    }),
    location: currentLocation[currentLocation.length - 1] || 'N/A',
    coordinates: currentCoordinates[currentCoordinates.length - 1] || 'N/A',
    destination: destination[destination.length - 1] || 'N/A',
    last_ais_report: {
      text: AISReport,
      status: checkStatus(AISReport),
    },
    speed: {
      knot: speedKN[speedKN.length - 1] || 'N/A',
      kmph: kmph.length > 0 ? kmph : 'N/A',
    },
    position: json.widgets.shipCurrentPositionMap,
  };

  store.dispatch(setOverviewData(result));
};

export default getData;
