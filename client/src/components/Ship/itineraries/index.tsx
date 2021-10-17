import { connect } from "react-redux";
import { ItinerariesProps } from "./interface";
import { StateProps } from "../../../state_manage/interface";
import React, { useState } from "react";
import { ChevronDown } from "react-feather";
import store from "state_manage/store";
import { setItinerariesData } from "state_manage/actions";
import axios from "axios";

const mapStateToProps = (state: StateProps) => {
	return {
		itineraries_data: state.itineraries_data,
		shipraw_data: state.shipraw_data
	};
};

const ConnectedItinerariess: React.FC<ItinerariesProps> = ({ itineraries_data, id }: ItinerariesProps): JSX.Element => {
	const getData  = (itiID: number | undefined): void => {
		axios.get("https://api.cruisegator.thecodeblog.net/ship/itineraries/"+itiID).then(res => {
			const data = res && res?.data;
			store.dispatch(setItinerariesData(data.length > 0 ? data : "no data"));
		}).catch(() => null);
		
	};

	const toTitleCase = (str: string) => {
		"use strict";
		const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
		const alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/;
		const wordSeparators = /([ :–—-])/;
  
		return str.split(wordSeparators)
			.map(function (current, index, array) {
				if (
					current.search(smallWords) > -1 &&
					index !== 0 &&
					index !== array.length - 1 &&
					array[index - 3] !== ":" &&
					array[index + 1] !== ":" &&
				(array[index + 1] !== "-" ||
			(array[index - 1] === "-" && array[index + 1] === "-"))
				) {
					return current.toLowerCase();
				}
  
				/* Ignore intentional capitalization */
				if (current.substr(1).search(/[A-Z]|\../) > -1) {
					return current;
				}
  
				/* Ignore URLs */
				if (array[index + 1] === ":" && array[index + 2] !== "") {
					current;
				}
  
				/* Capitalize the first letter */
				return current.replace(alphanumericPattern, function (match) {
					return match.toUpperCase();
				});}).join("");
	};

	if (itineraries_data.length == 0) getData(id);
	const data = itineraries_data === "no data" ? [] : itineraries_data;
	data.forEach(e => [e.state, e.setState] = useState(0));

	return (
		<div className='p-10 mb-16 sm:px-32 overflow-hidden flex flex-col'>
			<div className="px-8 py-2 flex items-center">
				<p className="font-medium w-8/12 text-gray-500 text-md">Name</p>
				<p className="w-3/12 text-gray-500 font-medium text-md">Sailing Date</p>
				<p className="w-5/12 text-gray-500 font-medium text-md">Departure Port</p>
				<p className="w-3/12 text-gray-500 font-medium text-md">Length</p>
				<button className={"w-11"}></button>
			</div>
			{data.map((e, index) => <div key={e.id} className="w-full bg-white my-1 rounded-lg overflow-hidden" style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
				<div className="px-8 py-6 flex items-center">
					<h2 className="font-medium w-8/12 text-blue-800 text-xl">{toTitleCase(e.title.toLowerCase())}</h2>
					<p className="w-3/12 text-gray-700 font-medium text-lg">{new Date(e.sailings[0]).toLocaleString("en-US", {day: "2-digit", month: "short", year: "numeric"})}</p>
					<p className="w-5/12 text-gray-700 font-medium text-lg">{e.departurePort.name}</p>
					<p className="w-3/12 text-gray-700 font-medium text-lg">{e.length} Night</p>
					<button className={"flex justify-center mb-5 md:mb-0 transform transition-all duration-500 " + (e.state ?  "rotate-180" : "")} onClick={() => e.setState(e.state ? 0 : document.querySelector("#im-"+index)?.clientHeight)}><ChevronDown color="#666666"/></button>
				</div>
				<div className={"overflow-hidden transition-all duration-300"} style={{height: e.state}}>
					<div className="p-8 md:p-12" id={"im-"+index}>
						<img className="rounded-lg mt-6 md:hidden" src={`https://img.cruisecritic.net/img-cc/map/${e.id}/itinerary_540x405_.png`}/>
						<div className="flex justify-between">
							<div className="mt-5 itc">
								{e.itinerary.map((i, innerIndex) => <div key={i.day} className="grid items-center gap-x-3 gap-y-4 py-1 grid-cols-[16px,20%,80%]">
									<style dangerouslySetInnerHTML={{__html: `
									#it-${index}:before { height: ${(e.itinerary.length-1)*36}px }
								`}}/>
									<span className={"it relative w-4 h-4 rounded-full "+([1, e.itinerary.length].includes(innerIndex+1) || i.port !== "Cruising" ? "bg-blue-800" : "border-2 border-blue-800 bg-white")} id={"it-" + index}></span>
									<p className="font-medium whitespace-nowrap">DAY {i.day}</p>
									<p className="text-gray-700 text-lg whitespace-nowrap">{i.port}</p>
								</div>)}
							</div>
							<img className="rounded-lg hidden md:!block" src={`https://img.cruisecritic.net/img-cc/map/${e.id}/itinerary_540x405_.png`}/>
						</div>
					</div>
				</div>
			</div>)}
		</div>
	);
};

const Itinerariess = connect(mapStateToProps)(ConnectedItinerariess);

export default Itinerariess;