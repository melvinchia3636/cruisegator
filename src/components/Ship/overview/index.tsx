import mapboxgl from 'mapbox-gl';
import Icon from '@iconify/react';
import { connect } from "react-redux";
import React from 'react'

import briefcaseLine from '@iconify/icons-clarity/briefcase-line';
import anchorIcon from '@iconify/icons-simple-line-icons/anchor';
import locationIcon from '@iconify/icons-carbon/location';
import crossroadsIcon from '@iconify/icons-carbon/crossroads';
import topSpeed24Regular from '@iconify-icons/fluent/top-speed-24-regular';
import { setOverviewData } from 'state_manage/actions';

interface ShipProps {
	id: string,
	shipraw_data: Document[],
	overview_data: ShipData;
	setOverviewData: any
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
		status: 'green' | 'yellow' | 'red',
		text: string
	},
	speed: {
		knot: string,
		kmph: string[] | string
	},
	position: {
		lon: number;
		lat: number;
	}
};

interface MapProps {
	position: {
		lon: number,
		lat: number
	}
}

const mapStateToProps = (state: any) => {
	return {
		overview_data: state.overview_data,
		shipraw_data: state.shipraw_data
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setOverviewData: (data: any) => dispatch(setOverviewData(data))
	}
}

const Rating: React.FC<RatingProps> = ( { rating } ): JSX.Element => {
	return (
		<div className='flex' >
			{[...Array(rating)].map(()=><span className='border-blue-800 block border-2 rounded-full bg-blue-800 mx-1'></span>)}
			{[...Array(5-(rating || 5))].map(()=><span className='border-blue-800 border-2 block rounded-full mx-1'></span>)}
		</div>
	)
}

const Homeport: React.FC<HomeportProps> = ( { homeports } ): JSX.Element => {
	return (
		<div style={{marginTop: '2em'}}>
			<h2 className='text-xl flex items-center'><Icon icon={anchorIcon} style={{fontSize: '20px'}} className='mr-2'/>Homeport</h2>
			{homeports.length > 0 ? 
				homeports.slice(0, 2).map(
					({icon, text}) => 
					<div className='flex items-end mb-2'>
						<div className='flex items-center'>
							<span className={icon}></span>
							<h3 className='text-2xl flex items-end m-0'>{text[1]}</h3>
						</div>
						<h6 className='ml-2 font-poppins'>{text[0]}</h6>
					</div>
				) 
				:<h3 className='fs-4 fw-normal d-flex align-items-end m-0 mt-3'>N/A</h3>
			}
		</div>
	)
}

class Map extends React.Component<MapProps> {

	position: any;
	map: any;
	mapContainer: any;

	constructor(props: MapProps) {
		super(props)
		mapboxgl.accessToken = 'pk.eyJ1IjoicmVkYXhlIiwiYSI6ImNrOWk3am0zYjB4dGIzZGtmenl3cmw1ZmMifQ.mwTbGVSSSuBpmCvOh6oCxw';
		this.position = props.position;
		if (this.mapContainer) return
		this.mapContainer = React.createRef();
	}

	componentDidMount() {
		const position = this.position;

		if (position) {
			if (this.map) return
			this.map = new mapboxgl.Map({
				container: this.mapContainer.current || '.map-container',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [position.lon, position.lat],
				zoom: 3
			});

			const map = this.map

			map.on('load', function(){
				new mapboxgl.Marker({ color: 'rgba(0, 85, 185, 1)' })
				.setLngLat([position.lon, position.lat])
				.addTo(map as mapboxgl.Map);
			});
		}
	}

	render() {
		return <div ref={this.mapContainer} className="map-container shadow w-1/2"/>
	}
}

const ConnectedOverview: React.FC<ShipProps> = ( { id, overview_data, shipraw_data, setOverviewData } ) => {
	const data = overview_data

	const getData  = async () => {
		const check_status = ( text: string ): 'green' | 'yellow' | 'red' => {
			if (text.includes('minute') || text.includes('second')) return 'green';
			if (text.includes('hour')) return 'yellow';
			return 'red'
		}
		if (JSON.stringify(overview_data) !== '{}') return
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
			},
			position: json.widgets.shipCurrentPositionMap
		};

		setOverviewData(result);
	}
	if (shipraw_data[0]) getData();
	
	return (
		<div className='p-20 w-full h-screen flex flex-col overview'>
			{JSON.stringify(data) !== '{}' ? <>
				<div className='flex justify-between items-center'>
					<div>
						<h1 className='uppercase mt-10'>{data.name}</h1>
						<div className='w-20 h-1 mt-1 bg-blue-800'></div>
					</div>
					<Rating rating={data.rating}/>
				</div>
				<div className='mt-10 flex justify-between'>
					<div>
						<div>
							<h2 className='text-xl flex items-center'><Icon icon={briefcaseLine} style={{fontSize: '24px'}} className='mr-2'/>Cruise line</h2>
							<h3 className='text-3xl'>{data.company}</h3>
						</div>
						<Homeport homeports={data.homeports}/>
					</div>
					<div className='h-full relative img pt-8'>
						<div className='bd bg-blue-800'></div>
						<div className='p-1 bg-white i relative z-20'><img src={data.image} className='h-64' alt={data.name}></img></div>
						<div className='bd bg-blue-800 relative'></div>
					</div>
				</div>
				<div className='flex h-full w-full mt-10'>
					<Map position={data.position}/>
					<div className='ml-10 flex flex-col justify-center w-1/2'>
						<div className='w-full'>
							<div className='flex w-full justify-between clc'><h2 className='text-xl flex items-center cl'><Icon icon={locationIcon} style={{fontSize: '24px'}} className='mr-2'/>Current location</h2><p className='float-end flex items-center'><span className={`block rounded-full bd-0 mr-2 stat bg-${data.last_ais_report.status}-500`}></span>{data.last_ais_report.text}</p></div>
							<div className='flex items-end'>
								<h3 className='text-3xl m-0 loc'>{data.location} </h3>
								<h6 className='ml-2 font-poppins'>({data.coordinates})</h6>
							</div>
						</div>
						<div className='flex mt-10'>
							<div>
								<h2 className='text-xl fw-normal flex'><Icon icon={crossroadsIcon} style={{fontSize: '24px'}} className='mr-2'/>Destination</h2>
								<h3 className='text-2xl fw-normal d-flex align-items-end'>{data.destination}</h3>
							</div>
							<div className='ml-20'>
								<h2 className='text-xl flex items-center'><Icon icon={topSpeed24Regular} style={{fontSize: '24px'}} className='mr-2'/>Speed</h2>
								<div className='flex items-end'>
									<h3 className='text-2xl m-0'>{data.speed.knot}</h3>
									<h6 className='ml-2 font-poppins'>({data.speed.kmph !== 'N/A' ? (data.speed.kmph as string[]).join(' / ') : data.speed.kmph})</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</> : ''}
		</div>
	)
}

const Overview = connect(mapStateToProps, mapDispatchToProps)(ConnectedOverview)

export default Overview