import './style.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';  

import { Icon, InlineIcon } from '@iconify/react';
import baselineSearch from '@iconify-icons/ic/baseline-search';
import calendarMonthOutline from '@iconify-icons/mdi/calendar-month-outline';
import clockTimeEightOutline from '@iconify-icons/mdi/clock-time-eight-outline';
import timerSand from '@iconify-icons/mdi/timer-sand';
import accountGroupOutline from '@iconify-icons/mdi/account-group-outline';

export default function Database(): JSX.Element {
	const [data, setData] = useState<any[]>();
	const [exist, setExist] = useState<boolean[]>()
	const query_params = new URLSearchParams(window.location.search);
	const page_num = parseInt(query_params.get('page') || '1');

	useEffect(() => {
		async function fetchData() {
				let result: any[] = [];

				for (let i = page_num*2-1; i <= page_num*2; i++) {
					const request = await axios.get('https://codeblog-corsanywhere.herokuapp.com/https://www.cruisemapper.com/ships?page='+i).catch(err => null)
					if (request && request.status == 404) break
					const data = await request && request?.data
					const dom_parser = new DOMParser()
					const html = dom_parser.parseFromString(data, 'text/html')
					result.push(Array.from(html.querySelector('.shipList')?.querySelectorAll('.shipListItem') || []).map(data => {
						const raw = data.querySelectorAll('table td:last-child')
						const second = Array(2).fill(0).map((_, i) => (raw[i].textContent || '/').split('/').map(e => e.trim())).flat()
						return {
							link: (()=>{const a=data.querySelector('a')?.href.split('/') as string[]; return a[a.length-1]})(),
							image: 'https://www.cruisemapper.com/'+data.querySelector('img')?.src.replace('http://localhost:3000', ''),
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
					local_exist.push(request ? request.status != 404 : false)
				}
				setExist(local_exist)
		}
		fetchData()
	}, [])

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
			<div className='w-100 d-grid mt-5 position-relative'>
				{!data || (data?.length || 0 > 0) ? (data || []).map(e =>
				<div className='w-100 overflow-hidden' style={{boxShadow: '0 0 2px rgba(0, 0, 0, 0.7)', borderRadius: '.4em', maxHeight: '192px'}}>
					<a href={'/ship/'+e.link}><img src={e.image} className='mw-100' height='192' width='400'/></a>
					<div className='d-flex flex-column mx-3 justify-content-center'>
						<div className='w-100 d-flex justify-content-between align-items-center'>
							<a href={'/ship/'+e.link} className='text-decoration-none'><h3 className='text-primary fw-bold mb-0'>{e.name}</h3></a>
							{/*<div className='d-flex' style={{height: 'min-content'}}>
								<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
								<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
								<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
								<span className='border border-primary d-block border-2 rounded-pill bg-primary'></span>
								<span className='border border-primary d-block border-2 rounded-pill'></span>
							</div>*/}
						</div>
						<p className='st fw-normal mb-0'>{e.lines}</p>
						<div className='mt-3'>
							<p className='m-0 mb-2 d-flex align-items-center'><Icon width="18" className="me-2" color="rgba(0, 85, 185, 1)" icon={calendarMonthOutline}/>{e.cruise}</p>
							<p className='m-0 my-2 d-flex align-items-center'><Icon width="18" className="me-2" color="rgba(0, 85, 185, 1)" icon={clockTimeEightOutline}/>{e.year}</p>
							<p className='m-0 my-2 d-flex align-items-center'><Icon width="18" className="me-2" color="rgba(0, 85, 185, 1)" icon={timerSand}/>{e.age}</p>
							<p className='m-0 mt-2 d-flex align-items-center'><Icon width="18" className="me-2" color="rgba(0, 85, 185, 1)" icon={accountGroupOutline}/>{e.passenger}</p>
						</div>
					</div>
				</div>) : <h5 className='text-center position-absolute start-50 translate-middle-x'>No data to be shown</h5>}
			</div>
			{data?.length || 0 > 0 ? <div className='w-100 d-flex justify-content-between mt-5 pg'>
				<a></a>
				<div className='d-flex fw-bold align-items-center'>
					{Array(2).fill(0).map((_, i) => i).reverse().map(i => {
						if (page_num-i-1 > 0) return <a className='mx-2 text-decoration-none text-secondary d-flex align-items-center justify-content-center' href={`/database?page=${page_num-i-1}`}>{page_num-i-1}</a>
						return
					})}
					<a className='mx-4 text-decoration-none bg-primary text-white d-flex align-items-center justify-content-center rounded-circle'>{page_num}</a>
					{Array(2).fill(0).map((_, i) => {
						if ((exist || [0, 0])[i]) return <a className='mx-2 text-decoration-none text-secondary d-flex align-items-center justify-content-center' href={`/database?page=${page_num+i+1}`}>{page_num+i+1}</a>
						return
					})}
				</div>
				<a></a>
			</div> : ''}
		</div>
	)
}