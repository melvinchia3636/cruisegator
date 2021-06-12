import React from 'react';
import { Compass, Database, Airplay } from 'react-feather';
import { TopLogo, Pic1, Pic2, Pic3 } from './assets';

const Top = (): JSX.Element => {
	return (
		<div className='flex h-screen flex-row justify-between items-end bg-gradient-to-b from-gray-50 to-white'>
			<div className='h-full flex justify-center items-left flex-col px-12 mx-5'>
				<h1 className='text-7xl m-0 font-poppins text-blue-800 leading-tight flex items-center'>Cruiseship<span className='text-3xl ml-6 mt-4 text-gray-700'>/ˈkruːzˌʃɪp/</span></h1>
				<p className='text-xl font-light mb-8 mt-2'><i className='text-gray-700 font-normal'>noun</i>. &nbsp; A luxury vessel that is used to take passengers on a pleasure voyage in a journey that is as much a part of the experience as the various destinations on the way.</p>
				<a className="btn whitespace-nowrap rounded-full mt-3 px-5 py-2 text-2xl bg-blue-800 font-poppins" href="/database">Explore Database</a>
			</div>
			<img src={TopLogo} className='h-4/6 mt-xxl-0 mt-sm-5 d-sm-none d-xl-block' alt='logo' />
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
		<div className='bg-gray-50 flex flex-col justify-center items-center p-12 pt-20'>
			<h1 className='text-center text-5xl text-gray-900'>Why Choose Cruisegator?</h1>
			<div className='w-20 h-1 mt-6 bg-blue-800'></div>
			<div className='grid grid-cols-3 justify-center items-baseline px-20 gap-x-5 py-20'>
				{content.map(([Icon, title, desc]) => (
					<div className='mx-4'>
						<Icon size='4em' stroke-width='1' className='text-blue-800' />
						<h2 className='mt-4 fw-light text-3xl'>{title}</h2>
						<p className='text-lg leading-snug pt-3 font-poppins'>{desc}</p>
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
		<div className='flex flex-col justify-center items-center bg-gradient-to-b to-gray-50 from-white py-20'>
			<h1 className='text-center text-5xl text-gray-900'>Latest News</h1>
			<div className='w-20 h-1 mt-6 bg-blue-800'></div>
			<div className='grid grid-cols-3 justify-center mt-5 w-grid px-36 pt-12 gap-x-4'>
				{content.map(([picture, date, title, desc]) => (
					<div className='mx-2 overflow-hidden rounded-lg bg-white shadow-md news'>
						<img src={picture} className='w-100' alt={title} />
						<div className='p-8'>
							<p className='m-0 font-poppins'>{date.toLocaleString('en-GB', date_option)}</p>
							<h3 className='mb-4 mt-2 text-3xl'>{title}</h3>
							<p className='mt-2 font-poppins'>{desc}</p>
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
