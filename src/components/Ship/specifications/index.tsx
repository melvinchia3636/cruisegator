import { connect } from "react-redux";
import Icon from '@iconify/react';
import settings28Regular from '@iconify-icons/fluent/settings-28-regular';
import searchVisual24Regular from '@iconify-icons/fluent/search-visual-24-regular';
import info24Regular from '@iconify-icons/fluent/info-24-regular';
import { setSpecificationData } from "state_manage/actions";

interface SpecificationsProps {
	id: string;
	shipraw_data: Document[];
	overview_data: any;
	specification_data: {
		specification_data: string[],
		service_info: object,
		interesting_fact: object
	},
	setSpecificationData: any
}

const mapStateToProps = (state: any) => {
	return {
		shipraw_data: state.shipraw_data,
		specification_data: state.specification_data,
		overview_data: state.overview_data
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		setSpecificationData: (specification_data: {
			specifications_data: string[],
			service_info: any[],
			interesting_fact: object
		}) => dispatch(setSpecificationData(specification_data))
	}
}

const ConnectedSpecifications: React.FC<SpecificationsProps> = ({ id, shipraw_data, overview_data, specification_data, setSpecificationData }): JSX.Element => {
	const objectMap = (obj: Object, fn: Function) =>
		Object.entries(obj).map(
			([k, v], i) => fn(k, v)
		);

	const getServiceInfoComponent = (value: number | boolean): JSX.Element => {
		let result: JSX.Element = <></>;
		switch (typeof value) {
			case 'number': result = <span>{value}</span>; break;
			case 'boolean': result = <span className={'border border-primary d-block border-2 rounded-pill '+(value ? 'bg-primary' : '')}></span>
		};
		return result;
	}

	const getMoreInfo = (id: string): object => {
		let result: object;
		switch (overview_data.company) {
			case 'Royal Caribbean': {
				const data = require('./data/royal_caribbean.ts').default;
				result = data[id]; break;
			};
			default: result = {};
		}
		return result;
	};
	
	const getData  = async () => {
		if (JSON.stringify(specification_data) !== '{}') return
		const [html]: Document[] = shipraw_data
		const specification_data_current: string[][] = Array.from(html.querySelectorAll('.specificationTable')).map(e => Array.from(e.querySelectorAll('tr')).map(e => e.querySelectorAll('td'))).flat().map(e => Array.from(e).map(e => e.textContent?.trim() || ''))
		const splitted_id: string[] = id.split('-');
		const splitted_id_nonum: string = splitted_id.slice(0, splitted_id.length-1).join(' ');
		const more_info: object = getMoreInfo(splitted_id_nonum);
		const result = {
			specification_data: specification_data_current,
			...more_info
		}
		setSpecificationData(result)
	};

	getData();

	return (
		<div className='p-5 w-100 d-flex flex-column'>
			<div className='mb-5'>
				<h1 className='text-uppercase mt-4'>Specifications</h1>
				<div className='seperator btn-primary'></div>
			</div>
			<div style={{ marginBottom: '6rem' }} className='mt-4'>
				<div className="d-flex align-items-center mb-4">
					<Icon icon={settings28Regular} width='32' className='me-2' color='rgba(0, 85, 185, 1)'/>
					<h2 className="fs-3 fw-normal m-0 text-primary text-up">Ship Specifications</h2>
				</div>
				<div className='st'>
					{JSON.stringify(specification_data) !== '{}' ? specification_data.specification_data.map(([k, v]) => 
						<div className="d-flex justify-content-between align-items-center py-3">
							<div>{k}</div>
							<div>{v}</div>
						</div>
					) : ''}
				</div>
			</div>
			<div style={{ marginBottom: '6rem' }}>
				<div className="d-flex align-items-center mb-4">
					<Icon icon={info24Regular} width='32' className='me-2' color='rgba(0, 85, 185, 1)'/>
					<h2 className="fs-3 fw-normal m-0 text-primary text-up">Service Informations</h2>
				</div>
				<div className='st'>
					{specification_data.service_info ? objectMap(specification_data.service_info, (k: string, v: boolean | number) => 
						<div className="d-flex justify-content-between align-items-center py-3">
							<div>{k}</div>
							<div>{getServiceInfoComponent(v)}</div>
						</div>
					) : ''}
				</div>
			</div>
			<div>
				<div className="d-flex align-items-center mb-4">
					<Icon icon={searchVisual24Regular} width='32' className='me-2' color='rgba(0, 85, 185, 1)'/>
					<h2 className="fs-3 fw-normal m-0 text-primary text-up">Interesting Facts</h2>
				</div>
				<div className='st'>
					{specification_data.interesting_fact ? objectMap(specification_data.interesting_fact, (k: string, v: object) => 
						<><h3 className="fs-4 fw-normal m-0 text-dark text-up mb-2 mt-5">{k}</h3>
						{objectMap(v, (k: string, v: boolean | number) => 
							<div className="d-flex justify-content-between align-items-center py-3">
								<div>{k}</div>
								<div>{getServiceInfoComponent(v)}</div>
							</div>
						)}</>
					) : ''}
				</div>
			</div>
		</div>
	)
}

const Specifications = connect(mapStateToProps, mapDispatchToProps)(ConnectedSpecifications)

export default Specifications