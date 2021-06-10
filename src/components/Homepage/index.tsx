import React from 'react';
import { Compass, Database, Airplay } from 'react-feather';
import { TopLogo, Pic1, Pic2, Pic3 } from './assets';
import './style.scss';

//TODO: logitravel.co.uk

const Top = (): JSX.Element => {
	var subtitle: string;
	subtitle = 'Find the deck plans, data, schedules, and all the goodies about your desired cruiseship here at Cruisegator.';
	return (
		<div className='flex h-screen flex-row justify-between items-end'>
			<div className='h-full flex justify-center items-left flex-col px-12 mx-5'>
				<h1 className='header m-0 text-blue-800 font-normal'>Enjoy your life<br />on cruiseship</h1>
				<p className='text-xl fw-light my-8'>{subtitle}</p>
				<a className="btn whitespace-nowrap rounded-full mt-3 px-5 py-2 bg-blue-800" href="/database">Explore Database</a>
			</div>
			<img src={TopLogo} className='top-logo mt-xxl-0 mt-sm-5 d-sm-none d-xl-block' alt='logo' />
		</div>
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
		<div className='bg-gray-50 flex flex-col justify-center items-center p-12'>
			<h1 className='fw-normal text-center text-nowrap text-5xl'>Why Choose Cruisegator?</h1>
			<div className='w-20 h-1 mt-6 bg-blue-800'></div>
			<div className='grid grid-cols-3 justify-center items-baseline px-20 gap-x-5 py-20'>
				{content.map(([Icon, title, desc]) => (
					<div className='mx-4'>
						<Icon size='4em' stroke-width='1' className='text-blue-800' />
						<h2 className='mt-4 fw-light text-3xl'>{title}</h2>
						<p className='fs-5 lh-sm pt-2'>{desc}</p>
					</div>
				))}
			</div>
		</div>
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
		<div className='flex flex-col justify-center items-center bg-fade py-12'>
			<h1 className='fw-normal text-center text-nowrap text-5xl'>Latest News</h1>
			<div className='w-20 h-1 mt-6 bg-blue-800'></div>
			<div className='grid grid-cols-3 justify-center mt-5 w-grid px-36 pt-12 gap-x-4'>
				{content.map(([picture, date, title, desc]) => (
					<div className='mx-2 overflow-hidden rounded-lg bg-white shadow-md news'>
						<img src={picture} className='w-100' alt={title} />
						<div className='p-8'>
							<p className='m-0'>{date.toLocaleString('en-GB', date_option)}</p>
							<h3 className='mb-4 mt-2 fw-light text-3xl'>{title}</h3>
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
			<Top />
			<Middle />
			<Bottom />
		</React.Fragment>
	)
};
