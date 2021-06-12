import { useState, useEffect } from 'react';
import axios from 'axios';  

import { Icon } from '@iconify/react';
import baselineSearch from '@iconify-icons/ic/baseline-search';
import calendarMonthOutline from '@iconify-icons/mdi/calendar-month-outline';
import clockTimeEightOutline from '@iconify-icons/mdi/clock-time-eight-outline';
import timerSand from '@iconify-icons/mdi/timer-sand';
import accountGroupOutline from '@iconify-icons/mdi/account-group-outline';

export default function Database(): JSX.Element {
	const [data, setData] = useState<any[]>(['']);
	const [exist, setExist] = useState<boolean[]>()
	const query_params = new URLSearchParams(window.location.search);
	const page_num = parseInt(query_params.get('page') || '1');

	useEffect(() => {
		async function fetchData() {
				let result: any[] = [];

				for (let i = page_num*2-1; i <= page_num*2; i++) {
					const request = await axios.get('https://codeblog-corsanywhere.herokuapp.com/https://www.cruisemapper.com/ships?page='+i).catch(err => null)
					if (request && request.status === 404) break
					const data = await request && request?.data
					const dom_parser = new DOMParser()
					const html = dom_parser.parseFromString(data, 'text/html')
					result.push(Array.from(html.querySelector('.shipList')?.querySelectorAll('.shipListItem') || []).map(data => {
						const raw = data.querySelectorAll('table td:last-child')
						const second = Array(2).fill(0).map((_, i) => (raw[i].textContent || '/').split('/').map(e => e.trim())).flat()
						return {
							link: (()=>{const a=data.querySelector('a')?.href.split('/') as string[]; return a[a.length-1]})(),
							image: 'https://www.cruisemapper.com/'+data.querySelector('img')?.src.replace(window.origin, ''),
							name: data.querySelector('a[rel="bookmark"]')?.textContent,
							lines: data.querySelector('.labelCategory')?.textContent,
							cruise: data.querySelector('.cruiseTitle')?.textContent,
							...Object.fromEntries((['year', 'age', 'passenger']).map((e, i) => [e, second[i]]))
						}
					}))
				}
				setData(result.flat())

				let local_exist: boolean[] = []
				for (let i = 0; i <= 1; i++) {
					const request = await axios.get('https://codeblog-corsanywhere.herokuapp.com/https://www.cruisemapper.com/ships?page='+((page_num+i)*2)).catch(err => {throw err})
					local_exist.push(request ? request.status !== 404 : false)
				}
				setExist(local_exist)
		}
		fetchData()
	}, [page_num])

	return (
		<div className='w-full p-20'>
			<div className='w-full flex items-center justify-center flex-col mt-16'>
			<h1 className='fw-normal text-center text-nowrap text-5xl font-poppins'>Cruiseship Database</h1>
			<div className='w-20 h-1 mt-6 bg-blue-800'></div>
				<div className='w-1/2 flex rounded-full items-center px-3 my-10' style={{boxShadow: '0 0 2px rgba(0, 0, 0, 0.7)'}}>
					<Icon icon={baselineSearch} width="24" color="#808080"/>
					<input type='text' placeholder='Search for cruiseships in database' className='w-full p-2 border-0 rounded-full'></input>
				</div>
			</div>
			<div className='w-full grid grid-cols-2 mt-5 position-relative gap-8'>
				{data.length > 1 ? data.map(e =>
				<div className='w-full overflow-hidden grid rounded-xl shadow-md' style={{gridTemplateColumns: '40% 60%'}}>
					<a href={'/ship/'+e.link}><img src={e.image} className='w-full object-cover h-full' alt={e.name}/></a>
					<div className='flex flex-col mx-6 justify-center py-3'>
						<div className='w-full flex justify-between align-center'>
							<a href={'/ship/'+e.link} className='text-decoration-none'><h3 className='text-blue-800 font-medium font-poppins mb-0 text-2xl'>{e.name}</h3></a>
						</div>
						<p className='st fw-normal mb-0'>{e.lines}</p>
						<div className='mt-3'>
							<p className='m-0 mb-2 flex align-center'><Icon width="18" className="mr-4 mt-0.5" color="rgba(0, 85, 185, 1)" icon={calendarMonthOutline}/><span className='whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[calc(100%+2.5rem)]'>{e.cruise}</span></p>
							<p className='m-0 my-2 flex align-center'><Icon width="18" className="mr-4 mt-0.5" color="rgba(0, 85, 185, 1)" icon={clockTimeEightOutline}/>{e.year}</p>
							<p className='m-0 my-2 flex align-center'><Icon width="18" className="mr-4 mt-0.5" color="rgba(0, 85, 185, 1)" icon={timerSand}/>{e.age}</p>
							<p className='m-0 mt-2 flex align-center'><Icon width="18" className="mr-4 mt-0.5" color="rgba(0, 85, 185, 1)" icon={accountGroupOutline}/>{e.passenger}</p>
						</div>
					</div>
				</div>) : (!(JSON.stringify(data) === JSON.stringify([''])) ? 
					<h5 className='text-center position-absolute start-50 translate-middle-x'>No data to be shown</h5> : '')
				}
			</div>
			{data.length > 1 ? <div className='w-full flex justify-center mt-12 pg'>
				<div className='flex font-bold items-center text-gray-500 font-poppins'>
					{Array(2).fill(0).map((_, i) => i).reverse().map(i => {
						if (page_num-i-1 > 0) return <a className='mx-2 flex items-center justify-center w-10 h-10' href={`/database?page=${page_num-i-1}`}>{page_num-i-1}</a>
						return ''
					})}
					<a className='mx-4 bg-blue-800 text-white flex items-center justify-center rounded-full w-10 h-10' href={`/database?page=${page_num}`}>{page_num}</a>
					{Array(2).fill(0).map((_, i) => {
						if ((exist || [0, 0])[i]) return <a className='mx-2 flex items-center justify-center w-10 h-10' href={`/database?page=${page_num+i+1}`}>{page_num+i+1}</a>
						return ''
					})}
				</div>
			</div> : ''}
		</div>
	)
}