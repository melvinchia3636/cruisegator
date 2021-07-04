/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useRef } from "react";
import axios from "axios";
import { GalleryData, GalleryProps } from "./interface";
import { StateProps } from "state_manage/interface";
import { getData, fetchImageData } from "./scrape";
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

const mapStateToProps = (state: StateProps) => {
	return {
		gallery_data: state.gallery_data,
		shipraw_data: state.shipraw_data
	};
};

const IconMap: {[key: string]: JSX.Element} = {
	"Restaurants And Bars": <Icon icon={outlineBrunchDining} width={30} className="text-blue-800"/>,
	"Family": <Icon icon={pedestrianFamily} width={30} className="text-blue-800" style={{stroke: "rgba(0, 85, 185)", strokeWidth: ".5px"}}/>,
	"The Ship": <Icon icon={vehicleShip24Regular} width={30} className="text-blue-800" style={{stroke: "rgba(0, 85, 185)", strokeWidth: ".5px"}}/>,
	"Activities And Events": <Icon icon={shiftsActivity24Filled} width={30} className="text-blue-800"/>,
	"Spa And Fitness": <Icon icon={spaIcon} width={30} className="text-blue-800" style={{stroke: "rgba(0, 85, 185)", strokeWidth: "8px"}}/>,
	"Pools And Sun Decks": <Icon icon={poolIcon} width={30} className="text-blue-800" style={{stroke: "rgba(0, 85, 185)", strokeWidth: "12px"}}/>,
	"Cabins": <Icon icon={bed16Regular} width={30} className="text-blue-800" style={{stroke: "rgba(0, 85, 185)", strokeWidth: "0.5px"}}/>,
	"Ports": <Icon icon={outlineAnchor} width={30} className="text-blue-800"/>,
};

const ConnectedGallery: React.FC<GalleryProps> = ({ gallery_data, shipraw_data, ccid }: GalleryProps): JSX.Element => {

	const [imageURL, setImageURL] = useState<{ url: string | string[]; id: number; type: any; }[]>([]);
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
	const [showImage, setShowImage] = useState<boolean>(false);

	const fetchAndShowImage = async (name: string, album_id: number, image_id: number): Promise<void> => {
		const response = await axios(`https://codeblog-corsanywhere.herokuapp.com/https://www.cruisecritic.com/photos/ships/${ccid}/${name}-${album_id}/${name}--v${image_id}`).catch(err => console.log(err));
		if (response) setImageURL(fetchImageData(response.data));
		return;
	};

	if (gallery_data.length === 0 && shipraw_data[3] && shipraw_data[3].querySelector("p")?.textContent !== "none") {
		getData();
	}

	const data = gallery_data === "no data" ? [] : gallery_data;
	const panorama = useRef();

	return (
		<div className='p-20 w-full flex flex-col'>
			<div className='mb-10'>
				<h1 className='uppercase'>Photos & Images</h1>
				<div className='w-20 h-1 mt-1 bg-blue-800'></div>
			</div>
			<div>
				{data.map((e: GalleryData) => <div key={e.name} className="mb-24">
					<div className="flex items-center mb-5">
						{IconMap[e.name]}
						<h2 className="text-blue-800 text-[1.8em] font-medium ml-3">{e.name}</h2>
					</div>
					<div className="grid grid-cols-3 gap-4">
						{e.list.map(e => 
							<div key={e?.id} className="rounded-lg overflow-hidden relative" onMouseEnter={e => null} onMouseLeave={() => null}>
								<LazyLoad 
									debounce={300}
									placeholder={<img src="https://via.placeholder.com/1000x800/BBBBBB/666666?text=%20"/>}
								>
									<img src={e.coverImage.format.replace("{width}x{height}_{ratio}", "x300_")} key={e.id} 
										className="w-full"/>
								</LazyLoad>
								<div className="w-full h-full absolute top-0 left-0 ic">
									<div className={"absolute bottom-0 left-0 bg-black bg-opacity-70 w-full p-4 flex items-center transition-all duration-300 cursor-pointer justify-between h-16"} onClick={() => {
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
				</div>)}
			</div>
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

const gallery = connect(mapStateToProps)(ConnectedGallery);

export default gallery;