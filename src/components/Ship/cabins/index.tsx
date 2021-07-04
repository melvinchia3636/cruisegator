import React, { useState } from "react";
import { CabinsProps, CabinsData } from "./interface";
import { StateProps } from "state_manage/interface";
import { getData } from "./scrape";
import { connect } from "react-redux";
import { ChevronDown } from "react-feather";
import LazyLoad from "react-lazyload";
import Location28Regular from "@iconify-icons/fluent/location-28-regular";
import Resize20Regular from "@iconify-icons/fluent/resize-20-regular";
import BookStar24Regular from "@iconify-icons/fluent/book-star-24-regular";
import Icon from "@iconify/react";
import { ThumbsUp } from "react-feather";

const mapStateToProps = (state: StateProps) => {
	return {
		cabins_data: state.cabins_data,
		shipraw_data: state.shipraw_data
	};
};

const ListItem: React.FC<{str: string}> = ({ str }: { str: string }): JSX.Element => {
	return <div className="bg-gray-100 text-gray-600 m-1 rounded-md overflow-hidden">
		<div className="px-3 py-2 lb" style={{ borderLeft: "4.5px solid rgba(0, 85, 185, 1)" }}>{str}</div>
	</div>;
};

const CabinDiagram: React.FC<{ diagram: CabinsData["diagram"] }> = ({ diagram }: { diagram: CabinsData["diagram"]}): JSX.Element => {
	return <LazyLoad 
		height={100}
		debounce={10}
		placeholder={<img src="https://via.placeholder.com/250x150/FFFFFF/666666?text=%20"/>}
		style={{width: "250px"}}
	>
		<img src={diagram.thumb} onError={(e)=>{
			(e.target as HTMLImageElement).onerror = null; 
			(e.target as HTMLImageElement).src="https://via.placeholder.com/250x150/FFFFFF/666666?text=N/A";
		}}/>
	</LazyLoad>;
};

const CabinCategories: React.FC<{ categories: CabinsData["categories"] }> = ({ categories }: { categories: CabinsData["categories"]}): JSX.Element => {
	return <div className="flex pt-3 pb-9 flex-wrap">
		{categories.map(e => <span key={e.name} style={{background: e.background.replace("..", "https://www.cruisedeckplans.com/DP") }} className="ctg px-5 mr-2 mb-2 text-white rounded-full whitespace-nowrap py-1 shadow-inner text-sm">
			{e.name}
		</span>)}
	</div>;
};

const CabinImages: React.FC<{ image: CabinsData["image"] }> = ({ image }: { image: CabinsData["image"]}) => {
	return <div className="pl-20">
		{image.map(e => 
			<LazyLoad 
				debounce={10}
				placeholder={<img src="https://via.placeholder.com/169x128/FFFFFF/666666?text=%20"/>}
				style={{width: "169px"}}
				key={e}
			>
				<img src={e} className="w-full py-2"/>
			</LazyLoad>)}
		<img src="https://via.placeholder.com/169x128" key="placeholder" className="py-2"/>
	</div>;
};

const MetaTable: React.FC<{e: CabinsData}> = ({e}: {e: CabinsData}): JSX.Element => {
	return <div className="text-left grid grid-cols-2 whitespace-nowrap">
		<div className='pr-64 text-gray-600 font-medium border-b-2 py-2 pl-2'>Sleep up to</div>
		<div className="border-b-2 py-2 text-right pr-2">{e.capacity}</div>
		<div className="text-gray-600 font-medium border-b-2 py-2 pl-2">Amount</div>
		<div className="border-b-2 py-2 text-right pr-2">{e.amount}</div>
		<div className="text-gray-600 font-medium border-b-2 py-2 pl-2">Cabin</div>
		<div className="border-b-2 py-2 text-right pr-2">{e.room_sqft} sqft ({e.room_m2} m<sup>2</sup>)</div>
		<div className="text-gray-600 font-medium py-2 pl-2">Balcony</div>
		<div className="py-2 text-right pr-2">{e.balcony_sqft} sqft ({e.balcony_m2} m<sup>2</sup>)</div>
	</div>;
};

const OtherData: React.FC<{ others: CabinsData["others"] }> = ({ others }: { others: CabinsData["others"] }) => {
	return <>{others.map(({ type, content }) => {
		content = content.replace(/^:/, "");
		let result: JSX.Element;
		switch (type) {
		case "B": result = <p className="text-gray-800 text-lg font-medium my-4">{content}</p>; break;
		case "I": result = <p className="text-gray-800 text-lg font-medium my-4 italic">{content}</p>; break;
		case "U": result = <h3 className='uppercase text-xl font-medium mt-4 pl-2'  style={{ borderLeft: "4px solid rgba(0, 85, 185, 1)" }}>{content}</h3>; break;
		case "NOTE": result = 
				<div className="rounded-md overflow-hidden my-4">
					<div className="p-6 lb bg-blue-100 text-blue-800" style={{ borderLeft: "4.5px solid rgba(0, 85, 185, 1)" }}>
						<div className="font-bold mb-3 text-xl">NOTE</div>
						{content.slice(5, content.length).replace(/\/$/, "")}
					</div>
				</div>; break;
		default: result = <p className="text-gray-600 text-lg my-4">{content}</p>;
		}
		return result;
	})}</>;
};

