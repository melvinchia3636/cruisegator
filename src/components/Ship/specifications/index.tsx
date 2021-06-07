import settings28Regular from '@iconify-icons/fluent/settings-28-regular';
import Icon from '@iconify/react';
import info24Regular from '@iconify-icons/fluent/info-24-regular';

interface SpecificationsProps {
	id: string;
}

const Specifications: React.FC<SpecificationsProps> = ({ id }): JSX.Element => {
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
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Year built</div>
						<div>2021</div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Builder</div>
						<div>Meyer Werft (Papenburg, Germany)</div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Class</div>
						<div>Quantum-Ultra</div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Building cost</div>
						<div>EUR 750 million (USD 940 million)</div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Owner</div>
						<div>Royal Caribbean Cruises Ltd</div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Operator</div>
						<div>Royal Caribbean International</div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Speed</div>
						<div>22 kn / 41 kph / 25 mph</div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Length(LOA)</div>
						<div>347 m / 1138 ft</div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Beam(width)</div>
						<div>49 m / 161 ft</div>
					</div>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>Gross Tonnage</div>
						<div>169300 gt</div>
					</div>
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

export default Specifications