import './style.scss'

import { Icon, InlineIcon } from '@iconify/react';
import baselineSearch from '@iconify-icons/ic/baseline-search';
import calendarMonthOutline from '@iconify-icons/mdi/calendar-month-outline';
import mapMarkerOutline from '@iconify-icons/mdi/map-marker-outline';
import timerSand from '@iconify-icons/mdi/timer-sand';
import accountGroupOutline from '@iconify-icons/mdi/account-group-outline';

export default function Database(): JSX.Element {
	return (
		<div className='w-100 p-5'>
			<div className='w-100 d-flex align-items-center justify-content-center flex-column'>
				<h1 className='fw-lighter text-center text-nowrap' style={{marginTop: '2em'}}>Cruiseship Database</h1>
				<div className='seperator mt-2 btn-primary mb-5'></div>
				<div className='w-50 d-flex rounded-pill align-items-center px-3' style={{boxShadow: '0 0 2px rgba(0, 0, 0, 0.7)'}}>
					<Icon icon={baselineSearch} width="24" color="#808080"/>
					<input type='text' placeholder='Search for cruiseships in database' className='form-control w-100 p-2 border-0 rounded-pill'></input>
				</div>
			</div>
			<div className='w-100 d-grid mt-5'>
				{Array(2).fill(0).map(()=>
				<div className='w-100' style={{boxShadow: '0 0 2px rgba(0, 0, 0, 0.7)'}}>
					<img src='https://www.cruisemapper.com/images/ships/802-large-ed78f090346334771301e8030d75211f.jpg' className='w-100 h-100'/>
					<div className='d-flex flex-column mx-3 justify-content-center'>
						<div className='w-100 d-flex justify-content-between align-items-center'>
							<h3 className='text-primary fw-bold mb-0'>Quantum of the Seas</h3>
							<div className='d-flex' style={{height: 'min-content'}}>
								<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
								<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
								<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
								<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
								<span className='border border-primary d-block border-2 rounded-pill'></span>
							</div>
						</div>
						<p className='st fw-normal mb-0'>Royal Caribbean</p>
						<div className='mt-3'>
							<p className='m-0 mb-2 d-flex align-items-center'><Icon width="18" className="me-2" color="rgba(0, 85, 185, 1)" icon={calendarMonthOutline}/>6 days, round-trip Sydney Escape Cruise</p>
							<p className='m-0 my-2 d-flex align-items-center'><Icon width="18" className="me-2" color="rgba(0, 85, 185, 1)" icon={mapMarkerOutline}/>1.26635 N / 103.85940 E</p>
							<p className='m-0 my-2 d-flex align-items-center'><Icon width="18" className="me-2" color="rgba(0, 85, 185, 1)" icon={timerSand}/>2014 / Age: 7</p>
							<p className='m-0 mt-2 d-flex align-items-center'><Icon width="18" className="me-2" color="rgba(0, 85, 185, 1)" icon={accountGroupOutline}/>4162 - 4819</p>
						</div>
					</div>
				</div>)}
			</div>
		</div>
	)
}