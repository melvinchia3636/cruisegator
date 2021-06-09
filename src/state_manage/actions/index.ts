import * as constants from '../constants'

export function changeTab(payload: number) {
	return { type: constants.CHANGE_TAB, payload }
};

export function setShiprawData(payload: Document[]) {
	return {type: constants.SET_SHIPRAW_DATA, payload}
}

export function setOverviewData(payload: any) {
	return {type: constants.SET_OVERVIEW_DATA, payload}
}

export function setSpecificationData(payload: any) {
	return {type: constants.SET_SPECIFICATION_DATA, payload}
}