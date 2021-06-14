import React from "react";
import { CabinsProps } from "./interface";
import { StateProps } from "state_manage/interface";
import { getData } from "./scrape";
import { connect } from "react-redux";

const mapStateToProps = (state: StateProps) => {
	return {
		cabins_data: state.cabins_data,
		shipraw_data: state.shipraw_data
	};
};

const ConnectedItinerariess: React.FC<CabinsProps> = ({ id, cabins_data, shipraw_data }: CabinsProps): JSX.Element => {

	if (JSON.stringify(cabins_data) === "{}" && shipraw_data[2]) getData();

	return (
		<div className='p-20 w-full flex flex-col'>
			<div className='mb-10'>
				<h1 className='uppercase mt-10'>Staterooms and Suites</h1>
				<div className='w-20 h-1 mt-1 bg-blue-800'></div>
			</div>
			<pre>
				<code>
					{JSON.stringify(cabins_data, null, 4)}
				</code>
			</pre>
		</div>
	);
};

const Itinerariess = connect(mapStateToProps)(ConnectedItinerariess);

export default Itinerariess;