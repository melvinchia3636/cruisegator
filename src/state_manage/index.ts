import store from "./store";
import { changeTab } from "./actions";

declare global {
    interface Window {
        store: any;
		changeTab: any
    }
}

window.store = store;
window.changeTab = changeTab;
