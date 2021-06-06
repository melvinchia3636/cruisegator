import * as constants from '../constants'

const initialState = {
	current_tab: 0,
	overview_data: {}
};
  
function tabReducer(state = initialState, action: any) {
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
	return state;
  };
  
export default tabReducer;