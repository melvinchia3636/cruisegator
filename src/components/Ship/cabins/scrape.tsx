/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import store from "../../../state_manage/store";
import { setCabinsData } from "state_manage/actions";

const getData  = (): void => {
	const { shipraw_data } = store.getState();
	const html: Document = shipraw_data[2];
	console.log(html.querySelectorAll(".portlet-body .portlet"));
	store.dispatch(setCabinsData({
		"lol": "this is a test"
	}));
};

export { getData };