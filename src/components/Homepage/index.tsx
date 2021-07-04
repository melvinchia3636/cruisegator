import React from "react";
import { Compass, Database, Airplay } from "react-feather";
import { TopLogo, Pic1, Pic2, Pic3 } from "./assets";

const Top = (): JSX.Element => {
	return (
		<div className='flex h-screen flex-row justify-between items-end bg-gradient-to-b from-gray-50 to-white'>
			<div className='h-full flex justify-center items-left flex-col md:px-12 mx-5'>
				<div className="md:flex items-center">
					<h1 className='text-6xl m-0 font-poppins text-blue-800 leading-tight flex items-center font-medium'>Cruiseship</h1>
					<p className='text-3xl md:ml-6 mt-2 text-gray-700 font-normal'>/ˈkruːzˌʃɪp/</p>
				</div>
				<p className='text-xl mb-8 mt-4 font-poppins'><i className='text-gray-700 font-normal'>noun</i>. &nbsp; A luxury vessel that is used to take passengers on a pleasure voyage in a journey that is as much a part of the experience as the various destinations on the way.</p>
				<div className="mt-6 flex flex-col items-center sm:flex-row ">
					<a className="btn whitespace-nowrap rounded-full px-5 py-2 text-xl bg-blue-800 font-poppins text-white !w-full text-center sm:!w-auto" href="/database">GET ONBOARD NOW</a>
					<a className='btn whitespace-nowrap rounded-full px-5 py-2 text-xl border-blue-800 text-blue-800 border-2 font-poppins sm:ml-4 mt-3 sm:mt-0 font-medium !w-full text-center sm:!w-auto'>LEARN MORE</a>
				</div>
			</div>
			<img src={TopLogo} className='h-4/6 hidden xl:!block' alt='logo' />
		</div>
	);
};

const Middle = (): JSX.Element => {
	const content = [
		[
			Compass,
			"Realtime Data",
			"Get the latest location and schedules of cruiseships all over around the world, with all the data getting refreshed constantly."
		],
		[
			Database,
			"Open Source",
			"Get free access to all data forever without needing any payment. Source code of this website is available on github."
		],
		[
			Airplay,
			"Clean UI",
			"Enjoy your time exploring on Cruisegator with it's clean, easy-to-use and nice looking webpage user-interface."
		]
	];

	return (
		<div className='bg-gray-50 flex flex-col justify-center items-center p-12 pt-20'>
			<h1 className='text-center text-5xl text-gray-900 font-poppins'>Why Choose Us?</h1>
			<div className='w-20 h-1 mt-6 bg-blue-800'></div>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(18em,1fr))] justify-center items-baseline px-20 gap-x-5 gap-y-8 py-20'>
				{content.map(([Icon, title, desc]) => (
					<div className='mx-4' key={title as string}>
						<Icon size='4em' stroke-width='1' className='text-blue-800' />
						<h2 className='mt-4 font- text-3xl font-poppins'>{title}</h2>
						<p className='text-lg leading-snug pt-3 font-poppins text-gray-500'>{desc}</p>
					</div>
				))}
			</div>
		</div>
	);
};

const Bottom = (): JSX.Element => {
	const content: [string, Date, string, string][] = [
		[
			Pic1,
			new Date(2021, 5, 26),
			"Which Cruise Lines Have Restarted Cruising?",
			"While the global COVID-19 pandemic has shut down most cruise lines since mid-March 2020, there are areas of the world where ships are restarting."
		],
		[
			Pic2,
			new Date(2021, 5, 25),
			"More River Lines Announce European Restart Dates As American Travel Looks Possible For Summer",
			"Five more river cruise lines have announced summer 2021 restart dates, as the European Union moves toward approving international travel for vaccinated Americans."
		],
		[
			Pic3,
			new Date(2021, 5, 24),
			"Carnival Cruise Line Outlines its Health and Safety Protocols For Alaska Sailings",
			"Carnival Cruise Line has outlined its COVID-19 health and safety protocols for its return to the seas, with new measures designed specifically for passengers on the line's upcoming Alaska sailings."
		]
	];
	return (
		<div className='flex flex-col justify-center items-center bg-gradient-to-b to-gray-50 from-white py-20'>
			<h1 className='text-center text-5xl text-gray-900 font-poppins'>Latest News</h1>
			<div className='w-20 h-1 mt-6 bg-blue-800'></div>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(18em,1fr))] justify-center items-center mt-5 w-grid px-12 xl:px-36 pt-12 gap-x-4 gap-y-8'>
				{content.map(([picture, date, title, desc]) => (
					<div className='mx-2 overflow-hidden rounded-lg bg-white shadow-md news' key={title}>
						<img src={picture} className='w-full' alt={title} />
						<div className='p-8'>
							<p className='m-0 font-poppins'>{date.toLocaleString("en-GB", {
								dateStyle: "full"
							})}</p>
							<h3 className='mb-4 mt-2 text-3xl font-poppins font-medium text-blue-800'>{title}</h3>
							<p className='mt-2 font-poppins'>{desc}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default function Homepage(): JSX.Element {
	return (
		<React.Fragment>
			<Top />
			<Middle />
			<Bottom />
		</React.Fragment>
	);
}
