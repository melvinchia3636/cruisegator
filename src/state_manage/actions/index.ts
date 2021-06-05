import { CHANGE_TAB } from '../constants'

export function changeTab(payload: any) {
	return { type: CHANGE_TAB, payload }
};