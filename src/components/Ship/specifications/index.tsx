import { connect } from "react-redux";
import settings28Regular from '@iconify-icons/fluent/settings-28-regular';
import Icon from '@iconify/react';
import info24Regular from '@iconify-icons/fluent/info-24-regular';
import { setSpecificationData } from "state_manage/actions";

interface SpecificationsProps {
	id: string;
	shipraw_data: Document,
	specification_data: string[],
	setSpecificationData: any
}

const mapStateToProps = (state: any) => {
	return {
		shipraw_data: state.shipraw_data,
		specification_data: state.specification_data
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		setSpecificationData: (specification_data: string[]) => dispatch(setSpecificationData(specification_data))
	}
}

const ConnectedSpecifications: React.FC<SpecificationsProps> = ({ id, shipraw_data, specification_data, setSpecificationData }): JSX.Element => {
	const getData  = async () => {
		if (specification_data.length > 0) return
		const html: Document = shipraw_data
		setSpecificationData(Array.from(html.querySelectorAll('.specificationTable')).map(e => Array.from(e.querySelectorAll('tr')).map(e => e.querySelectorAll('td'))).flat().map(e => Array.from(e).map(e => e.textContent?.trim())))
	};

	if (shipraw_data.toString() !== '') getData();
	console.log(specification_data)

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
					{specification_data.length > 0 ? specification_data.map(([k, v]) => 
						<div className="d-flex justify-content-between align-items-center py-3">
							<div>{k}</div>
							<div>{v}</div>
						</div>
					) : ''}
				</div>
			</div>
			<div>
				<div className="d-flex align-items-center mb-4">
					<Icon icon={info24Regular} width='32' className='me-2' color='rgba(0, 85, 185, 1)'/>
					<h2 className="fs-3 fw-normal m-0 text-primary text-up">Service Informations</h2>
				</div>
				<div className='st'>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Bars and Lounge</div>
						<div><span className='border border-primary d-block border-2 rounded-pill'></span></div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Cinema</div>
						<div><span className='border border-primary d-block border-2 rounded-pill'></span></div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Restaurants</div>
						<div>8</div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Library</div>
						<div><span className='border border-primary d-block border-2 rounded-pill'></span></div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Spa</div>
						<div><span className='border border-primary d-block border-2 rounded-pill bg-primary'></span></div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Internet Access</div>
						<div><span className='border border-primary d-block border-2 rounded-pill bg-primary'></span></div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Showroom</div>
						<div><span className='border border-primary d-block border-2 rounded-pill'></span></div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Casino</div>
						<div><span className='border border-primary d-block border-2 rounded-pill bg-primary'></span></div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Jacuzzi</div>
						<div><span className='border border-primary d-block border-2 rounded-pill'></span></div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Shops</div>
						<div><span className='border border-primary d-block border-2 rounded-pill bg-primary'></span></div>
					</div>
				</div>
			</div>
		</div>
	)
}

const Specifications = connect(mapStateToProps, mapDispatchToProps)(ConnectedSpecifications)

export default Specifications