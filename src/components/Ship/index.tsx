import './style.scss';
import Icon from '@iconify/react';
import { IconifyIcon } from '@iconify/types'
import { RouteComponentProps } from 'react-router-dom'
import { changeTab } from  '../../state_manage/actions'
import { connect } from "react-redux";

import appsList20Regular from '@iconify-icons/fluent/apps-list-20-regular';
import settings28Regular from '@iconify-icons/fluent/settings-28-regular';
import conferenceRoom28Regular from '@iconify-icons/fluent/conference-room-28-regular';
import calendarLtr28Regular from '@iconify-icons/fluent/calendar-ltr-28-regular';
import news28Regular from '@iconify-icons/fluent/news-28-regular';
import warning24Regular from '@iconify-icons/fluent/warning-24-regular';
import layer20Regular from '@iconify-icons/fluent/layer-20-regular';
import 'flag-icon-css/sass/flag-icon.scss';
import Overview from './overview';

interface SidebarProps {
	active_tab: number;
	changeTab: any
}

interface ShipProps {
	id: string
};

interface ShipRouteProps extends RouteComponentProps<ShipProps> {

}

const mapStateToProps = (state: any) => {
	return { active_tab: state.current_tab };
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		changeTab: (newtab: number) => dispatch(changeTab(newtab))
	}
}

const ConnectedSidebar: React.FC<SidebarProps> = ( { active_tab, changeTab } ): JSX.Element => {

	console.log(changeTab)

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
		<div className='d-flex flex-column justify-content-center fs-6 sidebar vh-100'>
			{options.map(
				([icon, text, is_active], index) => 
				<a className={'text-uppercase text-decoration-none text-dark ps-5 d-flex align-items-center '+(is_active ? 'active': '')} data-tabid={index} onClick={(e) => {changeTab(parseInt((e.target as HTMLAnchorElement).dataset.tabid || '0'))}}>
					<Icon icon={icon} width="28" className='me-3'/>
					{text}
				</a>)}
		</div>
	)
}

const Sidebar = connect(null, mapDispatchToProps)(ConnectedSidebar)

const Specifications: React.FC<ShipProps> = (): JSX.Element => {
	return <h1 className='pt-5 ps-4'>Specifications</h1>
}

const ConnectedShip: React.FC<ShipRouteProps|any> = ({active_tab, ...props}): JSX.Element => {
	return (
		<div className='w-100 py-5 vh-100 d-flex'>
			<Sidebar active_tab={active_tab}/>
			{(()=>{
				let tab: JSX.Element
				switch (active_tab) {
					case 0: tab = <Overview id={props.match.params.id}/>; break;
					case 1: tab = <Specifications id={props.match.params.id}/>; break;
					default: tab = <></>
				}
				return tab
			})()}
		</div>
	)
}

const Ship = connect(mapStateToProps)(ConnectedShip);

export default Ship;