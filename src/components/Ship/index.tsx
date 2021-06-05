import './style.scss';
import Icon from '@iconify/react';
import { IconifyIcon } from '@iconify/types'
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios, { AxiosResponse } from 'axios'

import appsList20Regular from '@iconify-icons/fluent/apps-list-20-regular';
import settings28Regular from '@iconify-icons/fluent/settings-28-regular';
import conferenceRoom28Regular from '@iconify-icons/fluent/conference-room-28-regular';
import calendarLtr28Regular from '@iconify-icons/fluent/calendar-ltr-28-regular';
import news28Regular from '@iconify-icons/fluent/news-28-regular';
import warning24Regular from '@iconify-icons/fluent/warning-24-regular';
import layer20Regular from '@iconify-icons/fluent/layer-20-regular';
import briefcaseLine from '@iconify/icons-clarity/briefcase-line';
import anchorIcon from '@iconify/icons-simple-line-icons/anchor';
import locationIcon from '@iconify/icons-carbon/location';
import crossroadsIcon from '@iconify/icons-carbon/crossroads';
import topSpeed24Regular from '@iconify-icons/fluent/top-speed-24-regular';
import 'flag-icon-css/sass/flag-icon.scss';

interface ShipProps {
	id: string
};

interface RawJsonData {
	widgets: {
		shipNewsButton?: {
			state: boolean
		},
		rating?: {
			stars: number
		},
		shipCurrentPositionMap: {
			lon: number,
			lat: number
		}
	},
	config: {}
};

interface ShipData {
	is_new: boolean,
	rating: number,
	name: string,
	company: string,
	image: string,
	homeports: {
        icon: string;
        text: string[];
    }[]
};

function Sidebar( { activeTab = 0 } ): JSX.Element {
	const options: [IconifyIcon, string, boolean?][] = [
		[appsList20Regular, 'overview'],
		[settings28Regular, 'specifications'],
		[calendarLtr28Regular, 'itineraries'],
		[layer20Regular, 'deck plans'],
		[conferenceRoom28Regular, 'cabins'],
		[news28Regular, 'news'],
		[warning24Regular, 'accidents'],
	]
	options[activeTab].push(true)
	
	return (
		<div className='d-flex flex-column justify-content-center fs-6 sidebar vh-100'>
			{options.map(([icon, text, is_active]) => <a className={'text-uppercase text-decoration-none text-dark ps-5 d-flex align-items-center '+(is_active ? 'active': '')}><Icon icon={icon} width="28" className='me-3'/>{text}</a>)}
		</div>
	)
}

