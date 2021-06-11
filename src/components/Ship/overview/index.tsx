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
import { getData } from './scrape'

import { ShipProps, MapProps, RatingProps, HomeportProps } from './interface'
import { StateProps } from '../../../state_manage/interface'

const mapStateToProps = (state: StateProps) => {
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

const ConnectedOverview: React.FC<ShipProps> = ( { overview_data, shipraw_data } ) => {
	const data = overview_data

	if (shipraw_data[0].querySelector('body')) getData();
	
	return (
		<div className='p-20 w-full h-screen flex flex-col overview'>
			{data.name ? <>
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