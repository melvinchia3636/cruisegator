import './style.scss';
import Icon from '@iconify/react';

import appsList20Regular from '@iconify-icons/fluent/apps-list-20-regular';
import settings28Regular from '@iconify-icons/fluent/settings-28-regular';
import conferenceRoom28Regular from '@iconify-icons/fluent/conference-room-28-regular';
import calendarLtr28Regular from '@iconify-icons/fluent/calendar-ltr-28-regular';
import news28Regular from '@iconify-icons/fluent/news-28-regular';
import warning24Regular from '@iconify-icons/fluent/warning-24-regular';
import layer20Regular from '@iconify-icons/fluent/layer-20-regular';
import briefcaseLine from '@iconify/icons-clarity/briefcase-line';
import anchorIcon from '@iconify/icons-simple-line-icons/anchor';
import flagForFlagUnitedStates from '@iconify/icons-twemoji/flag-for-flag-united-states';
import flagForFlagAustralia from '@iconify/icons-twemoji/flag-for-flag-australia';

export default function Ship(): JSX.Element {
	return (
		<div className='w-100 py-5 vh-100 d-flex'>
			<div className='d-flex flex-column justify-content-center fs-5 sidebar vh-100'>
				<a className='text-uppercase text-decoration-none text-dark ps-5 d-flex align-items-center'><Icon icon={appsList20Regular} width="32" className='me-3'/>overview</a>
				<a className='text-uppercase text-decoration-none text-dark ps-5 d-flex align-items-center'><Icon icon={settings28Regular} width="32" className='me-3'/>specifications</a>
				<a className='text-uppercase text-decoration-none text-dark ps-5 d-flex align-items-center'><Icon icon={calendarLtr28Regular} width="32" className='me-3'/>itineraries</a>
				<a className='text-uppercase text-decoration-none text-dark ps-5 d-flex align-items-center'><Icon icon={layer20Regular} width="36" style={{marginRight: '.6em'}}/>deck plans</a>
				<a className='text-uppercase text-decoration-none text-dark ps-5 d-flex align-items-center'><Icon icon={conferenceRoom28Regular} width="32" className='me-3'/>cabins</a>
				<a className='text-uppercase text-decoration-none text-dark ps-5 d-flex align-items-center'><Icon icon={news28Regular} width="32" className='me-3'/>news</a>
				<a className='text-uppercase text-decoration-none text-dark ps-5 d-flex align-items-center'><Icon icon={warning24Regular} width="32" className='me-3'/>accidents</a>
			</div>
			<div className='p-5 w-100 vh-100'>
				<div className='d-flex justify-content-between align-items-center'>
					<div>
						<h1 className='text-uppercase mt-4'>Quantum Of The Seas</h1>
						<div className='seperator btn-primary'></div>
					</div>
					<div className='d-flex' style={{height: 'min-content'}}>
						<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
						<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
						<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
						<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
						<span className='border border-primary d-block border-2 rounded-pill'></span>
					</div>
				</div>
				<div className='mt-5 d-flex justify-content-between'>
					<div>
						<div>
							<h2 className='fs-5 fw-normal'><Icon icon={briefcaseLine} style={{fontSize: '24px'}} className='me-2'/>Cruise line</h2>
							<h3 className='fs-4 fw-normal'>Royal Caribbean</h3>
						</div>
						<div style={{marginTop: '2em'}}>
							<h2 className='fs-5 fw-normal'><Icon icon={anchorIcon} style={{fontSize: '20px'}} className='me-2'/>Homeport</h2>
							<div className='d-flex align-items-center mb-2'><Icon className='me-2' icon={flagForFlagAustralia} style={{fontSize: '24px'}} /><h3 className='fs-4 fw-normal d-flex align-items-end m-0'>Brisbane <h6 className='ms-1'>(Queensland Australia)</h6></h3></div>
							<div className='d-flex align-items-center mb-2'><Icon className='me-2' icon={flagForFlagUnitedStates} style={{fontSize: '24px'}} /><h3 className='fs-4 fw-normal d-flex align-items-end m-0'>Seattle <h6 className='ms-1'>(Washington)</h6></h3></div>
						</div>
					</div>
					<div className='h-100 position-relative img'>
						<div className='bd bg-primary'></div>
						<div className='p-1 bg-white i position-relative'><img src='https://www.cruisemapper.com/images/ships/802-large-ed78f090346334771301e8030d75211f.jpg' className='' height="260"></img></div>
						<div className='bd bg-primary position-relative'></div>
					</div>
				</div>
			</div>
		</div>
	)
}