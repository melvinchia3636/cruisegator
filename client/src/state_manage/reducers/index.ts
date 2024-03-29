/* eslint-disable @typescript-eslint/default-param-last */
import { AnyAction } from 'redux';
import * as constants from '../constants';
import { StateProps } from '../interface';

const initialState: StateProps = {
  current_tab: 0,
  shipraw_data: new Document(),
  overview_data: {
    is_new: false,
    location: '',
    coordinates: '',
    destination: '',
    last_ais_report: {
      status: 'red',
      text: '',
    },
    speed: {
      knot: '',
      kmph: [],
    },
    position: {
      lon: 0,
      lat: 0,
    },
    rating: 0,
    homeports: [],
  },
  specification_data: {
    service_info: {},
    interesting_fact: {},
    specification_data: {},
  },
  itineraries_data: [],
  cabins_data: [],
  gallery_data: [],
  deck_plans_data: {},
};

function Reducer(state = initialState, action: AnyAction): StateProps {
  if (action.type === constants.CHANGE_TAB) {
    return { ...state, current_tab: action.payload };
  }
  if (action.type === constants.SET_OVERVIEW_DATA) {
    return { ...state, overview_data: action.payload };
  }
  if (action.type === constants.SET_SHIPRAW_DATA) {
    return { ...state, shipraw_data: action.payload };
  }
  if (action.type === constants.SET_SPECIFICATION_DATA) {
    return { ...state, specification_data: action.payload };
  }
  if (action.type === constants.SET_ITINERARIES_DATA) {
    return { ...state, itineraries_data: action.payload };
  }
  if (action.type === constants.SET_CABINS_DATA) {
    return { ...state, cabins_data: action.payload };
  }
  if (action.type === constants.SET_GALLERY_DATA) {
    return { ...state, gallery_data: action.payload };
  }
  if (action.type === constants.SET_DECK_PLANS_DATA) {
    return { ...state, deck_plans_data: action.payload };
  }
  return state;
}

export default Reducer;
