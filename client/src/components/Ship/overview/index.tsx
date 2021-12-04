import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactAnime from "react-animejs";

import { changeTab, setOverviewData, setSpecificationData } from "state_manage/actions";
import { getData } from "./scrape";

import { ShipProps, MapProps, OverviewData } from "./interface";
import { StateProps } from "../../../state_manage/interface";
import { Dispatch } from "redux";
import { SpecificationData } from "../specifications/interface";

const colorMap = {
	red: "#EF4444",
	yellow: "#F59E0B",
	green: "#10B981"
};

const mapStateToProps = (state: StateProps) => {
	return {
		specification_data: state.specification_data,
		overview_data: state.overview_data,
		shipraw_data: state.shipraw_data
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		setSpecificationData: (data: SpecificationData) => dispatch(setSpecificationData(data)),
		setOverviewData: (data: OverviewData) => dispatch(setOverviewData(data)),
		changeTab: (newtab: number) => dispatch(changeTab(newtab))
	};
};

class Map extends React.Component<MapProps> {

	position: {
		lon: number,
		lat: number
	};
	map: mapboxgl.Map | null;
	mapContainer: React.RefObject<HTMLDivElement>;

	constructor(props: MapProps) {
		super(props);
		mapboxgl.accessToken = "pk.eyJ1IjoicmVkYXhlIiwiYSI6ImNrOWk3am0zYjB4dGIzZGtmenl3cmw1ZmMifQ.mwTbGVSSSuBpmCvOh6oCxw";
		this.position = props.position;
		this.map = null;
		this.mapContainer = React.createRef();
	}

	componentDidMount() {
		const position = this.position;

		if (position) {
			if (this.map) return;
			this.map = new mapboxgl.Map({
				container: this.mapContainer.current || ".map-container",
				style: "mapbox://styles/mapbox/streets-v11",
				center: [position.lon, position.lat],
				zoom: 3
			});

			const map = this.map;

			map.on("load", function(){
				new mapboxgl.Marker({ color: "#4189DD" })
					.setLngLat([position.lon, position.lat])
					.addTo(map as mapboxgl.Map);
			});
		}
	}

	render() {
		return <div ref={this.mapContainer} className="map-container shadow w-1/2 h-96"/>;
	}
}