const Location: React.FC<{ location: CabinsData["location"] }> = ({ location }: { location: CabinsData["location"] }) => {
	return <>
		<div className="text-blue-800 flex items-center" style={{ fontSize: "1.8rem" }}><Icon icon={ Location28Regular } className="mr-2" width={32} style={{ stroke: "rgba(0, 85, 185, 1)", strokeWidth: "0.5px" }}/><h3>Stateroom Location</h3></div>
		<div className="grid gap-y-8 gap-x-16 mt-8" style={{ gridTemplateColumns: "repeat(2, min-content)" }}>
			{location.map(({ deck, categories }) => <>
				<h4 className="whitespace-nowrap text-lg text-gray-600">{deck}</h4>
				<div>{categories.map(e => <span key={e.name} style={{background: e.background?.replace("..", "https://www.cruisedeckplans.com/DP") }} className="ctg px-5 mr-2 mb-2 text-white rounded-full whitespace-nowrap py-1 shadow-inner text-sm">{e.name}</span>)}</div>
			</>)}
		</div>
	</>;
};

const Features: React.FC<{ features: CabinsData["features"] }> = ({ features }: { features: CabinsData["features"]}) => {
	return <>
		<div className="text-blue-800 flex items-center mt-20" style={{ fontSize: "1.8rem" }}><ThumbsUp size={28} className="mr-2"/><h3>Features</h3></div>
		<div className="mt-6 text-lg flex flex-wrap">
			{features.sort((a,b) => a.length - b.length).map((e, i) => {
				if (e.split(":")[0].includes("NOTE")) return (
					<div className="rounded-md overflow-hidden my-4 w-full">
						<div className="p-6 lb bg-blue-100 text-blue-800" style={{ borderLeft: "4.5px solid rgba(0, 85, 185, 1)" }}>
							<div className="font-bold mb-3 text-xl">NOTE</div>
							{e.split(":")[1].trim().replace(/^(.)/, e => e.toUpperCase())+"."}
						</div>
					</div>
				);
				return <ListItem str={e} key={i}/>;
			})}
		</div>
	</>;
};

const SizeInfo: React.FC<{ size_info: CabinsData["important_size_info"] }> = ({ size_info }: { size_info: CabinsData["important_size_info"] }) => {
	return <>
		<div className="text-blue-800 flex items-center mt-20" style={{ fontSize: "1.8rem" }}><Icon icon={ Resize20Regular } className="mr-2" width={32} style={{ stroke: "rgba(0, 85, 185, 1)", strokeWidth: "0.5px" }}/><h3>Size Information</h3></div>
		<p className="mt-6 text-lg text-gray-600">{size_info || "N/A"}</p>
	</>;
};

const Perks: React.FC<{ perks: CabinsData["perks"] }> = ({ perks: perks }: { perks: CabinsData["perks"] }) => {
	return <>
		<div className="text-blue-800 flex items-center mt-20" style={{ fontSize: "1.8rem" }}><Icon icon={ BookStar24Regular } className="mr-2" width={32} style={{ stroke: "rgba(0, 85, 185, 1)", strokeWidth: "0.2px" }}/><h3>Perks</h3></div>
		<div className="mt-6 text-lg flex flex-wrap">
			{perks.length > 0 ? perks.sort((a,b) => a.length - b.length).map((e, i) => <ListItem str={e} key={i}/>) : <p>N/A</p>}
		</div>
	</>;
};

const MoreDetails: React.FC<{ e: CabinsData, i: number }> = ({ e, i }: { e: CabinsData, i: number }): JSX.Element => {
	return <div className={"overflow-hidden transition-all duration-300 mb-10"} style={{height: e.state}}>
		<div className={"w-100 p-8 pb-4 mt-3 mb-12 flex flex-col justify-center"} id={"c-"+i}>
			<Location location={e.location}/>
			<Features features={e.features}/>
			<SizeInfo size_info={ e.important_size_info }/>
			<Perks perks={ e.perks }/>
			<OtherData others={e.others}/>
		</div> 
	</div>;
};

const CabinCard: React.FC<{e: CabinsData, i: number}> = ({e, i}: {e: CabinsData, i: number}): JSX.Element => {
	return <div key={i} className="w-100 p-8 pb-4 my-3 flex flex-col justify-center" style={{boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)"}}>
		<div className="flex items-center">
			<CabinDiagram diagram={e.diagram}/>
			<div className="flex h-100 ml-12">
				<div className="flex items-start h-100 flex-col justify-start ml-12 pt-5">
					<h2 className="font-medium text-3xl text-blue-800">{e.name}</h2>
					<CabinCategories categories={ e.categories }/> 
					<MetaTable e={e}/>
				</div>
				<CabinImages image={ e.image }/>
			</div>
		</div>
		<MoreDetails e={e} i={i}/>
		<button className="flex flex-col items-center text-medium text-center text-gray-600" onClick={() => e.setState(e.state ? 0 : document.querySelector("#c-"+i)?.clientHeight)}>
			{(e.state ? "Hide" : "More") + " Details"}
			<ChevronDown width={18} style={{marginTop: -5}} className={"transition-all transform " + (e.state ? "rotate-180" : "")}/>
		</button>
	</div>;
};

const ConnectedCabins: React.FC<CabinsProps> = ({ cabins_data, shipraw_data }: CabinsProps): JSX.Element => {

	if (cabins_data.length === 0 && shipraw_data[2] && shipraw_data[2].querySelector("p")?.textContent !== "none") {
		getData();
	}
	const data = cabins_data;
	data.forEach(e => [e.state, e.setState] = useState(0));

	return (
		<div className='p-20 w-full flex flex-col'>
			<div className='mb-10'>
				<h1 className='uppercase'>Staterooms and Suites</h1>
				<div className='w-20 h-1 mt-1 bg-blue-800'></div>
			</div>
			{data ? data.map((e, i) => <CabinCard e={e} i={i} key={i}/>) : ""}
		</div>
	);
};

const Cabins = connect(mapStateToProps)(ConnectedCabins);

export default Cabins;