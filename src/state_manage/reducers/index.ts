import * as constants from '../constants'

const initialState = {
	current_tab: 0,
	shipraw_data: '',
	overview_data: {},
	specification_data: {}
};
  
function Reducer(state = initialState, action: any) {
	if (action.type === constants.CHANGE_TAB) {
		return Object.assign({}, state, {
			current_tab: action.payload
		})
	}
	if (action.type === constants.SET_OVERVIEW_DATA) {
		return Object.assign({}, state, {
			overview_data: action.payload
		})
	}
	if (action.type === constants.SET_SHIPRAW_DATA) {
		return Object.assign({}, state, {
			shipraw_data: action.payload
		})
	}
	if (action.type === constants.SET_SPECIFICATION_DATA) {
		return Object.assign({}, state, {
			specification_data: action.payload
		})
	}
	return state;
  };
  
export default Reducer;