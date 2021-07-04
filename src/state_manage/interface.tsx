import { SpecificationData } from "../components/Ship/specifications/interface";
import { OverviewData } from "../components/Ship/overview/interface";
import { CabinsData } from "components/Ship/cabins/interface";
import { ItinerariesData } from "components/Ship/itineraries/interface";
import { GalleryData } from "components/Ship/gallery/interface";

export interface StateProps {
	current_tab: number;
	shipraw_data: Document[],
	overview_data: OverviewData,
	specification_data: SpecificationData,
	itineraries_data: ItinerariesData[] | "no data",
	cabins_data: CabinsData[],
	gallery_data: GalleryData[],
	deck_plans_data: any
}