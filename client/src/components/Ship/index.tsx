import "./style.scss";
import Icon from "@iconify/react";
import { IconifyIcon } from "@iconify/types";
import { RouteComponentProps } from "react-router-dom";
import { changeTab, setShiprawData } from  "../../state_manage/actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

import { ChevronRight } from "react-feather";
import appsList20Regular from "@iconify-icons/fluent/apps-list-20-regular";
import settings28Regular from "@iconify-icons/fluent/settings-28-regular";
import conferenceRoom28Regular from "@iconify-icons/fluent/conference-room-28-regular";
import calendarLtr28Regular from "@iconify-icons/fluent/calendar-ltr-28-regular";
import commentMultiple20Regular from "@iconify-icons/fluent/comment-multiple-20-regular";
import layer20Regular from "@iconify-icons/fluent/layer-20-regular";
import imageMultiple20Regular from "@iconify-icons/fluent/image-multiple-20-regular";
import "flag-icon-css/sass/flag-icon.scss";

import Overview from "./overview";
import Specifications from "./specifications";
import Itinerariess from "./itineraries";
import Cabin from "./cabins";
import Gallery from "./gallery";
import DeckPlans from "./deckplans";

import { StateProps } from "../../state_manage/interface";

interface SidebarProps {
	active_tab: number;
	changeTab: (newtab: number) => {
		type: string;
		payload: number;
	},
	isToggleOn: any,
	setToggleOn: any
}

interface ShipRouteProps extends RouteComponentProps<{id: string}> {
	shipraw_data: Document[];
	active_tab: number;
	setShiprawData: (shipraw_data: Document[]) => {
		type: string;
		payload: Document[];
	}
}

const getItiID = (id: string): {id: number, name: string}|undefined => {
	const ids = require("./id.json");
	const id2 = id.toLowerCase();

	const result = ids.filter((e: {id: number, name: string}) => {
		const id1 = e.name.toLowerCase();
		return id2.includes(id1) || id1.includes(id2);
	});
	if (result.length <= 1) return result[0];

	const result2 = result.map((e: any) => {
		const id3 = id2.split(" ");
		return id3.map(i => e.name.toLowerCase().split(" ").includes(i)).filter((e: boolean) => e).length;
	});
	return result[result2.indexOf(Math.max(...result2))];
};

const mapStateToProps = (state: StateProps) => {
	return {
		active_tab: state.current_tab,
		shipraw_data: state.shipraw_data
	};
};

const SidebarMapDispatchToProps = (dispatch: Dispatch) => {
	return {
		changeTab: (newtab: number) => dispatch(changeTab(newtab))
	};
};

const MainMapDispatchToProps = (dispatch: Dispatch) => {
	return {
		setShiprawData: (shipraw_data: Document[]) => dispatch(setShiprawData(shipraw_data))
	};
};

const ConnectedSidebar: React.FC<SidebarProps> = ( { active_tab, changeTab, isToggleOn, setToggleOn }: SidebarProps ): JSX.Element => {

	const options: [IconifyIcon, string, boolean?][] = [
		[appsList20Regular, "overview"],
		[settings28Regular, "specifications"],
		[calendarLtr28Regular, "itineraries"],
		[layer20Regular, "deck plans"],
		[conferenceRoom28Regular, "cabins"],
		[commentMultiple20Regular, "reviews"],
		[imageMultiple20Regular, "gallery"]
	];

	useEffect(() => {
		window.onresize = () => {
			if (window.innerWidth >= 1280) {
				setToggleOn(true);
				return;
			}
			setToggleOn(false);
		};
	}, []);

	options[active_tab].push(true);
	
	return (
		<div className={`flex flex-col justify-center text-xl ${isToggleOn ? "w-[350px] xl:w-1/4" : "!w-0"} transition-all duration-500 bg-white z-[10] xl:w-1/4 sidebar h-full fixed`}>
			<a className="absolute cursor-pointer xl:hidden bg-white top-50 right-0 transform -translate-y-1/2 translate-x-full py-6 rounded-r-md" style={{boxShadow: "0 0 4px rgba(0, 0, 0, 0.3), -6px 0 4px #FFFFFF"}} onClick={() => setToggleOn(!isToggleOn)}>
				<ChevronRight />
			</a>
			<div className="overflow-hidden">
				{options.map(
					([icon, text, is_active], index) => 
						<button key={text} className={"w-full transition-all duration-300 relative uppercase bg-white border-0 pl-20 flex items-center text-lg font-medium py-6 whitespace-nowrap "+(is_active ? "active": "")} data-tabid={index} onClick={(e) => {changeTab(parseInt((e.target as HTMLAnchorElement).dataset.tabid || "0"));}}>
							<Icon icon={icon} width="28" className='mr-3 min-w-[28px]'/>
							{text}
						</button>
				)}
			</div>
		</div>
	);
};

