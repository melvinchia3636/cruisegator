import { connect } from "react-redux";
import { getData } from './scrape'
import { ItinerariessProps } from './interface'
import { StateProps } from '../../../state_manage/interface'

const mapStateToProps = (state: StateProps) => {
	return {
		itineraries_data: state.itineraries_data,
		shipraw_data: state.shipraw_data
	}
}

const ConnectedItinerariess: React.FC<ItinerariessProps> = ({ id, itineraries_data, shipraw_data }): JSX.Element => {

	if (JSON.stringify(itineraries_data) === '{}' && shipraw_data[1]) getData(id);

	return (
		<div className='p-20 w-full flex flex-col'>
			<div className='mb-10'>
				<h1 className='uppercase mt-10'>Itinerariess</h1>
				<div className='w-20 h-1 mt-1 bg-blue-800'></div>
			</div>
			<pre>
				<code>
				{JSON.stringify(itineraries_data, null, 4)}
				</code>
			</pre>
		</div>
	)
}

const Itinerariess = connect(mapStateToProps)(ConnectedItinerariess)

export default Itinerariess