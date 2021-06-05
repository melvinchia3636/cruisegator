import mapboxgl from 'mapbox-gl';
import Icon from '@iconify/react';
import React, { useRef, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios'

import briefcaseLine from '@iconify/icons-clarity/briefcase-line';
import anchorIcon from '@iconify/icons-simple-line-icons/anchor';
import locationIcon from '@iconify/icons-carbon/location';
import crossroadsIcon from '@iconify/icons-carbon/crossroads';
import topSpeed24Regular from '@iconify-icons/fluent/top-speed-24-regular';

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

interface RatingProps {
	rating: number
}

interface HomeportProps {
	homeports: {
        icon: string;
        text: string[];
    }[]
}

interface ShipData extends HomeportProps, RatingProps {
	is_new: boolean,
	name: string,
	company: string,
	image: string,
	location: string,
	coordinates: string,
	destination: string,
	last_ais_report: {
		status: 'success' | 'warning' | 'danger',
		text: string
	},
	speed: {
		knot: string,
		kmph: string[] | string
	}
};

const Rating: React.FC<RatingProps> = ( { rating } ): JSX.Element => {
	return (
		<div className='d-flex' style={{height: 'min-content'}}>
			{[...Array(rating)].map(()=><span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>)}
			{[...Array(5-(rating || 5))].map(()=><span className='border border-primary d-block border-2 rounded-pill'></span>)}
		</div>
	)
}

const Homeport: React.FC<HomeportProps> = ( { homeports } ): JSX.Element => {
	return (
		<div style={{marginTop: '2em'}}>
			<h2 className='fs-5 fw-normal'><Icon icon={anchorIcon} style={{fontSize: '20px'}} className='me-2'/>Homeport</h2>
			{homeports.length > 0 ? 
				homeports.slice(0, 2).map(
					({icon, text}) => 
					<div className='d-flex align-items-end mb-2'>
						<div className='d-flex align-items-center mb-0'>
							<span className={icon}></span>
							<h3 className='fs-4 fw-normal d-flex align-items-end m-0'>{text[1]}</h3>
						</div>
						<h6 className='ms-2 mb-1'>{text[0]}</h6>
					</div>
				) 
				:<h3 className='fs-4 fw-normal d-flex align-items-end m-0 mt-3'>N/A</h3>
			}
		</div>
	)
}

const Overview: React.FC<ShipProps> = ( { id } ) => {
	mapboxgl.accessToken = 'pk.eyJ1IjoicmVkYXhlIiwiYSI6ImNrOWk3am0zYjB4dGIzZGtmenl3cmw1ZmMifQ.mwTbGVSSSuBpmCvOh6oCxw';
	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map>();
	const [data, setData] = useState<ShipData>();
	console.log('test')

	useEffect(() => {
		const getData  = async () => {
			const check_status = ( text: string ): 'success' | 'warning' | 'danger' => {
				if (text.includes('minute') || text.includes('second')) return 'success';
				if (text.includes('hour')) return 'warning';
				return 'danger'
			}
			const request: AxiosResponse<any> = await axios.get('https://codeblog-corsanywhere.herokuapp.com/https://www.cruisemapper.com/ships/'+id);
			const rdata: string = request.data;
			const dom_parser: DOMParser = new DOMParser();
			const html: Document = dom_parser.parseFromString(rdata, 'text/html');
			const raw: string = (html.querySelectorAll('head script')[1].textContent?.match(/{.+}/) || ['{}'])[0].replaceAll('\'', '"');
			const obj: string = eval('(' + raw + ')');
			const json: RawJsonData = JSON.parse(JSON.stringify(obj));
			const position_info: string = (html.querySelector('.currentItineraryInfo')?.textContent || '').replace(/\s+/gm, ' ');
			const currentLocation: string[] = position_info.match(/current location is at (.*?)\(/) || [];
			const currentCoordinates: string[] = position_info.match(/\(coordinates\s*((?:\d|\.|-)+\s*[N|E|S|W]\s*\/\s*(?:\d|\.|-)+\s*[N|E|S|W])\)/) || [];
			const destination: string[] = position_info.match(/en route to (.*?)\./) || [];
			const last_ais_report: string[] = position_info.match(/The AIS position was reported (.*?)\./) || [];
			const speed_kn: string[] = position_info.match(/speed of ([\d.]*?\s*kn)/) || [];
			const speed_mkph: string[] = position_info.match(/\(([\d.]*?\s*kph)\s*\/\s*([\d.]*?\s*mph)\)/) || [];
			const ais_report: string = last_ais_report[last_ais_report.length-1] || 'N/A';
			const kmph: string[] = speed_mkph.slice(1, speed_mkph.length)
			
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
				}
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
		<div className='p-5 w-100 vh-100 d-flex flex-column'>
			{data ? <>
				<div className='d-flex justify-content-between align-items-center'>
					<div>
						<h1 className='text-uppercase mt-4'>{data.name}</h1>
						<div className='seperator btn-primary'></div>
					</div>
					<Rating rating={data.rating}/>
				</div>
				<div className='mt-5 d-flex justify-content-between'>
					<div>
						<div>
							<h2 className='fs-5 fw-normal'><Icon icon={briefcaseLine} style={{fontSize: '24px'}} className='me-2'/>Cruise line</h2>
							<h3 className='fs-4 fw-normal'>{data.company}</h3>
						</div>
						<Homeport homeports={data.homeports}/>
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
							<div className='d-flex w-100 justify-content-between'><h2 className='fs-5 fw-normal'><Icon icon={locationIcon} style={{fontSize: '24px'}} className='me-2'/>Current location</h2><p className='float-end d-flex align-items-center'><span className={'d-block rounded-pill bd-0 me-2 stat bg-'+data.last_ais_report.status}></span>{data.last_ais_report.text}</p></div>
							<div className='d-flex align-items-end'>
								<h3 className='fs-4 fw-normal m-0 loc'>{data.location} </h3>
								<h6 className='ms-2 mb-1'>({data.coordinates})</h6>
							</div>
						</div>
						<div className='d-flex mt-5'>
							<div>
								<h2 className='fs-5 fw-normal'><Icon icon={crossroadsIcon} style={{fontSize: '24px'}} className='me-2'/>Destination</h2>
								<h3 className='fs-4 fw-normal d-flex align-items-end'>{data.destination}</h3>
							</div>
							<div className='ms-5'>
								<h2 className='fs-5 fw-normal'><Icon icon={topSpeed24Regular} style={{fontSize: '24px'}} className='me-2'/>Speed</h2>
								<div className='d-flex align-items-end'>
									<h3 className='fs-4 fw-normal m-0'>{data.speed.knot}</h3>
									<h6 className='ms-2 mb-1'>({data.speed.kmph != 'N/A' ? (data.speed.kmph as string[]).join(' / ') : data.speed.kmph})</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</> : ''}
		</div>
	)
}

export default Overview