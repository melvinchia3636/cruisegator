import { SpecificationData } from "../components/Ship/specifications/interface";
import { OverviewData } from "../components/Ship/overview/interface";
import { CabinsData } from "components/Ship/cabins/interface";

export interface StateProps {
	current_tab: number;
	shipraw_data: Document[],
	overview_data: OverviewData,
	specification_data: SpecificationData,
	itineraries_data: any,
	cabins_data: CabinsData[]
}