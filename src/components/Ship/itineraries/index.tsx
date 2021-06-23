import { connect } from "react-redux";
import { getData } from "./scrape";
import { CabinProps } from "./interface";
import { StateProps } from "../../../state_manage/interface";
import React from "react";
import { ChevronDown } from "react-feather";

const mapStateToProps = (state: StateProps) => {
	return {
		itineraries_data: state.itineraries_data,
		shipraw_data: state.shipraw_data
	};
};

const ConnectedItinerariess: React.FC<CabinProps> = ({ itineraries_data, shipraw_data }: CabinProps): JSX.Element => {

	if (itineraries_data.length == 0 && shipraw_data[1]) getData();

	return (
		<div className='p-20 w-full flex flex-col'>
			<div className='mb-10'>
				<h1 className='uppercase mt-10'>Itineraries</h1>
				<div className='w-20 h-1 mt-1 bg-blue-800'></div>
			</div>
			{itineraries_data.map(e => <div key={e.id} className="w-full h-56 bg-white my-4 rounded-lg overflow-hidden" style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)" }}>
				<div className="border-r-8 border-blue-800 grid items-center" style={{ gridTemplateColumns: "35% 60% 5%" }}>
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
					<ChevronDown color="#666666"/>
				</div>
			</div>)}
		</div>
	);
};

const Itinerariess = connect(mapStateToProps)(ConnectedItinerariess);

export default Itinerariess;