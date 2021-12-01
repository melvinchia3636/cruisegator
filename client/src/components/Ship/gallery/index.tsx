/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import axios from "axios";
import { GalleryData, GalleryProps } from "./interface";
import { StateProps } from "state_manage/interface";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import { Icon } from "@iconify/react";
import outlineBrunchDining from "@iconify/icons-ic/outline-brunch-dining";
import vehicleShip24Regular from "@iconify-icons/fluent/vehicle-ship-24-regular";
import pedestrianFamily from "@iconify/icons-carbon/pedestrian-family";
import shiftsActivity24Filled from "@iconify-icons/fluent/shifts-activity-24-filled";
import spaIcon from "@iconify/icons-cil/spa";
import poolIcon from "@iconify/icons-cil/pool";
import bed16Regular from "@iconify-icons/fluent/bed-16-regular";
import outlineAnchor from "@iconify/icons-ic/outline-anchor";
import { ChevronLeft, ChevronRight } from "react-feather";
// @ts-ignore
import ReactPannellum from "react-pannellum";
import { Dispatch } from "redux";
import { setGalleryData } from "state_manage/actions";

const mapStateToProps = (state: StateProps) => {
	return {
		gallery_data: state.gallery_data,
		shipraw_data: state.shipraw_data
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		setGalleryData: (data: GalleryData[]) => dispatch(setGalleryData(data))
	};
};

const IconMap: {[key: string]: JSX.Element} = {
	"Restaurants And Bars": <Icon icon={outlineBrunchDining} width={36} className="text-blue-800"/>,
	"Family": <Icon icon={pedestrianFamily} width={36} className="text-blue-800" style={{strokeWidth: ".5px"}}/>,
	"The Ship": <Icon icon={vehicleShip24Regular} width={36} className="text-blue-800" style={{strokeWidth: ".5px"}}/>,
	"Activities And Events": <Icon icon={shiftsActivity24Filled} width={36} className="text-blue-800"/>,
	"Spa And Fitness": <Icon icon={spaIcon} width={36} className="text-blue-800" style={{strokeWidth: "8px"}}/>,
	"Pools And Sun Decks": <Icon icon={poolIcon} width={36} className="text-blue-800" style={{strokeWidth: "12px"}}/>,
	"Cabins": <Icon icon={bed16Regular} width={36} className="text-blue-800" style={{strokeWidth: "0.5px"}}/>,
	"Ports": <Icon icon={outlineAnchor} width={36} className="text-blue-800"/>,
};

const ConnectedGallery: React.FC<GalleryProps> = ({ gallery_data, ccid, setGalleryData }: GalleryProps): JSX.Element => {

	const [imageURL, setImageURL] = useState<{ url: string | string[]; id: number; type: any; }[]>([]);
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
	const [showImage, setShowImage] = useState<boolean>(false);

	const fetchAndShowImage = async (name: string, album_id: number, image_id: number): Promise<void> => {
		const request = await axios.get(`https://api.cruisegator.thecodeblog.net/ship/gallery/image/${ccid}/${name}-${album_id}/${name}--v${image_id}`).catch(() => null);
		const data = request && request?.data;
		setImageURL(data || {});
	};

	if (gallery_data.length === 0) {
		axios.get("https://api.cruisegator.thecodeblog.net/ship/gallery/index/"+ccid).then(res => {
			const data = res && res?.data;
			setGalleryData(data || {});
		}).catch(() => null);
	}

	const data = gallery_data === "no data" ? [] : gallery_data;

	return (
		<div className='p-10 w-full flex flex-col'>
			{data.map((e: GalleryData) => <div key={e.name} className="mb-24">
				<div className="flex items-center mb-5 w-full justify-center">
					{IconMap[e.name]}
					<h2 className="text-blue-800 text-[1.8em] font-medium ml-3 leading-tight">{e.name}</h2>
				</div>
				<div className="flex items-center">
					<div className="flex items-center gl w-full overflow-y-scroll no-scrollbar">
						{e.list.map(e => 
							<div key={e?.id} className="rounded-lg mx-2 w-96 flex-shrink-0 overflow-hidden relative">
								<LazyLoad 
									debounce={300}
									placeholder={<img src="https://via.placeholder.com/1000x800/BBBBBB/666666?text=%20"/>}
								>
									<img src={e.coverImage.format.replace("{width}x{height}_{ratio}", "x300_")} key={e.id} 
										className="w-full"/>
								</LazyLoad>
								<div className="w-full h-full absolute top-0 left-0 ic">
									<div className={"w-full bg-black bg-opacity-0 p-4 flex items-center transition-all duration-300 cursor-pointer justify-between h-16"} onClick={() => {
										setShowImage(true);
										fetchAndShowImage(e.name.toLowerCase().replaceAll(" ", "-"), e.id, e.coverImage.id);
										setCurrentImageIndex(0);
									}}>
										<h3 className={"!text-white text-xl max-w-[60%] overflow-ellipsis whitespace-nowrap !block overflow-hidden"}>{e?.name}</h3>
										<p className="!text-white text-sm">{e.totalMedia} photos</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>)}
			{showImage ? <div className="w-full h-full bg-black bg-opacity-90 fixed top-0 left-0 flex flex-col items-center justify-center z-[9999]" onClick={e => (e.target as HTMLElement).classList.contains("bg-black") ? (() => {
				setShowImage(false);
				setImageURL([]);
			})() : ""}>
				{imageURL.length > 0 ? <>
					<div className="flex items-center justify-center">
						<button className="p-5" onClick={() => currentImageIndex > 0 ? setCurrentImageIndex(currentImageIndex-1) : ""}><ChevronLeft color="white"/></button>
						{
							(() => {
								const image = imageURL[currentImageIndex];
								let component;
								switch (image?.type) {
								case "panorama": 
									component = <ReactPannellum
										id="panorama"
										className="!w-[75vw] !h-[75vh]"
										autoLoad={true}
										type="cubemap"
										cubeMap={imageURL[currentImageIndex].url}
									/>; 
									ReactPannellum.addScene("Scene"+image.id, {
										type: "cubemap",
										cubeMap: imageURL[currentImageIndex].url
									}, () => ReactPannellum.loadScene("Scene"+image.id));
									break;
								case "image": component = <img src={imageURL[currentImageIndex].url as string}/>; break;
								}
								return component;
							})()
						}
						<button className="p-5" onClick={() => currentImageIndex+1 < imageURL.length ? setCurrentImageIndex(currentImageIndex+1) : ""}><ChevronRight color="white"/></button>
					</div>
					<p className="text-white mt-4">{currentImageIndex+1} - {imageURL.length}</p>
				</>: ""}
			</div> : ""}
			<ReactPannellum
				id="panorama"
				className="hidden"
				autoLoad={true}
			/>
		</div>
	);
};

const gallery = connect(mapStateToProps, mapDispatchToProps)(ConnectedGallery);

export default gallery;