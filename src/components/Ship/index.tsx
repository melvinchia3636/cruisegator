import './style.scss';
import Icon from '@iconify/react';
import { IconifyIcon } from '@iconify/types'
import { RouteComponentProps } from 'react-router-dom'
import { changeTab, setShiprawData } from  '../../state_manage/actions'
import { connect } from "react-redux";
import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';

import appsList20Regular from '@iconify-icons/fluent/apps-list-20-regular';
import settings28Regular from '@iconify-icons/fluent/settings-28-regular';
import conferenceRoom28Regular from '@iconify-icons/fluent/conference-room-28-regular';
import calendarLtr28Regular from '@iconify-icons/fluent/calendar-ltr-28-regular';
import news28Regular from '@iconify-icons/fluent/news-28-regular';
import warning24Regular from '@iconify-icons/fluent/warning-24-regular';
import layer20Regular from '@iconify-icons/fluent/layer-20-regular';
import 'flag-icon-css/sass/flag-icon.scss';

import Overview from './overview';
import Specifications from './specifications';

interface SidebarProps {
	active_tab: number;
	changeTab: any
}

interface ShipRouteProps extends RouteComponentProps {
	id: string;
	shipraw_data: Document[];
	setShiprawData: any
}

const mapStateToProps = (state: any) => {
	return {
		active_tab: state.current_tab,
		shipraw_data: state.shipraw_data
	};
};

const SidebarMapDispatchToProps = (dispatch: any) => {
	return {
		changeTab: (newtab: number) => dispatch(changeTab(newtab))
	}
}

const MainMapDispatchToProps = (dispatch: any) => {
	return {
		setShiprawData: (shipraw_data: Document[]) => dispatch(setShiprawData(shipraw_data))
	}
}

const ConnectedSidebar: React.FC<SidebarProps> = ( { active_tab, changeTab } ): JSX.Element => {

	const options: [IconifyIcon, string, boolean?][] = [
		[appsList20Regular, 'overview'],
		[settings28Regular, 'specifications'],
		[calendarLtr28Regular, 'itineraries'],
		[layer20Regular, 'deck plans'],
		[conferenceRoom28Regular, 'cabins'],
		[news28Regular, 'news'],
		[warning24Regular, 'accidents'],
	]
	options[active_tab].push(true)
	
	return (
		<div className='d-flex flex-column justify-content-center fs-6 sidebar vh-100 position-fixed'>
			{options.map(
				([icon, text, is_active], index) => 
				<button className={'text-uppercase bg-white border-0 text-dark ps-5 d-flex align-items-center '+(is_active ? 'active': '')} data-tabid={index} onClick={(e) => {changeTab(parseInt((e.target as HTMLAnchorElement).dataset.tabid || '0'))}}>
					<Icon icon={icon} width="28" className='me-3'/>
					{text}
				</button>)}
		</div>
	)
}

const Sidebar = connect(null, SidebarMapDispatchToProps)(ConnectedSidebar)

const ConnectedShip: React.FC<ShipRouteProps|any> = ({active_tab, shipraw_data, setShiprawData, ...props}): JSX.Element => {
	const id: string = props.match.params.id
	const url_to_fetch: string[] = ['https://www.cruisemapper.com/ships/'+id]
	useEffect(() => {
		const fetchRawData = async () => {
			const dom_parser: DOMParser = new DOMParser();
			const request_promise: Promise<AxiosResponse<any>>[] = url_to_fetch.map(async url => await axios({
				method: 'GET',
				url: 'https://codeblog-corsanywhere.herokuapp.com/'+url, 
				headers: {
					'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
				}
			}))

			const requests = await Promise.all(request_promise)
			const rdata: string[] = requests.map(r => r.data);
			const htmls: Document[] = rdata.map(d => dom_parser.parseFromString(d, 'text/html'));
			setShiprawData(htmls)
		};

		fetchRawData()
	}, [])

	return (
		<div className='w-100 py-5 d-flex pb-0'>
			<Sidebar active_tab={active_tab}/>
			{(()=>{
				let tab: JSX.Element
				switch (active_tab) {
					case 0: tab = <Overview id={id}/>; break;
					case 1: tab = <Specifications id={id}/>; break;
					default: tab = <></>
				}
				return tab
			})()}
		</div>
	)
}

const Ship = connect(mapStateToProps, MainMapDispatchToProps)(ConnectedShip);

export default Ship;