const ConnectedShip: React.FC<ShipRouteProps> = ({active_tab, setShiprawData, ...props}: ShipRouteProps): JSX.Element => {
	const [isToggleOn, setToggleOn] = useState(true);
	
	const id = props.match.params.id;
	const splitted_id: string[] = id.split("-");
	const splitted_id_nonum: string = splitted_id.slice(0, splitted_id.length-1).join(" ").replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
	const cruiseCriticID = getItiID(splitted_id_nonum);
	const ItiID: number | undefined = cruiseCriticID?.id;
	const cruiseCriticName: string | undefined = cruiseCriticID?.name?.replace(/\(|\)/g, "").replaceAll(" ", "-").toLowerCase();
	const cruiseCriticURI = `${cruiseCriticName}-${ItiID}`;
	useEffect(() => {
		//const text_data = require("./itineraries/test2.json");
		//console.log(text_data.filter((e: string) => !e.includes("icebreaker")).map((e: any) => [e, getItiID(e)]).filter((e: any) => !e).length);
		const url_to_fetch: string[] = [
			"https://www.cruisemapper.com/ships/"+id
		];
		const fetchRawData = async () => {
			const dom_parser: DOMParser = new DOMParser();
			const request_promise: Promise<void | AxiosResponse<string>>[] = url_to_fetch.map(async url => await axios({
				method: "GET",
				url: "https://codeblog-corsanywhere.herokuapp.com/"+url, 
				headers: {
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				}
			}).catch(err => console.log(err)));

			const requests = await Promise.all(request_promise);
			const rdata: string[] = requests.map(r => r ? r.data : "<p>none</p>");
			const htmls: Document[] = rdata.map(d => dom_parser.parseFromString(d, "text/html"));
			setShiprawData(htmls);
		};

		fetchRawData();
	}, []);

	return (
		<div className='w-full py-16 flex pb-0'>
			<Sidebar active_tab={active_tab} isToggleOn={isToggleOn} setToggleOn={setToggleOn}/>
			<div className={"w-full min-h-screen transition-all duration-500 overflow-hidden "+(isToggleOn ? "xl:ml-[25%]" : "ml-0")}>
				{(()=>{
					let tab: JSX.Element;
					switch (active_tab) {
					case 0: tab = <Overview/>; break;
					case 1: tab = <Specifications id={id}/>; break;
					case 2: tab = <Itinerariess id={ItiID}/>; break;
					case 3: tab = <DeckPlans id={splitted_id_nonum}/>; break;
					case 4: tab = <Cabin id={splitted_id_nonum}/>; break;
					case 6: tab = <Gallery id={id} ccid={cruiseCriticURI}/>; break;
					default: tab = <></>;
					}
					return tab;
				})()}
			</div>
		</div>
	);
};

const Sidebar = connect(null, SidebarMapDispatchToProps)(ConnectedSidebar);
const Ship = connect(mapStateToProps, MainMapDispatchToProps)(ConnectedShip);

export default Ship;