export default function Ship(props: ShipProps): JSX.Element {
	mapboxgl.accessToken = 'pk.eyJ1IjoicmVkYXhlIiwiYSI6ImNrOWk3am0zYjB4dGIzZGtmenl3cmw1ZmMifQ.mwTbGVSSSuBpmCvOh6oCxw';
	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map>();
	const [data, setData] = useState<ShipData>();
	const [activeTab, changeActiveTab] = useState< number>(0)

	useEffect(() => {
		const getData  = async () => {
			const request: AxiosResponse<any> = await axios.get('https://codeblog-corsanywhere.herokuapp.com/https://www.cruisemapper.com/ships/'+props.id);
			const rdata: string = request.data;
			const dom_parser: DOMParser = new DOMParser();
			const html: Document = dom_parser.parseFromString(rdata, 'text/html');
			const raw: string = (html.querySelectorAll('head script')[1].textContent?.match(/{.+}/) || ['{}'])[0].replaceAll('\'', '"');
			const obj: string = eval('(' + raw + ')');
			const json: RawJsonData = JSON.parse(JSON.stringify(obj));
			const result: ShipData = {
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
				})
			};
			const position:{
				lon: number;
				lat: number;
			} = json.widgets.shipCurrentPositionMap;

			setData(result);
			if (map.current) return;

			if (position) {
				map.current = new mapboxgl.Map({
					container: mapContainer.current || '',
					style: 'mapbox://styles/mapbox/streets-v11',
					center: [position.lon, position.lat],
					zoom: 3
				});

				map.current.on('load', function(){
					new mapboxgl.Marker({ color: 'rgba(0, 85, 185, 1)' })
					.setLngLat([position.lon, position.lat])
					.addTo(map.current as mapboxgl.Map);
				});
			}
		}
		getData();
	}, [])
	return (
		<div className='w-100 py-5 vh-100 d-flex'>
			<Sidebar activeTab={activeTab}/>
			<div className='p-5 w-100 vh-100 d-flex flex-column'>
				{data ? <>
					<div className='d-flex justify-content-between align-items-center'>
						<div>
							<h1 className='text-uppercase mt-4'>{data.name}</h1>
							<div className='seperator btn-primary'></div>
						</div>
						<div className='d-flex' style={{height: 'min-content'}}>
							{[...Array(data.rating)].map(()=><span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>)}
							{[...Array(5-(data.rating || 5))].map(()=><span className='border border-primary d-block border-2 rounded-pill'></span>)}
						</div>
					</div>
					<div className='mt-5 d-flex justify-content-between'>
						<div>
							<div>
								<h2 className='fs-5 fw-normal'><Icon icon={briefcaseLine} style={{fontSize: '24px'}} className='me-2'/>Cruise line</h2>
								<h3 className='fs-4 fw-normal'>{data.company}</h3>
							</div>
							<div style={{marginTop: '2em'}}>
								<h2 className='fs-5 fw-normal'><Icon icon={anchorIcon} style={{fontSize: '20px'}} className='me-2'/>Homeport</h2>
								{data.homeports.length > 0 ? data.homeports.slice(0, 2).map(({icon, text}) => <div className='d-flex align-items-center mb-2'><span className={icon}></span><h3 className='fs-4 fw-normal d-flex align-items-end m-0'>{text[1]}<h6 className='ms-2'>{text[0]}</h6></h3></div>) : <h3 className='fs-4 fw-normal d-flex align-items-end m-0 mt-3'>N/A</h3>}
							</div>
						</div>
						<div className='h-100 position-relative img'>
							<div className='bd bg-primary'></div>
							<div className='p-1 bg-white i position-relative'><img src={data.image} className='' height="260"></img></div>
							<div className='bd bg-primary position-relative'></div>
						</div>
					</div>
					<div className='d-flex h-100 mt-5 w-100'>
						<div ref={mapContainer} className="map-container shadow" style={{height: '85%', width: '100%'}} />
						<div className='ms-5 d-flex flex-column justify-content-center w-100' style={{height: '85%'}}>
							<div className='w-100'>
								<div className='d-flex w-100 justify-content-between'><h2 className='fs-5 fw-normal'><Icon icon={locationIcon} style={{fontSize: '24px'}} className='me-2'/>Current location</h2><p className='float-end d-flex align-items-center'><span className='d-block rounded-pill bg-success bd-0 me-2 stat'></span>6 minutes ago</p></div>
								<h3 className='fs-4 fw-normal d-flex align-items-end'>South East Asia <h6 className='ms-2 mb-1'>(1.26638 N / 103.85941 E)</h6></h3>
							</div>
							<div className='d-flex mt-5'>
								<div>
									<h2 className='fs-5 fw-normal'><Icon icon={crossroadsIcon} style={{fontSize: '24px'}} className='me-2'/>Destination</h2>
									<h3 className='fs-4 fw-normal d-flex align-items-end'>SIN PEBGA</h3>
								</div>
								<div className='ms-5'>
									<h2 className='fs-5 fw-normal'><Icon icon={topSpeed24Regular} style={{fontSize: '24px'}} className='me-2'/>Speed</h2>
									<h3 className='fs-4 fw-normal d-flex align-items-end'>10kn <h6 className='ms-2 mb-1'>(19 kph / 12 mph)</h6></h3>
								</div>
							</div>
						</div>
					</div>
				</> : ''}
			</div>
		</div>
	)
}