const ConnectedOverview: React.FC<ShipProps> = ( { overview_data, changeTab, id, specification_data, setSpecificationData, setLoaded }: ShipProps ) => {
	const data = overview_data;
	const {Anime} = ReactAnime;

	useEffect(() => {
		axios.get("https://api.cruisegator.thecodeblog.net/ship/specifications/"+id).then(res => {
			const data = res && res?.data;
			console.log(data);
			setSpecificationData(data || {});
			getData();
			setLoaded(true);
		}).catch(() => null);
	}, []);

	
	return (
		<div className='px-32 mb-32 mt-16 w-full overflow-hidden flex flex-col overview'>
			<div className="flex justify-between items-center">
				<div className="w-min">
					<h1 className="text-4xl xl:text-5xl font-semibold !leading-[129%] w-min 480:whitespace-nowrap mb-8" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
						Some <span className="text-blue-800">size information</span><br/>about the ship
					</h1>
					<p className="text-xl w-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
					<a onClick={() => changeTab(1)} className="font-semibold text-xl xl:text-2xl cursor-pointer text-blue-800 flex items-center mt-10">See specifications
						<svg className="ml-4 mt-0.5 hidden xl:block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
						<svg className="ml-2 mt-0.5 block xl:hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</a>
				</div>
				<div className="flex flex-col items-center gap-20">
					<div className="flex gap-24">
						<div>
							{specification_data.specification_data["Beam (width)"] ? <Anime initial={[{
								targets: ".height",
								innerHTML: ["0m", parseInt(specification_data.specification_data["Beam (width)"]?.split("/")[0]?.trim())+"m"],
								easing: "linear",
								round: 1 // Will round the animated value to 1 decimal
							}]}>
								<p className="font-semibold height text-7xl text-center"></p>
							</Anime> : <p className="font-semibold text-7xl text-center">N/A</p>}
							<p className="font-semibold text-xl text-blue-800 mt-2 text-center">Height</p>
						</div>
						<div>
							{specification_data.specification_data["Beam (width)"] ? <Anime initial={[{
								targets: ".width",
								innerHTML: ["0m", parseInt(specification_data.specification_data["Length (LOA)"]?.split("/")[0]?.trim())+"m"],
								easing: "linear",
								round: 1 // Will round the animated value to 1 decimal
							}]}>
								<p className="font-semibold width text-7xl text-center"></p>
							</Anime> : <p className="font-semibold text-7xl text-center">N/A</p>}
							<p className="font-semibold text-xl text-blue-800 mt-2 text-center">Width</p>
						</div>
					</div>
					<div>
						{specification_data.specification_data["Beam (width)"] ? <Anime initial={[{
							targets: ".gross-tonnage",
							innerHTML: ["0m", parseInt(specification_data.specification_data["Gross Tonnage"]?.split("/")[0]?.trim()).toLocaleString()+"gt"],
							easing: "linear",
							round: 1 // Will round the animated value to 1 decimal
						}]}>
							<p className="font-semibold gross-tonnage text-7xl text-center"></p>
						</Anime> : <p className="font-semibold text-7xl text-center">N/A</p>}
						<p className="font-semibold text-xl text-blue-800 mt-2 text-center">Gross tonnage</p>
					</div>
				</div>
			</div>
			{data.homeports.length ? <div className="mt-32 w-full flex flex-col items-center">
				<h1 className="text-4xl text-center xl:text-5xl font-semibold !leading-[129%] w-min 480:whitespace-nowrap mb-8" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
					The <span className="text-blue-800">homeports</span> where<br/>the ship stays
				</h1>
				<p className="text-2xl w-full text-center">The port from which a ship hails or from which it is documented.</p>
				<div className="gap-x-44 gap-y-16 flex mt-20 flex-wrap items-center justify-center">
					{data.homeports.map(e => <div className="flex flex-col items-center justify-center" key={e.text[0]}>
						<span className={"!w-32 !h-24 rounded-lg "+e.icon}></span>
						<p className="text-3xl font-medium text-center whitespace-nowrap mt-4">{e.text[1]}</p>
						<p className="text-blue-800 font-medium mt-2">{(e.text[0].match(/\((.+)\)/) || [])[1]}</p>
					</div>)}
				</div>
			</div> : ""}
			<div className="mt-32 flex justify-between items-center pb-4">
				<Map position={data.position}/>
				<div className="w-min">
					<h1 className="text-4xl xl:text-5xl font-semibold !leading-[129%] w-min 480:whitespace-nowrap mb-8" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
						Where is the current<br/><span className="text-blue-800">location</span> of the ship?
					</h1>
					<p className="text-xl w-full leading-[139%]">The current location of this ship is at <span className="text-blue-800 font-medium">{data.location}</span> (coordinates {data.coordinates}) cruising at speed of <span className="text-blue-800 font-medium">{data.speed.knot}</span> ({typeof data.speed.kmph === "object" ? (data.speed.kmph as Array<string>).join(" / ") : ""}) en route to <span className="text-blue-800 font-medium">{data.destination}</span>. The AIS position was reported <span className="font-medium" style={{color: colorMap[data.last_ais_report.status]}}>{data.last_ais_report.text}</span> ago.</p>
					<a href="/map" className="font-semibold text-xl xl:text-2xl text-blue-800 flex items-center mt-10">Explore the map
						<svg className="ml-4 mt-0.5 hidden xl:block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
						<svg className="ml-2 mt-0.5 block xl:hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
};

const Overview = connect(mapStateToProps, mapDispatchToProps)(ConnectedOverview);

export default Overview;
