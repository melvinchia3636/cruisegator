import React from "react";
import { CabinsProps } from "./interface";
import { StateProps } from "state_manage/interface";
import { getData } from "./scrape";
import { connect } from "react-redux";
import { ChevronDown } from "react-feather";
import LazyLoad from "react-lazyload";

const mapStateToProps = (state: StateProps) => {
	return {
		cabins_data: state.cabins_data,
		shipraw_data: state.shipraw_data
	};
};

const ConnectedItinerariess: React.FC<CabinsProps> = ({ id, cabins_data, shipraw_data }: CabinsProps): JSX.Element => {

	if (cabins_data.length === 0 && shipraw_data[2]) getData();
	console.log(cabins_data);

	return (
		<div className='p-20 w-full flex flex-col'>
			<div className='mb-10'>
				<h1 className='uppercase mt-10'>Staterooms and Suites</h1>
				<div className='w-20 h-1 mt-1 bg-blue-800'></div>
			</div>
			{cabins_data.map(e => <div key={e.name} className="w-100 p-8 pb-4 my-3" style={{boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)"}}>
				<div className="flex items-center">
					<LazyLoad 
						height={100}
						debounce={10}
						placeholder={<img src="https://via.placeholder.com/250x150/FFFFFF/666666?text=%20"/>}
						style={{width: "250px"}}
					><img src={e.diagram.thumb} onError={(e)=>{
							(e.target as HTMLImageElement).onerror = null; 
							(e.target as HTMLImageElement).src="https://via.placeholder.com/250x150/FFFFFF/666666?text=N/A";
						}}/></LazyLoad>
					<div className="flex h-100 ml-12">
						<div className="flex items-start h-100 flex-col justify-start ml-12 pt-5">
							<h2 className="font-medium text-3xl text-blue-800">{e.name}</h2>
							<div className="flex pt-3 pb-9 flex-wrap">{e.categories.map(e => <span key={e.name} style={{background: e.background.replace("..", "https://www.cruisedeckplans.com/DP") }} className="ctg px-5 mr-2 mb-2 text-white rounded-full whitespace-nowrap py-1 shadow-inner text-sm">{e.name}</span>)}</div>
							<div className="text-left grid grid-cols-2 whitespace-nowrap">
								<div className='pr-64 text-gray-600 font-medium border-b-2 py-2 pl-2'>Sleep up to</div>
								<div className="border-b-2 py-2 text-right pr-2">{e.capacity}</div>
								<div className="text-gray-600 font-medium border-b-2 py-2 pl-2">Amount</div>
								<div className="border-b-2 py-2 text-right pr-2">{e.amount}</div>
								<div className="text-gray-600 font-medium border-b-2 py-2 pl-2">Cabin</div>
								<div className="border-b-2 py-2 text-right pr-2">{e.room_sqft} sqft ({e.room_m2} m<sup>2</sup>)</div>
								<div className="text-gray-600 font-medium py-2 pl-2">Balcony</div>
								<div className="py-2 text-right pr-2">{e.balcony_sqft} sqft ({e.balcony_m2} m<sup>2</sup>)</div>
							</div>
						</div>
						<div className="pl-20">
							{e.image.map(e => 
								<LazyLoad 
									debounce={10}
									placeholder={<img src="https://via.placeholder.com/169x128/FFFFFF/666666?text=%20"/>}
									style={{width: "169px"}}
									key={e}
								>
									<img src={e} className="w-full py-2"/>
								</LazyLoad>)}
							<img src="https://via.placeholder.com/169x128" key="placeholder" className="py-2"/>
						</div>
					</div>
				</div>
				<p className="flex flex-col items-center text-medium text-center">More Details<ChevronDown/></p>
			</div>)}
		</div>
	);
};

const Itinerariess = connect(mapStateToProps)(ConnectedItinerariess);

export default Itinerariess;