import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Compass, Database, Airplay } from 'react-feather';
import { TopLogo, Pic1, Pic2, Pic3 } from './assets';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

//TODO: logitravel.co.uk

const Top = (): JSX.Element => {
	var subtitle:string;
	subtitle = 'Find the deck plans, data, schedules, and all the goodies about your desired cruiseship here at Cruisegator.';
	return (
		<Container fluid className='d-flex vh-100 flex-xl-row flex-sm-column justify-content-between p-0 align-items-end'>
			<div className='h-100 d-flex justify-content-center align-items-left flex-column px-2 px-sm-5 mx-5'>
				<h1 className='header m-0 text-primary fw-lighter lh-sm'>Enjoy your life<br />on cruiseship</h1>
				<p className='fs-5 fw-lighter lh-sm my-4'>{subtitle}</p>
				<Button className="text-nowrap rounded-pill fs-5 mt-3 px-5 py-2" href="#">Explore Database</Button>
			</div>
			<img src={TopLogo} className='top-logo mt-xxl-0 mt-sm-5 d-sm-none d-xl-block' />
		</Container>
	);
}

const Middle = (): JSX.Element => {
	var content;
	content = [
		[
			Compass,
			'Realtime Data',
			'Get the latest location and schedules of cruiseships all over around the world, with all the data getting refreshed constantly.'
		],
		[
			Database,
			'Open Source',
			'Get free access to all data forever without needing any payment. Source code of this website is available on github.'
		],
		[
			Airplay,
			'Clean UI',
			"Enjoy your time exploring on Cruisegator with it's clean, easy-to-use and nice looking webpage user-interface."
		]
	];

	return (
		<Container fluid className='bg-light d-flex flex-column justify-content-center align-items-center p-5 mt-sm-0'>
			<h1 className='fw-lighter text-center text-nowrap'>Why Choose Cruisegator?</h1>
			<div className='seperator mt-3 btn-primary'></div>
			<div className='d-grid justify-content-center align-items-baseline mx-sm-5 mt-5 w-grid px-sm-5 pt-5'>
				{content.map(([Icon, title, desc]) => (
					<div className='mx-4'>
						<Icon size='4em' stroke-width='1' className='text-primary' />
						<h2 className='fw-light mt-4'>{title}</h2>
						<p className='fs-5 fw-lighter lh-sm pt-2'>{desc}</p>
					</div>
				))}
			</div>
		</Container>
	);
}

const Bottom = (): JSX.Element => {
	var content: [string, Date, string, string][];
	var date_option: object;
	content = [
		[
			Pic1,
			new Date(2021, 5, 26),
			'Which Cruise Lines Have Restarted Cruising?',
			'While the global COVID-19 pandemic has shut down most cruise lines since mid-March 2020, there are areas of the world where ships are restarting.'
		],
		[
			Pic2,
			new Date(2021, 5, 25),
			'More River Lines Announce European Restart Dates As American Travel Looks Possible For Summer',
			'Five more river cruise lines have announced summer 2021 restart dates, as the European Union moves toward approving international travel for vaccinated Americans.'
		],
		[
			Pic3,
			new Date(2021, 5, 24),
			'Carnival Cruise Line Outlines its Health and Safety Protocols For Alaska Sailings',
			"Carnival Cruise Line has outlined its COVID-19 health and safety protocols for its return to the seas, with new measures designed specifically for passengers on the line's upcoming Alaska sailings."
		]
	];
	date_option = {
		dateStyle: 'full'
	}
	return (
		<div className='fluid-container d-flex flex-column justify-content-center align-items-center bg-fade mb-0 py-5'>
			<h1 className='fw-lighter text-nowrap'>Latest News</h1>
			<div className='seperator mt-3 btn-primary'></div>
			<div className='d-grid news justify-content-center mx-sm-5 mt-5 w-grid px-5 pt-5'>
				{content.map(([picture, date, title, desc]) => (
					<div className='mx-2 overflow-hidden rounded-3 bg-white shadow-sm'>
						<img src={picture} className='w-100'/>
						<div className='p-4'>
							<p className='m-0 fw-normal mb-2'>{date.toLocaleString('en-GB', date_option)}</p>
							<h3>{title}</h3>
							<p className='mt-2'>{desc}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default function Homepage(): JSX.Element { 
	return (
		<React.Fragment>
			<Top/>
			<Middle/>
			<Bottom/>
		</React.Fragment>
	)
};
