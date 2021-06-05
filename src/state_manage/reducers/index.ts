import { CHANGE_TAB } from '../constants'

const initialState = {
	current_tab: 0
};
  
function tabReducer(state = initialState, action: any) {
	if (action.type === CHANGE_TAB) {
		return Object.assign({}, state, {
			current_tab: action.payload
		})
	}
	return state;
  };
  
export default tabReducer;