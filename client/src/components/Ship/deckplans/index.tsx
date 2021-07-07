/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { StateProps } from "state_manage/interface";
import { getData } from "./scrape";
import { connect } from "react-redux";

const mapStateToProps = (state: StateProps) => {
	return {
		deck_plans_data: state.deck_plans_data,
		shipraw_data: state.shipraw_data
	};
};

const ConnectedDeckPlans: React.FC<any> = ({ deck_plans_data, id }: any): JSX.Element => {
	
	if (JSON.stringify(deck_plans_data) === "{}") {
		getData(id.split(" ").join("-"));
	}

	return (
		<div className='p-20 w-full flex flex-col'>
			<div className='mb-10'>
				<h1 className='uppercase'>Deck Plans</h1>
				<div className='w-20 h-1 mt-1 bg-blue-800'></div>
			</div>
			<div>
				<pre><code>{JSON.stringify(deck_plans_data, null, 4)}</code></pre>
			</div>
		</div>
	);
};

const DeckPlans = connect(mapStateToProps)(ConnectedDeckPlans);

export default DeckPlans;