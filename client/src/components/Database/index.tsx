import React, { useState, useEffect } from "react";
import axios from "axios"; 
import * as assets from "./assets";

import { Icon } from "@iconify/react";
import baselineSearch from "@iconify-icons/ic/baseline-search";
import calendarMonthOutline from "@iconify-icons/mdi/calendar-month-outline";
import clockTimeEightOutline from "@iconify-icons/mdi/clock-time-eight-outline";
import timerSand from "@iconify-icons/mdi/timer-sand";
import accountGroupOutline from "@iconify-icons/mdi/account-group-outline";

const assetsMap = Object.fromEntries(Object.entries(assets));

export interface CruiseShipQuery {
	link:      string | null | undefined;
	image:     string | null | undefined;
	name:      string | null | undefined;
	lines:     string | null | undefined;
	cruise:    string | null | undefined;
	year:      string | null | undefined;
	age:       string | null | undefined;
	passenger: string | null | undefined;
}

export default function Database(): JSX.Element {
	const [data, setData] = useState<CruiseShipQuery[]>([]);
	const [loaded, setLoaded] = useState<boolean>(false);
	const [exist, setExist] = useState<boolean[]>();
	const query_params = new URLSearchParams(window.location.search);
	const page_num = parseInt(query_params.get("page") || "1");

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get("https://api.cruisegator.thecodeblog.net/database/list/"+page_num).catch(() => null);
			const data = await request && request?.data;
			
			setData(data);

			const local_exist: boolean[] = [];
			for (let i = 0; i <= 1; i++) {
				const request = await axios.get("https://cors-anywhere.thecodeblog.net/www.cruisemapper.com/ships?page="+((page_num+i)*2+1)).catch(err => console.log(err));
				local_exist.push(request ? request.status !== 404 : false);
			}
			console.log(local_exist);
			setExist(local_exist);

			setLoaded(true);
		}
		fetchData();
	}, [page_num]);

	return (
		<>
			<div className="w-full h-screen bg-blue-700 absolute top-0 left-0 px-32 flex-col flex justify-center">
				<h1 className="text-5xl xl:text-6xl font-semibold !leading-[129%]" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
				Search for your desired <span className="text-blue-800">cruiseship</span>
				</h1>
				<p className="text-xl xl:text-[1.6rem] !leading-[139%] my-8">We have data records for over 1400+ cruiseships in our database. Type the name of the cruiseship below to search for them.</p>
				<div className="bg-white p-6 flex items-center mt-4 rounded-md" style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"}}>
					<svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M24.4874 22.3485L32.5574 30.4185C32.841 30.7023 33.0003 31.0872 33.0002 31.4885C33 31.8898 32.8405 32.2746 32.5566 32.5582C32.2728 32.8419 31.8879 33.0012 31.4866 33.001C31.0853 33.0009 30.7005 32.8413 30.4169 32.5575L22.3469 24.4875C19.9344 26.356 16.9008 27.2353 13.8631 26.9465C10.8253 26.6577 8.01173 25.2225 5.9946 22.9329C3.97748 20.6433 2.90837 17.6712 3.00476 14.6213C3.10115 11.5714 4.35581 8.67277 6.51349 6.51509C8.67117 4.35741 11.5698 3.10275 14.6197 3.00636C17.6696 2.90997 20.6417 3.97908 22.9313 5.99621C25.2209 8.01333 26.6561 10.8269 26.9449 13.8647C27.2337 16.9024 26.3544 19.9361 24.4859 22.3485H24.4874ZM14.9999 24C17.3868 24 19.676 23.0518 21.3638 21.3639C23.0517 19.6761 23.9999 17.3869 23.9999 15C23.9999 12.613 23.0517 10.3238 21.3638 8.63602C19.676 6.94819 17.3868 5.99998 14.9999 5.99998C12.6129 5.99998 10.3237 6.94819 8.63592 8.63602C6.94809 10.3238 5.99988 12.613 5.99988 15C5.99988 17.3869 6.94809 19.6761 8.63592 21.3639C10.3237 23.0518 12.6129 24 14.9999 24Z" fill="#4189DD"/>
					</svg>
					<input type="text" placeholder="Type the ship name here" className="text-[1.4rem] ml-4 w-7/12"/>
					<div className="h-full w-[1px] bg-gray-400 mx-4"></div>
					<svg width="38" height="38" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M21.5 40.3125L10.1641 26.9435C10.0066 26.7428 9.85075 26.5408 9.69652 26.3375C7.76015 23.7868 6.71407 20.6712 6.71877 17.4688C6.71877 13.5485 8.27607 9.78885 11.0481 7.01683C13.8201 4.24481 17.5798 2.6875 21.5 2.6875C25.4202 2.6875 29.1799 4.24481 31.9519 7.01683C34.724 9.78885 36.2813 13.5485 36.2813 17.4688C36.286 20.6698 35.2404 23.7839 33.3049 26.3335L33.3035 26.3375C33.3035 26.3375 32.9004 26.8669 32.8399 26.9382L21.5 40.3125ZM11.8411 24.7183C11.8438 24.7183 12.1556 25.1322 12.2268 25.2208L21.5 36.1576L30.7853 25.2061C30.8444 25.1322 31.1589 24.7156 31.1602 24.7143C32.742 22.6302 33.5969 20.0851 33.5938 17.4688C33.5938 14.2613 32.3196 11.1852 30.0516 8.91718C27.7836 6.64916 24.7075 5.375 21.5 5.375C18.2926 5.375 15.2165 6.64916 12.9484 8.91718C10.6804 11.1852 9.40627 14.2613 9.40627 17.4688C9.40345 20.0867 10.2592 22.6333 11.8425 24.7183H11.8411Z" fill="#4189DD"/>
						<path d="M28.2188 24.1875H25.5312V13.4375H17.4688V24.1875H14.7812V13.4375C14.782 12.7249 15.0653 12.0418 15.5692 11.5379C16.073 11.0341 16.7562 10.7507 17.4688 10.75H25.5312C26.2438 10.7507 26.927 11.0341 27.4308 11.5379C27.9347 12.0418 28.218 12.7249 28.2188 13.4375V24.1875Z" fill="#4189DD"/>
						<path d="M20.1562 21.5H22.8438V24.1875H20.1562V21.5Z" fill="#4189DD"/>
						<path d="M20.1562 16.125H22.8438V18.8125H20.1562V16.125Z" fill="#4189DD"/>
					</svg>
					<select className="w-full text-[1.4rem] flex-shrink-[9999] ml-4 bg-white">
						<option value="Any cruise company ">Any cruise company</option>
					</select>
				</div>
				<a className='bg-blue-800 rounded-md text-white text-lg px-12 inline-block mt-4 font-medium btn-anim2 whitespace-nowrap' style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"}} data-text="FIND THE SHIP" href="https://github.com/melvinchia3636/cruisegator">{"WHERE IS THAT?".split("").map(e => <span className="text-white" key={e}>{e}</span>)}</a>
				<a className="absolute bottom-6 left-32 font-medium text-lg hidden 1170:flex">
					<svg className="mr-2 transform rotate-90" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 12H20" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M13 5L20 12L13 19" stroke="#4189DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
                Scroll Down
				</a>
			</div>
			{loaded ? <div className="px-32 mt-[100vh] pb-24">
				<div className="flex justify-between items-center">
					<p className="text-2xl font-medium">Displaying 1-15 of 1465 result(s)</p>
					<div className="flex gap-8">
						<button className="bg-blue-800 rounded-md shadow-default p-2">
							<svg width="32" height="32" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5.25 8.75V33.25H36.75V8.75H5.25ZM12.25 12.25V15.75H8.75V12.25H12.25ZM8.75 22.75V19.25H12.25V22.75H8.75ZM8.75 26.25H12.25V29.75H8.75V26.25ZM33.25 29.75H15.75V26.25H33.25V29.75ZM33.25 22.75H15.75V19.25H33.25V22.75ZM33.25 15.75H15.75V12.25H33.25V15.75Z" fill="#F6F5F7"/>
							</svg>
						</button>
						<button>
							<svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5 5V18.3333H18.3333V5H5ZM15 15H8.33333V8.33333H15V15ZM5 21.6667V35H18.3333V21.6667H5ZM15 31.6667H8.33333V25H15V31.6667ZM21.6667 5V18.3333H35V5H21.6667ZM31.6667 15H25V8.33333H31.6667V15ZM21.6667 21.6667V35H35V21.6667H21.6667ZM31.6667 31.6667H25V25H31.6667V31.6667Z" fill="#4189DD"/>
							</svg>
						</button>
					</div>
				</div>
				<div className='flex flex-col gap-4 mt-16'>
					{data.map(e => <div className="p-8 rounded-lg flex justify-between h-72 bg-white relative" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, .15)" }} key={e.name}>
						<div className="flex flex-col justify-between">
							<div className="flex items-center gap-4">
								<img src={assetsMap[e.lines?.toLowerCase().replace(/\s/g, "_")||"royal_caribbean"]} className="w-12 h-12"/>
								<div>
									<h2 className="text-3xl font-medium">{e.name}</h2>
									<p className="font-semibold text-blue-800">{e.lines}</p>
								</div>
							</div>
							<div className="flex flex-col gap-8">
								<p className="flex items-center gap-3 text-2xl font-medium"><Icon icon={calendarMonthOutline} width="36"/>{e.cruise}</p>
								<div className="flex gap-8">
									<div className="flex items-center gap-3">
										<Icon icon={clockTimeEightOutline} width="36"/>
										<div><p className="font-semibold text-gray-400 text-sm mb-1">Year built</p><p className="text-xl font-medium">{e.year}</p></div>
									</div>
									<div className="h-full w-[1px] bg-gray-200"></div>
									<div className="flex items-center gap-3">
										<Icon icon={timerSand} width="36"/>
										<div><p className="font-semibold text-gray-400 text-sm mb-1">Age</p><p className="text-xl font-medium">{e.age?.split(" ")[2] || "0"} years old</p></div>
									</div>
									<div className="h-full w-[1px] bg-gray-200"></div>
									<div className="flex items-center gap-3">
										<Icon icon={accountGroupOutline} width="36"/>
										<div><p className="font-semibold text-gray-400 text-sm mb-1">Passengers</p><p className="text-xl font-medium">{e.passenger}</p></div>
									</div>
								</div>
							</div>
						</div>
						<img src={e.image || ""} className="w-96 rounded-xl object-cover"/>
						<a className="absolute top-0 left-0 w-full h-full" href={"./ship/"+e.link}></a>
					</div>)}
				</div>
				<div className="flex items-center justify-center mt-12 text-xl">
					<button className="w-10 h-10 flex justify-center items-center">
						<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 15L2 8.5L8 2" stroke="#4189DD" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</button>
					{page_num-2>1 ? 
						<>
							<a className='mx-2 flex items-center justify-center w-10 h-10' href={"/database?page=1"} key='1'>1</a>
							<p className="w-10 h-10 flex items-center justify-center">...</p>
						</>
						: ""}
					{Array(2).fill(0).map((_, i) => i).reverse().map(i => {
						if (page_num-i-1 > 0) return <a className='mx-2 flex items-center justify-center w-10 h-10' href={`/database?page=${page_num-i-1}`} key={page_num-i-1}>{page_num-i-1}</a>;
						return "";
					})}
					<a className='mx-4 bg-blue-800 text-white flex items-center justify-center rounded-md w-10 h-10' href={`/database?page=${page_num}`} key={page_num}>{page_num}</a>
					{Array(2).fill(0).map((_, i) => {
						if ((exist || [0, 0])[i]) return <a className='mx-2 flex items-center justify-center w-10 h-10' href={`/database?page=${page_num+i+1}`} key={page_num+i+1}>{page_num+i+1}</a>;
						return "";
					})}
					{page_num+2<49 ? 
						<>
							<p className="w-10 h-10 flex items-center justify-center">...</p>
							<a className='mx-2 flex items-center justify-center w-10 h-10' href={"/database?page=49"} key='49'>49</a>
						</>
						: ""}
					<button className="w-10 h-10 flex justify-center items-center">
						<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M2 2L8 8.5L2 15" stroke="#4189DD" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</button>
				</div>
			</div> : ""}
		</>
	);
}