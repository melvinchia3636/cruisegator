import React from "react";
import {TopLogo, illu1, illu2, illu3, illu4, img} from "./assets";

export default function Homepage(): JSX.Element {
	return (
		<>
			<div className="mx-8 md:mx-32 w-100 mt-8 md:mt-16 flex flex-col 1170:pb-0 1170:flex-row gap-24 1440:gap-44 justify-between relative 1170:h-[calc(100vh-100px-4rem)]">
				<div className="1170:w-min">
					<h1 className="text-5xl xl:text-6xl font-semibold !leading-[129%] w-min 480:whitespace-nowrap mb-8 mt-8" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
						Travel the world <br className="hidden 480:inline"/>with <span className="text-blue-800">Cruiseship</span>.
					</h1>
					<p className="text-xl xl:text-[1.4rem] w-full !leading-[149%]">We have every piece of details for any cruiseship in the world. An absolute paradise for cruiseship lover to visit.</p>
					<a className="font-semibold text-2xl text-blue-800 flex items-center mt-20" href="/database">Explore Database
						<svg className="ml-4 mt-0.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</a>
				</div>
				<div className="relative w-full">
					<img src={TopLogo} className="w-full h-full object-cover"/>
					<div className="absolute -bottom-16 p-4 right-0 md:-right-8 w-44 h-44 bg-blue-800 text-white font-semibold text-2xl xl:text-3xl leading-[128%] shadow-default">
					Quantum Of The Seas
						<svg className="absolute right-4 bottom-4" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 12H20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M13 5L20 12L13 19" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</div>
				</div>
				<a className="absolute bottom-2 left-0 font-medium text-lg hidden 1170:flex">
					<svg className="mr-2 transform rotate-90" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
                Scroll Down
				</a>
			</div>
			<div className="mt-44 px-8 md:px-32 py-28 w-100 bg-blue-700 flex flex-col 1170:flex-row justify-between items-start 1170:items-center gap-24">
				<div>
					<p className="text-blue-800 font-semibold text-xl sm:text-2xl mb-6">Get Inspired</p>
					<h2 className="font-semibold text-4xl sm:text-5xl !leading-[129%] whitespace-nowrap">Ideas behind how<br/>this project was<br/>created</h2>
				</div>
				<div className="flex items-start gap-24 1396:gap-0 special">
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
							<h2 className="font-medium text-[2rem] sm:text-4xl">UI Designing</h2>
							<p className="text-lg sm:text-xl mt-4 1024:max-w-[18rem] leading-[153%]">Open Figma, casually choose a color theme, pick some illustrations, and start designing.</p>
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
							<h2 className="font-medium text-[2rem] sm:text-4xl">Code Writing</h2>
							<p className="text-lg sm:text-xl mt-4 1024:max-w-[18rem] leading-[153%]">Get your code editor up and running, initialize a react project, and start writing your code.</p>
						</div>
					</div>
				</div>
			</div>
			<div className="px-8 md:px-32 py-28 pb-14 w-100">
				<h1 className="text-4xl md:text-5xl 2xl:px-72 font-semibold !leading-[129%] mb-8 mt-8 text-center" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
					What makes this project so <span className="text-blue-800">interesting</span>?
				</h1>
				<p className="text-center text-xl md:text-2xl mt-6">A not really small project made by a normal guy... Yeah pretty normal</p>
				<div className="mt-16 md:mt-24 grid gap-8 1396:gap-16 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
					<div className="shadow-gridbox flex p-12 flex-col items-center justify-center bg-white">
						<div className="bg-blue-600 rounded-full p-4 w-min">
							<svg width="59" height="59" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M47.9375 3.6875H11.0625C10.0427 3.6875 9.21875 4.51143 9.21875 5.53125V53.4688C9.21875 54.4886 10.0427 55.3125 11.0625 55.3125H47.9375C48.9573 55.3125 49.7812 54.4886 49.7812 53.4688V5.53125C49.7812 4.51143 48.9573 3.6875 47.9375 3.6875ZM13.3672 7.83594H45.6328V19.8203H13.3672V7.83594ZM45.6328 35.4922H13.3672V23.5078H45.6328V35.4922ZM45.6328 51.1641H13.3672V39.1797H45.6328V51.1641ZM17.5156 13.8281C17.5156 14.4394 17.7584 15.0256 18.1907 15.4578C18.6229 15.89 19.2091 16.1328 19.8203 16.1328C20.4316 16.1328 21.0178 15.89 21.45 15.4578C21.8822 15.0256 22.125 14.4394 22.125 13.8281C22.125 13.2169 21.8822 12.6307 21.45 12.1985C21.0178 11.7663 20.4316 11.5234 19.8203 11.5234C19.2091 11.5234 18.6229 11.7663 18.1907 12.1985C17.7584 12.6307 17.5156 13.2169 17.5156 13.8281ZM17.5156 29.5C17.5156 30.1112 17.7584 30.6974 18.1907 31.1297C18.6229 31.5619 19.2091 31.8047 19.8203 31.8047C20.4316 31.8047 21.0178 31.5619 21.45 31.1297C21.8822 30.6974 22.125 30.1112 22.125 29.5C22.125 28.8888 21.8822 28.3026 21.45 27.8703C21.0178 27.4381 20.4316 27.1953 19.8203 27.1953C19.2091 27.1953 18.6229 27.4381 18.1907 27.8703C17.7584 28.3026 17.5156 28.8888 17.5156 29.5ZM17.5156 45.1719C17.5156 45.7831 17.7584 46.3693 18.1907 46.8015C18.6229 47.2337 19.2091 47.4766 19.8203 47.4766C20.4316 47.4766 21.0178 47.2337 21.45 46.8015C21.8822 46.3693 22.125 45.7831 22.125 45.1719C22.125 44.5606 21.8822 43.9744 21.45 43.5422C21.0178 43.11 20.4316 42.8672 19.8203 42.8672C19.2091 42.8672 18.6229 43.11 18.1907 43.5422C17.7584 43.9744 17.5156 44.5606 17.5156 45.1719Z" fill="#4189DD"/>
							</svg>
						</div>
						<h2 className="font-medium mt-9 text-2xl">Well Formed Data</h2>
						<p className="mt-6 text-lg text-center">Presenting data scraped from other websites in a good way</p>
					</div>
					<div className="shadow-gridbox inline-flex p-12 flex-col items-center justify-center bg-white">
						<div className="bg-blue-600 rounded-full p-4 w-min">
							<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M35 11.3667C29.8248 11.3647 24.7921 13.0614 20.6745 16.1963C16.5568 19.3313 13.5821 23.7312 12.2069 28.7204C10.8318 33.7096 11.1324 39.0122 13.0625 43.8141C14.9926 48.6159 18.4455 52.6515 22.891 55.3011L23.1969 55.4833L23.3246 55.151L27.6413 43.9248L27.7169 43.7281L27.5576 43.5903C25.8048 42.0736 24.5578 40.0571 23.9838 37.8115C23.4097 35.5658 23.5361 33.1983 24.346 31.0265C25.1559 28.8547 26.6106 26.9825 28.5149 25.6611C30.4191 24.3396 32.682 23.6321 34.9999 23.6334L35.0003 23.6334C37.3184 23.6315 39.5817 24.3386 41.4864 25.6598C43.3911 26.9811 44.8462 28.8532 45.6565 31.0252C46.4667 33.1971 46.5934 35.5648 46.0194 37.8108C45.4455 40.0567 44.1983 42.0734 42.4454 43.5903L42.2863 43.728L42.3616 43.9245C43.5489 47.0221 44.6288 49.8306 45.5978 52.3508C45.9738 53.3285 46.333 54.2629 46.6754 55.1539L46.8031 55.4862L47.109 55.304C51.556 52.6551 55.0103 48.6194 56.9413 43.817C58.8724 39.0145 59.1734 33.7109 57.7982 28.7208C56.4229 23.7307 53.4474 19.3301 49.3287 16.195C45.2101 13.0599 40.1761 11.3636 35 11.3667ZM35 11.3667C35 11.3667 34.9999 11.3667 34.9999 11.3667L35 11.6667L35.0002 11.3667C35.0001 11.3667 35.0001 11.3667 35 11.3667ZM43.8839 62.4716L35.6601 41.0909C37.0836 40.9271 38.4109 40.2728 39.4097 39.2335C40.5036 38.0951 41.1203 36.5812 41.1334 35.0025V35.0001C41.1335 33.7978 40.7804 32.622 40.1178 31.6189C39.4551 30.6157 38.5123 29.8294 37.4064 29.3577C36.3006 28.886 35.0805 28.7497 33.8978 28.9658C32.7151 29.1818 31.622 29.7407 30.7544 30.5729C29.8867 31.4052 29.2828 32.4741 29.0177 33.6467C28.7526 34.8194 28.8379 36.0441 29.2632 37.1686C29.6884 38.2932 30.4348 39.2679 31.4095 39.9717C32.2722 40.5947 33.2801 40.981 34.3332 41.0962L26.1134 62.4713L25.731 62.3455C25.7306 62.3454 25.7302 62.3453 25.7298 62.3451C20.0156 60.407 15.0522 56.727 11.5373 51.8225C8.02211 46.9176 6.13227 41.0345 6.13337 35.0001V35C6.13337 19.057 19.057 6.13337 35 6.13337C50.9431 6.13337 63.8667 19.057 63.8667 35C63.8667 47.7004 55.6668 58.4849 44.2707 62.345C44.2702 62.3451 44.2697 62.3453 44.2692 62.3455L43.8839 62.4716Z" fill="#4189DD" stroke="#C0D3EA" strokeWidth="0.6"/>
							</svg>
						</div>
						<h2 className="font-medium mt-9 text-2xl">Fully Open Source</h2>
						<p className="mt-6 text-lg text-center">Explore the source code, do contribution to make it better</p>
					</div>
					<div className="shadow-gridbox inline-flex p-12 flex-col items-center justify-center bg-white">
						<div className="bg-blue-600 rounded-full p-4 w-min">
							<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M49.8438 6.34375H8.15625C7.15371 6.34375 6.34375 7.15371 6.34375 8.15625V49.8438C6.34375 50.8463 7.15371 51.6562 8.15625 51.6562H49.8438C50.8463 51.6562 51.6562 50.8463 51.6562 49.8438V8.15625C51.6562 7.15371 50.8463 6.34375 49.8438 6.34375ZM10.4219 10.4219H18.125V47.5781H10.4219V10.4219ZM47.5781 47.5781H21.75V21.75H47.5781V47.5781ZM21.75 18.125V10.4219H47.5781V18.125H21.75Z" fill="#4189DD"/>
							</svg>
						</div>
						<h2 className="font-medium mt-9 text-2xl">Great UI Design</h2>
						<p className="mt-6 text-lg text-center">Not the best design in the world, but definitely a good one</p>
					</div>
				</div>
				<div className="flex justify-center mt-12"><a className="bg-blue-800 rounded-full text-white py-4 px-12 inline-block mt-8 font-medium tracking-[3.5px] uppercase btn-white btn btn-animated z-40 relative w-min whitespace-nowrap shadow-default"><span className="relative z-20 text-white text-lg">Explore Database</span></a></div>
			</div>
			<div className="px-8 sm:px-16 md:px-32 pb-14 pt-0 w-100 mt-12">
				<div className="flex flex-col 1170:flex-row justify-between items-center mb-20 1170:gap-28">
					<div className="w-full" style={{flexShrink: 1}}><img src={illu1} className="w-full"/></div>
					<div>
						<p className="text-blue-800 font-semibold text-lg xl:text-xl mb-4">Mapbox GL</p>
						<h2 className="text-4xl xl:text-[2.7rem] font-semibold leading-[129%]">Realtime updated cruiseship location map</h2>
						<p className="text-lg xl:text-xl mt-6">See the current location of all the ships over the whole world updating in realtime. World map powered by MapboxGL JS.</p>
						<a className="font-semibold text-xl xl:text-2xl text-blue-800 flex items-center mt-10">Explore map
							<svg className="ml-4 mt-0.5 hidden xl:block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							<svg className="ml-2 mt-0.5 block xl:hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</a>
					</div>
				</div>
				<div className="flex flex-col 1170:flex-row justify-between items-center mb-20 1170:gap-28">
					<div className="w-full block 1170:hidden" style={{flexShrink: 1}}><img src={illu2}/></div>
					<div>
						<p className="text-blue-800 font-semibold text-lg xl:text-xl mb-4">Express JS</p>
						<h2 className="text-4xl xl:text-[2.7rem] font-semibold leading-[129%]">REST API for everything you see here</h2>
						<p className="text-lg xl:text-xl mt-6">Use the data in our website for your own project. We allow you to legally scrape all the data you can see in our website.</p>
						<a className="font-semibold text-xl xl:text-2xl text-blue-800 flex items-center mt-10">Get started
							<svg className="ml-4 mt-0.5 hidden xl:block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							<svg className="ml-2 mt-0.5 block xl:hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</a>
					</div>
					<div className="w-full hidden 1170:flex" style={{flexShrink: 1}}><img src={illu2}/></div>
				</div>
				<div className="flex flex-col 1170:flex-row justify-between items-center mb-16 1170:gap-28">
					<div className="w-full" style={{flexShrink: 1}}><img src={illu3} className="w-full"/></div>
					<div>
						<p className="text-blue-800 font-semibold text-lg xl:text-xl mb-4">React Redux</p>
						<h2 className="text-4xl xl:text-[2.7rem] font-semibold leading-[129%]">Latest news of cruiseship insustries</h2>
						<p className="text-lg xl:text-xl mt-6">Check out the current trends in cruiseship industries so that you will not miss anything important about it.</p>
						<a className="font-semibold text-xl xl:text-2xl text-blue-800 flex items-center mt-10">Take a gander
							<svg className="ml-4 mt-0.5 hidden xl:block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							<svg className="ml-2 mt-0.5 block xl:hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</a>
					</div>
				</div>
			</div>
			<div className="px-8 sm:px-16 md:px-32 py-28 w-100 bg-blue-700 flex flex-col xl:flex-row justify-between items-center gap-24 2xl:gap-0">
				<div className="flex flex-col items-center xl:items-start xl:w-6/12">
					<h1 className="text-4xl xl:text-5xl font-semibold !leading-[129%] mb-8 text-center xl:text-left" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
						<span className="text-blue-800">Technologies</span> used<br/>in this project
					</h1>
					<p className="text-xl text-center xl:text-left w-full xl:w-8/12">A total of 4 different technologies and languages has been used for this project.</p>
					<a className='bg-blue-800 rounded-full text-white shadow-default mt-12 font-medium btn-anim2 !px-24 whitespace-nowrap' data-text="VIEW REPOSITORY" href="https://github.com/melvinchia3636/cruisegator">{"GOTO GITHUB".split("").map(e => <span className="text-white" key={e}>{e}</span>)}</a>
				</div>
				<div className="grid w-full sm:w-auto sm:grid-cols-2 items-center gap-4 mt-4 xl:mt-0" style={{gridAutoRows: "1fr"}}>
					<div className="shadow-gridbox rounded-[4px] bg-white p-6 h-full flex flex-col justify-between">
						<div>
							<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M28 23.0056C25.2472 23.0056 23.0055 25.2473 23.0055 28.0001C23.0055 30.7528 25.2472 32.9946 28 32.9946C30.7528 32.9946 32.9945 30.7528 32.9945 28.0001C32.9945 25.2473 30.7528 23.0056 28 23.0056ZM14.0175 37.9261L12.915 37.6531C4.711 35.5741 0 32.0566 0 27.9913C0 23.9261 4.71275 20.4086 12.915 18.3296L14.0175 18.0566L14.3273 19.1503C15.1595 22.0151 16.2235 24.8074 17.5088 27.4996L17.745 27.9913L17.5088 28.4918C16.2208 31.1828 15.1567 33.9753 14.3273 36.8411L14.0175 37.9261ZM12.4058 20.8811C6.1705 22.6311 2.34325 25.3191 2.34325 27.9913C2.34325 30.6636 6.17225 33.3411 12.4058 35.1016C13.1699 32.6737 14.0924 30.2985 15.1672 27.9913C14.0909 25.6848 13.1683 23.3095 12.4058 20.8811ZM41.9825 37.9261L41.6727 36.8323C40.842 33.9699 39.7779 31.1804 38.4913 28.4918L38.255 27.9913L38.4913 27.4908C39.7792 24.7998 40.8433 22.0073 41.6727 19.1416L41.9825 18.0566L43.085 18.3296C51.289 20.4086 56 23.9261 56 27.9913C56 32.0566 51.2873 35.5741 43.085 37.6531L41.9825 37.9261ZM40.8327 27.9913C41.9112 30.297 42.8338 32.6724 43.5942 35.1016C49.8382 33.3428 53.6567 30.6636 53.6567 27.9913C53.6567 25.3191 49.8277 22.6416 43.5942 20.8811C42.8283 23.3083 41.9059 25.6834 40.8327 27.9913ZM12.3865 20.8723L12.0767 19.7786C9.77025 11.6481 10.472 5.81531 14 3.78181C17.4632 1.78506 23.0142 4.14581 28.8382 10.1256L29.631 10.9376L28.8382 11.7496C26.77 13.9014 24.8802 16.2179 23.1875 18.6761L22.869 19.1223L22.3213 19.1678C19.3436 19.4028 16.3898 19.8786 13.489 20.5906L12.3865 20.8723ZM16.8158 5.40581C16.1875 5.40581 15.631 5.53356 15.1655 5.80656C12.8503 7.14706 12.4408 11.7951 14.035 18.0653C16.5225 17.5089 19.0438 17.116 21.5828 16.8893C23.0444 14.8075 24.6428 12.825 26.3673 10.9551C22.7308 7.40956 19.285 5.40406 16.8158 5.40406V5.40581ZM39.193 52.9096C39.1842 52.9096 39.1842 52.9096 39.193 52.9096C35.8662 52.9096 31.591 50.4123 27.1618 45.8553L26.369 45.0433L27.1618 44.2313C29.23 42.0795 31.1198 39.763 32.8125 37.3048L33.1222 36.8586L33.67 36.8043C36.6515 36.5772 39.6088 36.1013 42.511 35.3816L43.6135 35.1086L43.9233 36.2023C46.2298 44.3328 45.528 50.1568 42 52.1886C41.147 52.6788 40.1766 52.9274 39.193 52.9078V52.9096ZM29.631 45.0258C33.2675 48.5713 36.7132 50.5768 39.1825 50.5768H39.1912C39.8107 50.5768 40.3672 50.4403 40.8327 50.1761C43.148 48.8356 43.568 44.1876 41.9632 37.9173C39.4762 38.4743 36.9546 38.8643 34.4155 39.0846C32.9539 41.1692 31.3555 43.1546 29.631 45.0276V45.0258ZM43.6135 20.8723L42.511 20.5906C39.6067 19.881 36.6503 19.4052 33.67 19.1678L33.1222 19.1223L32.8125 18.6761C31.1198 16.2179 29.23 13.9014 27.1618 11.7496L26.369 10.9376L27.1618 10.1256C32.9857 4.14581 38.5368 1.78506 42 3.78181C45.528 5.81356 46.2298 11.6481 43.9233 19.7786L43.6135 20.8723ZM34.4173 16.8893C36.9562 17.1154 39.4776 17.5083 41.965 18.0653C43.5697 11.7951 43.1497 7.14531 40.8345 5.80656C38.528 4.47656 34.1898 6.51706 29.6328 10.9568C31.3525 12.8308 32.9506 14.8129 34.4173 16.8911V16.8893ZM16.8158 52.9096C15.8305 52.9271 14.8558 52.6821 14 52.1903C10.472 50.1586 9.77025 44.3328 12.0767 36.2041L12.3865 35.1103L13.489 35.3833C16.1875 36.0676 19.159 36.5401 22.3213 36.8061L22.869 36.8603L23.1787 37.3066C24.8715 39.7648 26.7613 42.0812 28.8295 44.2331L29.6222 45.0451L28.8295 45.8571C24.409 50.4141 20.1338 52.9113 16.8158 52.9113V52.9096ZM14.0367 37.9173C12.432 44.1876 12.852 48.8373 15.1672 50.1761C17.4737 51.4886 21.8032 49.4656 26.369 45.0258C24.6445 43.1528 23.0461 41.1675 21.5845 39.0828C19.0453 38.8632 16.5237 38.4732 14.0367 37.9156V37.9173ZM28 39.3838C26.0767 39.3838 24.108 39.3016 22.1305 39.1371L21.5828 39.0916L21.2642 38.6366C20.1472 37.0316 19.0981 35.3805 18.1195 33.6876C17.1389 31.9946 16.2298 30.2611 15.3947 28.4918L15.1585 27.9913L15.3947 27.4908C17.0678 23.953 19.031 20.5598 21.2642 17.3461L21.5828 16.8911L22.1305 16.8456C26.0366 16.5166 29.9634 16.5166 33.8695 16.8456L34.4173 16.8911L34.7358 17.3461C36.9719 20.558 38.9352 23.9514 40.6052 27.4908L40.8415 27.9913L40.6052 28.4918C38.9386 32.033 36.9751 35.4267 34.7358 38.6366L34.4173 39.0916L33.8695 39.1371C31.9173 39.3004 29.9591 39.3827 28 39.3838ZM22.8778 36.8498C26.3235 37.1141 29.6765 37.1141 33.131 36.8498C35.0576 34.0286 36.7698 31.0669 38.2533 27.9896C36.7761 24.9071 35.0605 21.9447 33.1222 19.1293C29.7125 18.8651 26.2875 18.8651 22.8778 19.1293C20.9381 21.9438 19.2225 24.9064 17.7467 27.9896C19.2306 31.0685 20.9459 34.0304 22.8778 36.8498Z" fill="#4189DD"/>
							</svg>
							<h2 className="font-medium text-3xl mt-4">React JS</h2>
							<p className="text-lg mt-4 max-w-[18rem] leading-[153%]">A free and open-source front-end JavaScript library for building user interfaces or UI components</p>
						</div>
						<a className="text-blue-800 font-semibold mt-9 flex" href="https://reactjs.org">LEARN MORE</a>
					</div>
					<div className="shadow-gridbox rounded-[4px] bg-white p-6 h-full flex flex-col justify-between">
						<div>
							<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0)">
									<path d="M56 43.3719C55.185 43.6802 54.2853 43.6795 53.4708 43.37C52.6562 43.0605 51.9831 42.4636 51.5784 41.6919L43.5284 30.5596L42.3617 29.0032L33.0214 41.7059C32.641 42.4452 32.0044 43.0207 31.2305 43.3247C30.4567 43.6288 29.5986 43.6406 28.8167 43.3579L40.852 27.2112L29.6567 12.6256C30.4617 12.3355 31.342 12.3316 32.1495 12.6147C32.957 12.8977 33.6423 13.4504 34.09 14.1796L42.434 25.4496L50.8247 14.2262C51.208 13.5001 51.8448 12.9401 52.614 12.6527C53.3832 12.3653 54.2311 12.3706 54.9967 12.6676L50.652 18.4332L44.7674 26.0936C44.6039 26.2393 44.4732 26.418 44.3836 26.6179C44.2941 26.8177 44.2478 27.0342 44.2478 27.2532C44.2478 27.4722 44.2941 27.6887 44.3836 27.8886C44.4732 28.0884 44.6039 28.2671 44.7674 28.4129L55.9767 43.3742L56 43.3719ZM0.00469466 27.0106L0.984695 22.1689C3.67736 12.5952 14.6534 8.61222 22.204 14.5389C26.6257 18.0132 27.7294 22.9319 27.5124 28.4759H2.60403C2.20036 38.3762 9.34503 44.3542 18.48 41.2999C19.9609 40.7668 21.2864 39.8748 22.3379 38.7036C23.3893 37.5325 24.1338 36.1188 24.5047 34.5892C24.9877 33.0352 25.7834 32.7692 27.244 33.2172C27.0006 35.1128 26.3305 36.9285 25.2842 38.5277C24.2378 40.1269 22.8425 41.4681 21.203 42.4502C18.495 43.9315 15.388 44.5186 12.3262 44.1276C9.26434 43.7366 6.40456 42.3875 4.15569 40.2732C1.9321 37.7705 0.588206 34.609 0.329028 31.2712C0.329028 30.7229 0.142361 30.2096 0.0163613 29.7172C0.00500273 28.8158 -0.000441833 27.9144 2.79913e-05 27.0129L0.00469466 27.0106ZM2.63436 26.3432H25.1604C25.0204 19.1659 20.4914 14.0746 14.4504 14.0279C7.72569 13.9346 2.91436 18.9139 2.61803 26.3106L2.63436 26.3432Z" fill="#4189DD"/>
								</g>
								<defs>
									<clipPath id="clip0">
										<rect width="56" height="56" fill="white"/>
									</clipPath>
								</defs>
							</svg>
							<h2 className="font-medium text-3xl mt-4">Express JS</h2>
							<p className="text-lg mt-4 max-w-[18rem] leading-[153%]">A back end web application framework for Node.js, released as free and open-source software under the MIT License.</p>
						</div>
						<a className="text-blue-800 font-semibold mt-9 flex" href="https://expressjs.com">LEARN MORE</a>
					</div>
					<div className="shadow-gridbox rounded-[4px] bg-white p-6 h-full flex flex-col justify-between">
						<div>
							<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M38.8098 38.509C40.8415 38.3357 42.4095 36.549 42.3098 34.4157C42.1995 32.2825 40.4495 30.571 38.3268 30.571H38.1798C37.1226 30.6088 36.1237 31.065 35.4027 31.8391C34.6817 32.6132 34.2977 33.642 34.335 34.6992C34.4068 35.821 34.8618 36.7222 35.4918 37.3872C33.04 42.1455 29.3755 45.6385 23.807 48.5802C20.0708 50.5315 16.1228 51.27 12.278 50.7415C9.05978 50.2952 6.54503 48.8567 5.00503 46.5485C2.69678 43.0485 2.48678 39.2842 4.41178 35.5025C5.81353 32.7777 7.91178 30.7792 9.30478 29.8045C8.88608 28.6319 8.56016 27.4283 8.33003 26.2047C-2.02297 33.616 -0.965973 43.7607 2.17878 48.547C4.52203 52.047 9.30478 54.28 14.546 54.28C15.9513 54.28 17.4178 54.1802 18.8493 53.8232C27.9475 52.0732 34.8285 46.622 38.773 38.5842L38.8098 38.509ZM51.2873 29.7695C45.8745 23.4065 37.898 19.9065 28.812 19.9065H27.6168C27.034 18.6202 25.6655 17.8117 24.1255 17.8117H24.0258C21.8208 17.8117 20.1058 19.707 20.1775 21.905C20.2528 23.9997 22.0273 25.7497 24.1605 25.7497H24.3355C25.0924 25.719 25.8245 25.4716 26.445 25.037C27.0654 24.6024 27.548 23.9988 27.8355 23.298H29.1288C34.517 23.298 39.613 24.8747 44.2698 27.9477C47.824 30.2875 50.386 33.371 51.8158 37.0425C53.074 40.0402 53.0005 42.9855 51.7055 45.4372C49.7193 49.2732 46.3558 51.305 41.9265 51.305C39.1283 51.305 36.4035 50.43 34.9983 49.8017C34.16 50.4947 32.7565 51.6515 31.7433 52.355C34.825 53.748 37.933 54.5512 40.9413 54.5512C47.7593 54.5512 52.8273 50.7135 54.7505 47.0052C56.8453 42.8122 56.6738 35.7475 51.3223 29.696L51.2873 29.7695ZM15.1393 39.7672C15.1871 40.7969 15.6275 41.7691 16.3699 42.4842C17.1122 43.1992 18.1003 43.6028 19.131 43.612H19.2693C19.7947 43.5995 20.3124 43.4821 20.7918 43.2666C21.2712 43.0512 21.7027 42.7421 22.0609 42.3574C22.4192 41.9728 22.6969 41.5204 22.8777 41.0269C23.0586 40.5334 23.1389 40.0087 23.114 39.4837C23.114 37.3855 21.301 35.6355 19.1678 35.6355H19.0208C18.886 35.6355 18.676 35.6355 18.494 35.7107C15.596 30.816 14.3728 25.566 14.8278 19.9047C15.1025 15.64 16.506 11.9387 19.0208 8.85872C21.119 6.24247 25.0635 4.93872 27.762 4.87572C35.3098 4.72872 38.4633 14.1437 38.7013 17.8817L42.2013 18.93C41.3893 7.46397 34.2633 1.44922 27.4453 1.44922C21.0473 1.44922 15.1393 6.09722 12.761 12.9152C9.51478 22.0135 11.648 30.7442 15.631 37.7442C15.2863 38.1905 15.0763 39.0025 15.1393 39.7672Z" fill="#4189DD"/>
							</svg>

							<h2 className="font-medium text-3xl mt-4">React Redux</h2>
							<p className="text-lg mt-4 max-w-[18rem] leading-[153%]">An open-source JavaScript library for managing application state.</p>
						</div>
						<a className="text-blue-800 font-semibold mt-9 flex" href="https://react-redux.js.org">LEARN MORE</a>
					</div>
					<div className="shadow-gridbox rounded-[4px] bg-white p-6 h-full flex flex-col justify-between">
						<div>
							<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M41.6966 14.4252C43.1863 14.7718 44.54 15.5519 45.5868 16.667C46.1635 17.2705 46.6642 17.9422 47.0778 18.6672C47.0971 18.746 44.3933 20.5625 42.7536 21.5758C42.6941 21.616 42.4578 21.3587 42.1901 20.9632C41.8905 20.4483 41.4654 20.0178 40.9543 19.7117C40.4432 19.4057 39.8629 19.2342 39.2676 19.2132C37.3828 19.0837 36.1683 20.0707 36.1771 21.721C36.1608 22.1264 36.2533 22.5288 36.4448 22.8865C36.8596 23.744 37.6296 24.2585 40.0481 25.3068C44.5001 27.223 46.4111 28.4865 47.5906 30.282C48.2573 31.4165 48.6679 32.683 48.7937 33.9928C48.9194 35.3027 48.7573 36.6242 48.3186 37.8647C47.7157 39.2253 46.7596 40.3996 45.5496 41.2659C44.3396 42.1321 42.9198 42.6587 41.4376 42.791C39.862 42.9717 38.2701 42.9553 36.6986 42.742C34.2915 42.3465 32.074 41.1912 30.3706 39.445C29.727 38.7202 29.1821 37.9135 28.7501 37.0457C28.9317 36.9106 29.123 36.789 29.3223 36.6817C29.5988 36.5243 30.6453 35.9223 31.6323 35.35L33.4243 34.3L33.7988 34.846C34.4296 35.748 35.2325 36.5164 36.1613 37.107C37.0994 37.6215 38.162 37.8653 39.2305 37.8113C40.299 37.7572 41.3315 37.4073 42.2128 36.8007C42.6675 36.3576 42.9517 35.7687 43.0156 35.1371C43.0796 34.5055 42.9193 33.8715 42.5628 33.3462C42.0798 32.655 41.0928 32.074 38.2876 30.8577C36.0879 30.116 34.0844 28.8866 32.4268 27.2615C31.6375 26.3619 31.0545 25.3005 30.7188 24.1517C30.4706 22.8431 30.434 21.503 30.6103 20.1827C30.9397 18.6635 31.7281 17.2822 32.8688 16.226C34.0094 15.1698 35.4473 14.4899 36.9873 14.2783C38.5556 14.0909 40.1431 14.1404 41.6966 14.4252ZM27.0963 17.0205L27.1156 19.565H19.0131V42.574H13.2993V19.5702H5.19684V17.0712C5.17529 16.2154 5.19866 15.3591 5.26684 14.5057C5.29659 14.4655 10.2228 14.4462 16.1956 14.4567L27.0648 14.4865L27.0963 17.0205Z" fill="#4189DD"/>
							</svg>
							<h2 className="font-medium text-3xl mt-4">Typescript</h2>
							<p className="text-lg mt-4 max-w-[18rem] leading-[153%]">A strict syntactical superset of JavaScript and adds optional static typing to the language.</p>
						</div>
						<a className="text-blue-800 font-semibold mt-9 flex" href="https://www.typescriptlang.org">LEARN MORE</a>
					</div>
				</div>
			</div>
			<div className="px-8 sm:px-16 md:px-32 py-28 w-100">
				<h1 className="text-4xl md:text-5xl 2xl:px-72 font-semibold !leading-[129%] mb-8 mt-8 text-center" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
				Upgrade to <span className="text-blue-800">Premium</span> with affordable price
				</h1>
				<p className="text-center text-xl md:text-2xl mt-12">This is just a decoration. I don’t want your money.</p>
				<div className="mt-12 xl:mt-24 flex items-center justify-center flex-col xl:flex-row gap-6 xl:gap-0 ">
					<div className="rounded-r-lg xl:rounded-r-none rounded-l-lg bg-white p-6 w-full xl:w-96 shadow-default">
						<p className="font-medium text-2xl mt-4">Basic</p>
						<h2 className="text-blue-800 font-semibold text-7xl my-6">$9 <span className="text-blue-800 text-2xl">/ month</span></h2>
						<p className="text-lg">Wanna buy me a coffee in order for me to more projects?</p>
						<div className="py-6">
							<p className="flex text-blue-800 items-center text-lg font-semibold py-4">
								<svg className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.99997 15.586L6.70697 12.293L5.29297 13.707L9.99997 18.414L19.707 8.70697L18.293 7.29297L9.99997 15.586Z" fill="#4189DD"/>
								</svg>
								Make friends with me
							</p>
							<p className="flex text-blue-800 items-center text-lg font-semibold py-4">
								<svg className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.99997 15.586L6.70697 12.293L5.29297 13.707L9.99997 18.414L19.707 8.70697L18.293 7.29297L9.99997 15.586Z" fill="#4189DD"/>
								</svg>
								Tips of designing
							</p>
							<p className="flex text-blue-800 items-center text-lg font-semibold py-4">
								<svg className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.99997 15.586L6.70697 12.293L5.29297 13.707L9.99997 18.414L19.707 8.70697L18.293 7.29297L9.99997 15.586Z" fill="#4189DD"/>
								</svg>
								Some tutorials maybe
							</p>
						</div>
						<a className="w-full py-4 bg-blue-800 text-white rounded-lg flex justify-center text-center font-semibold text-xl white shadow-default">Get started</a>
					</div>
					<div className="bg-blue-800 rounded-lg p-6 w-full xl:w-[28rem] shadow-default">
						<div className="flex justify-end">
							<p className="block bg-white text-md px-8 py-2 rounded-full text-blue-800 font-semibold shadow-default">Popular</p>
						</div>
						<p className="text-white font-medium text-2xl mt-4">Professional</p>
						<h2 className="text-white font-semibold text-7xl my-6">$19 <span className="text-white text-2xl">/ month</span></h2>
						<p className="text-white text-lg border-white border-b-[1px] pb-6">This looks professional so you should definitely buy it for no reason :)</p>
						<div className="py-6 px-4">
							<p className="flex text-white items-center text-lg font-semibold py-4">
								<svg className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.99997 15.586L6.70697 12.293L5.29297 13.707L9.99997 18.414L19.707 8.70697L18.293 7.29297L9.99997 15.586Z" fill="#F6F5F7"/>
								</svg>
								Make friends with me
							</p>
							<p className="flex text-white items-center w-auto xl:text-lg font-semibold py-4">
								<svg className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.99997 15.586L6.70697 12.293L5.29297 13.707L9.99997 18.414L19.707 8.70697L18.293 7.29297L9.99997 15.586Z" fill="#F6F5F7"/>
								</svg>
								A small website
							</p>
							<p className="flex text-white items-center text-lg font-semibold py-4">
								<svg className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.99997 15.586L6.70697 12.293L5.29297 13.707L9.99997 18.414L19.707 8.70697L18.293 7.29297L9.99997 15.586Z" fill="#F6F5F7"/>
								</svg>
								A UI design service
							</p>
						</div>
						<a className="w-full py-4 bg-white rounded-lg flex justify-center text-center font-semibold text-xl text-blue-800 shadow-default">Get started</a>
					</div>
					<div className="rounded-l-lg xl:rounded-l-none bg-white rounded-r-lg p-6 w-full xl:w-96 shadow-default">
						<p className="font-medium text-2xl mt-4">Enterprise</p>
						<h2 className="text-blue-800 font-semibold text-7xl my-6">$59 <span className="text-blue-800 text-2xl">/ month</span></h2>
						<p className="text-lg">Are you still finding a way to spend your money? XD</p>
						<div className="py-6">
							<p className="flex text-blue-800 items-center text-lg font-semibold py-4">
								<svg className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.99997 15.586L6.70697 12.293L5.29297 13.707L9.99997 18.414L19.707 8.70697L18.293 7.29297L9.99997 15.586Z" fill="#4189DD"/>
								</svg>
								You’re my best friend
							</p>
							<p className="flex text-blue-800 items-center text-lg font-semibold py-4">
								<svg className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.99997 15.586L6.70697 12.293L5.29297 13.707L9.99997 18.414L19.707 8.70697L18.293 7.29297L9.99997 15.586Z" fill="#4189DD"/>
								</svg>
								2 large websites
							</p>
							<p className="flex text-blue-800 items-center text-lg font-semibold py-4">
								<svg className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.99997 15.586L6.70697 12.293L5.29297 13.707L9.99997 18.414L19.707 8.70697L18.293 7.29297L9.99997 15.586Z" fill="#4189DD"/>
								</svg>
								5 UI design service
							</p>
						</div>
						<a className="w-full py-4 bg-blue-800 text-white rounded-lg flex justify-center text-center font-semibold text-xl white shadow-default">Get started</a>
					</div>
				</div>
			</div>
			<div className="px-8 sm:px-16 md:px-32 1170:!px-32 py-28 w-100 bg-blue-700 flex flex-col lg:flex-row justify-between items-center gap-16 xl:gap-32">
				<div className="w-full flex-shrink-[9999] md:h-[500px]"><img src={img} className="w-full h-full mr-32 rounded-tr-[3rem] rounded-bl-[3rem] md:rounded-tr-[5rem] md:rounded-bl-[5rem] sm:min-w-[300px]"/></div>
				<div>
					<svg width="64" height="54" viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g filter="url(#filter0_d)">
							<path d="M7.90253 5.157C11.1284 1.73475 16.0098 0 22.4087 0H24.708V6.34275L22.8593 6.705C19.7093 7.3215 17.5181 8.53425 16.3455 10.314C15.7336 11.2728 15.3866 12.3706 15.3384 13.5H22.4087C23.0185 13.5 23.6033 13.7371 24.0345 14.159C24.4657 14.581 24.708 15.1533 24.708 15.75V31.5C24.708 33.9818 22.6455 36 20.1094 36H6.31373C5.70393 36 5.1191 35.7629 4.6879 35.341C4.2567 34.919 4.01446 34.3467 4.01446 33.75V22.5L4.02136 15.9323C4.00066 15.6825 3.5638 9.765 7.90253 5.157ZM45.4014 36H31.6058C30.996 36 30.4111 35.7629 29.9799 35.341C29.5487 34.919 29.3065 34.3467 29.3065 33.75V22.5L29.3134 15.9323C29.2927 15.6825 28.8558 9.765 33.1946 5.157C36.4205 1.73475 41.3018 0 47.7007 0H50V6.34275L48.1514 6.705C45.0014 7.3215 42.8102 8.53425 41.6375 10.314C41.0257 11.2728 40.6787 12.3706 40.6304 13.5H47.7007C48.3105 13.5 48.8954 13.7371 49.3266 14.159C49.7578 14.581 50 15.1533 50 15.75V31.5C50 33.9818 47.9375 36 45.4014 36Z" fill="#4189DD"/>
						</g>
						<defs>
							<filter id="filter0_d" x="0" y="0" width="54" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
								<feFlood floodOpacity="0" result="BackgroundImageFix"/>
								<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
								<feOffset dy="4"/>
								<feGaussianBlur stdDeviation="2"/>
								<feComposite in2="hardAlpha" operator="out"/>
								<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
								<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
								<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
							</filter>
						</defs>
					</svg>

					<h1 className="text-4xl xl:text-5xl font-semibold !leading-[129%] mb-8 mt-4" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
						A place where you will never want to leave
					</h1>
					<p className="text-lg xl:text-xl w-full !leading-[155.5%]">You can never doubt about the fact that most of the cruiseship are too luxury until you never wanna leave it. Tons of fancy facilities, lots of delicious foods... Aww damn that’s endless afterstate.</p>
					<p className="font-semibold text-xl mt-8">Melvin Chia, Founder of CG</p>
				</div>
			</div>
			<div className="px-8 sm:px-16 md:px-32 py-28 w-100 flex justify-between flex-col xl:flex-row">
				<div className="flex flex-col items-center xl:hidden lg:px-32 mb-12">
					<h1 className="text-4xl md:text-5xl font-semibold !leading-[129%] mb-8 mt-8 text-center xl:text-left" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
						Wanna build <span className="text-blue-800">projects</span> with me?
					</h1>
					<p className="text-lg md:text-xl mt-6 !leading-[155.5%] text-center">I’ll be really glad if somebody is willing to learn with me and make amazing projects at the mean time</p>
				</div>
				<div className="xl:bg-blue-800 xl:shadow-default xl:px-4 w-full rounded-lg contact relative z-10">
					<div className="bg-white w-full xl:h-[104%] xl:absolute xl:bottom-4 xl:left-4 xl:shadow-default rounded-lg xl:p-12">
						<form className="flex flex-col h-full">
							<label htmlFor="email" className="text-blue-800 font-semibold text-md xl:text-lg">Email</label>
							<input className="w-full bg-[#FDFDFD] shadow-form p-4 rounded-md mt-1 text-lg xl:text-xl" id="email" type="text" name="email" placeholder="johndoe@gmail.com"/>
							<label htmlFor="name" className="text-blue-800 font-semibold text-md xl:text-lg mt-8">Full Name</label>
							<input className="w-full bg-[#FDFDFD] shadow-form p-4 rounded-md mt-1 text-lg xl:text-xl" id="email" type="text" name="email" placeholder="John Doe"/>
							<label htmlFor="message" className="text-blue-800 font-semibold text-md xl:text-lg mt-8">Messages</label>
							<textarea className="w-full bg-[#FDFDFD] shadow-form p-4 rounded-md mt-1 text-lg xl:text-xl h-full min-h-[12rem] xl:min-h-auto" id="message" name="message" placeholder="Say something here"/>
							<button className='bg-blue-800 rounded-full text-white px-12 shadow-default inline-block mt-12 font-medium btn-anim2 whitespace-nowrap !w-full' data-text="SEND">{"LET'S GO".split("").map(e => <span className="text-white" key={e}>{e}</span>)}</button>
						</form>
					</div>
				</div>
				<div className="ml-32 max-w-[36rem] hidden xl:flex flex-col">
					<h1 className="text-4xl md:text-5xl font-semibold !leading-[129%] mb-8 mt-8" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
						Wanna make <span className="text-blue-800">projects</span> with me?
					</h1>
					<p className="text-lg md:text-xl mt-6 !leading-[155.5%]">I’ll be really glad if somebody is willing to learn with me and make amazing projects at the mean time</p>
					<img src={illu4} className="w-full"/>
				</div>
			</div>
		</>
	);
}
