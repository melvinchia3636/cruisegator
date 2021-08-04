import React from "react";
import {TopLogo, FrontendIcon, BackendIcon} from "./assets";

export default function Homepage(): JSX.Element {
	return (
		<>
			<div className="mx-32 w-100 mt-16 flex justify-between relative">
				<div className="w-min mr-44">
					<h1 className="text-6xl font-semibold leading-[129%] w-min whitespace-nowrap mb-8 mt-8" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
				Travel the world<br/>with <span className="text-blue-800">Cruiseship</span>.
					</h1>
					<p className="text-[1.4rem] w-full leading-[149%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
					<a className="font-semibold text-2xl text-blue-800 flex items-center mt-20">Explore Database
						<svg className="ml-4 mt-0.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</a>
				</div>
				<div className="relative">
					<img src={TopLogo}/>
					<div className="absolute -bottom-16 p-4 -right-8 w-44 h-44 bg-blue-800 text-white font-semibold text-3xl leading-[128%] shadow-default">
					Quantum Of The Seas
						<svg className="absolute right-4 bottom-4" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 12H20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M13 5L20 12L13 19" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</div>
				</div>
				<a className="absolute bottom-2 left-0 flex font-medium text-lg">
					<svg className="mr-2 transform rotate-90" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
                Scroll Down
				</a>
			</div>
			<div className="mt-44 px-32 py-28 w-100 mb-32 bg-blue-700 flex justify-between items-center">
				<div>
					<p className="text-gray-500 font-semibold text-2xl mb-6 tracking-wider">GET INSPIRED</p>
					<h2 className="font-semibold text-5xl leading-[129%] whitespace-nowrap">Ideas behind how<br/>this project was<br/>created</h2>
				</div>
				<div className="flex items-center">
					<div className="flex">
						<div className="bg-blue-800 rounded-full p-4 h-[min-content]" style={{boxShadow: "0px 0px 6px #4189DD"}}>
							<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M23.125 10.4062C23.7636 10.4062 24.2812 9.88858 24.2812 9.25C24.2812 8.61142 23.7636 8.09375 23.125 8.09375C22.4864 8.09375 21.9688 8.61142 21.9688 9.25C21.9688 9.88858 22.4864 10.4062 23.125 10.4062Z" fill="#F6F5F7"/>
								<path d="M26.5938 10.4062C27.2323 10.4062 27.75 9.88858 27.75 9.25C27.75 8.61142 27.2323 8.09375 26.5938 8.09375C25.9552 8.09375 25.4375 8.61142 25.4375 9.25C25.4375 9.88858 25.9552 10.4062 26.5938 10.4062Z" fill="#F6F5F7"/>
								<path d="M30.0625 10.4062C30.7011 10.4062 31.2188 9.88858 31.2188 9.25C31.2188 8.61142 30.7011 8.09375 30.0625 8.09375C29.4239 8.09375 28.9062 8.61142 28.9062 9.25C28.9062 9.88858 29.4239 10.4062 30.0625 10.4062Z" fill="#F6F5F7"/>
								<path d="M32.375 4.625H4.625C4.01187 4.62561 3.42404 4.86945 2.99049 5.30299C2.55695 5.73654 2.31311 6.32437 2.3125 6.9375V30.0625C2.31311 30.6756 2.55695 31.2635 2.99049 31.697C3.42404 32.1306 4.01187 32.3744 4.625 32.375H32.375C32.9881 32.3744 33.576 32.1306 34.0095 31.697C34.4431 31.2635 34.6869 30.6756 34.6875 30.0625V6.9375C34.6869 6.32437 34.4431 5.73654 34.0095 5.30299C33.576 4.86945 32.9881 4.62561 32.375 4.625ZM32.375 6.9375V11.5625H4.625V6.9375H32.375ZM4.625 13.875H11.5625V30.0625H4.625V13.875ZM13.875 30.0625V13.875H32.375V30.0625H13.875Z" fill="#F6F5F7"/>
							</svg>
						</div>
						<div className="ml-6 mt-4 mr-8">
							<h2 className="font-medium text-4xl">UI Designing</h2>
							<p className="text-xl mt-4 max-w-[18rem] leading-[153%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
						</div>
					</div>
					<div className="flex">
						<div className="bg-blue-800 rounded-full p-4 h-[min-content]" style={{boxShadow: "0px 0px 6px #4189DD"}}>
							<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M35.8437 18.5L27.7499 26.5938L26.1196 24.9634L32.5715 18.5L26.1196 12.0366L27.7499 10.4062L35.8437 18.5Z" fill="white"/>
								<path d="M1.15625 18.5L9.25 10.4062L10.8803 12.0366L4.42844 18.5L10.8803 24.9634L9.25 26.5938L1.15625 18.5Z" fill="white"/>
								<path d="M14.36 29.4659L20.3957 6.9375L22.6295 7.53644L16.5928 30.0625L14.36 29.4659Z" fill="white"/>
							</svg>
						</div>
						<div className="ml-6 mt-4">
							<h2 className="font-medium text-4xl">Code Writing</h2>
							<p className="text-xl mt-4 max-w-[18rem] leading-[153%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
