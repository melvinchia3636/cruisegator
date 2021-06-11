export interface MoreInfoData {
	service_info: object,
	interesting_fact: object
}

export interface SpecificationData extends MoreInfoData {
	specification_data: string[][]
}

export interface SpecificationsProps {
	id: string;
	specification_data: SpecificationData
}