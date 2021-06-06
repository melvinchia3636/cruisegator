import * as constants from '../constants'

export function changeTab(payload: number) {
	return { type: constants.CHANGE_TAB, payload }
};

export function setOverviewData(payload: any) {
	return {type: constants.SET_OVERVIEW_DATA, payload}
}