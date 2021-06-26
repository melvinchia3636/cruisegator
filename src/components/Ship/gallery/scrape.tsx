/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import store from "../../../state_manage/store";
import { setGalleryData } from "state_manage/actions";
import { GalleryData } from "./interface";

const getData  = (): void => {
	const { shipraw_data } = store.getState();
	const html: Document = shipraw_data[3];
	const rawData: {[key: string]: any} = JSON.parse(html.getElementById("__NEXT_DATA__")?.innerHTML || "[]").props.pageProps.apolloState;
	console.log(rawData);
	const sectionID = Object.keys(rawData).filter(e => e.match(/Section:\d*?$/));
	const sectionData = sectionID.map((e: string) => ({
		name: rawData[e].name,
		id: rawData[e].albums.id
	}));
	const albumIDList = sectionData.map(({name, id}) => ({
		name, 
		list: rawData[id].results.map((e: {[key: string]: any}) => e.id)
	}));
	const albumList: GalleryData[] = albumIDList.map(({name, list}) => ({
		name,
		list: list.map((e: string) => {
			const getCoverImage = (imageID: string) => {
				const {id, format} = rawData[imageID];
				return {id, format};
			};
			const {id, name, totalMedia, primaryImage} = rawData[e];
			if (!primaryImage?.id) return;
			const coverImage = getCoverImage(primaryImage.id);
			return {
				id, name, totalMedia, coverImage
			};
		}).filter((e:any) => e)
	}));
	const result: GalleryData[] = albumList;
	store.dispatch(setGalleryData(result.length !== 0 ? result : "no data"));
};

export { getData };