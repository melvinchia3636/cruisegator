import { connect } from "react-redux";
import { getData } from "./scrape";
import { CabinProps } from "./interface";
import { StateProps } from "../../../state_manage/interface";
import React, { useState } from "react";
import { ChevronDown } from "react-feather";

const mapStateToProps = (state: StateProps) => {
	return {
		itineraries_data: state.itineraries_data,
		shipraw_data: state.shipraw_data
	};
};

const ConnectedItinerariess: React.FC<CabinProps> = ({ itineraries_data, shipraw_data }: CabinProps): JSX.Element => {

	if (itineraries_data.length == 0 && shipraw_data[1]) getData();
	const data = itineraries_data;
	data.forEach(e => [e.state, e.setState] = useState(0));

	return (
		<div className='p-20 w-full flex flex-col'>
			<div className='mb-10'>
				<h1 className='uppercase mt-10'>Itineraries</h1>
				<div className='w-20 h-1 mt-1 bg-blue-800'></div>
			</div>
			{itineraries_data.map((e, index) => <div key={e.id} className="w-full bg-white my-4 rounded-lg overflow-hidden" style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)" }}>
				<div className="border-r-8 border-blue-800">
					<div className="grid items-center grid-cols-[35%,60%,5%]">
						<img src={e.departurePort.image} className="object-cover h-56"/>
						<div className="p-8">
							<h3 className="text-gray-500 font-medium">{e.length} Night</h3>
							<h2 className="font-medium text-blue-800 text-2xl">{e.title}</h2>
							<div className="flex mt-8">
								<div>
									<h4 className="text-gray-600">Sailing Date</h4>
									<p className="mt-2 text-black font-medium text-xl">{new Date(e.sailings[0]).toLocaleString("en-US", {day: "2-digit", month: "short", year: "numeric"})}</p>
								</div>
								<div className="ml-16">
									<h4 className="text-gray-600">Departure Port</h4>
									<p className="mt-2 text-black font-medium text-xl">{e.departurePort.name}</p>
								</div>
							</div>
						</div>
						<button onClick={() => e.setState(e.state ? 0 : document.querySelector("#im-"+index)?.clientHeight)}><ChevronDown color="#666666"/></button>
					</div>
					<div className={"overflow-hidden transition-all duration-300"} style={{height: e.state}}>
						<div className="grid grid-cols-2 p-12" id={"im-"+index}>
							<div>
								<div>
									<h3 className='font-medium text-3xl'>Itineraries</h3>
									<div className='w-10 h-1 mt-1 bg-blue-800'></div>
								</div>
								<div className="mt-5 itc">
									{e.itinerary.map((i, innerIndex) => <div key={i.day} className="grid items-center gap-x-3 gap-y-4 py-1 grid-cols-[16px,20%,80%]">
										<style dangerouslySetInnerHTML={{__html: `
									#it-${index}:before { height: ${(e.itinerary.length-1)*35}px }
								`}}/>
										<span className={"it relative w-4 h-4 rounded-full "+([1, e.itinerary.length].includes(innerIndex+1) || i.port !== "Cruising" ? "bg-blue-800" : "border-2 border-blue-800 bg-white")} id={"it-" + index}></span>
										<p className="font-medium">DAY {i.day}</p>
										<p className="text-black text-lg">{i.port}</p>
									</div>)}
								</div>
							</div>
							<img className="rounded-lg" src={`https://img.cruisecritic.net/img-cc/map/${e.id}/itinerary_540x405_.png`}/>
						</div>
					</div>
				</div>
			</div>)}
		</div>
	);
};

const Itinerariess = connect(mapStateToProps)(ConnectedItinerariess);

export default Itinerariess;