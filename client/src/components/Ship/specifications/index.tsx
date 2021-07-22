/* eslint-disable @typescript-eslint/ban-types */
import { connect } from "react-redux";
import Icon from "@iconify/react";
import settings28Regular from "@iconify-icons/fluent/settings-28-regular";
import searchVisual24Regular from "@iconify-icons/fluent/search-visual-24-regular";
import info24Regular from "@iconify-icons/fluent/info-24-regular";
import { SpecificationsProps, SpecificationData } from "./interface";
import { StateProps } from "../../../state_manage/interface";
import React, { useEffect } from "react";
import axios from "axios";
import { Dispatch } from "redux";
import { setSpecificationData } from "state_manage/actions";

const mapStateToProps = (state: StateProps) => {
	return {
		specification_data: state.specification_data,
		shipraw_data: state.shipraw_data,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		setSpecificationData: (data: SpecificationData) => dispatch(setSpecificationData(data))
	};
};

const ConnectedSpecifications: React.FC<SpecificationsProps> = ({ id, specification_data, setSpecificationData }: SpecificationsProps): JSX.Element => {
	const objectMap = (obj: Object, fn: Function) =>
		Object.entries(obj).map(
			([k, v]) => fn(k, v)
		);

	const getInfoComponent = (value: number | boolean): JSX.Element => {
		let result: JSX.Element = <></>;
		switch (typeof value) {
		case "number": result = <span>{value}</span>; break;
		case "boolean": result = <span className={"border-blue-800 !w-[0.83rem] !h-[0.83rem] !block border-2 rounded-full "+(value ? "bg-blue-800" : "")}></span>;
		}
		return result;
	};

	useEffect(() => {
		axios.get("https://api.cruisegator.thecodeblog.net/ship/specifications/"+id).then(res => {
			const data = res && res?.data;
			setSpecificationData(data || {});
		}).catch(() => null);
	}, []);

	return (
		<div className='p-10 md:p-20 !pt-32 w-full flex flex-col'>
			<div className='mb-10'>
				<h1 className='uppercase'>Specifications</h1>
				<div className='w-20 h-1 mt-1 bg-blue-800'></div>
			</div>
			<div style={{ marginBottom: "6rem" }} className='mt-4'>
				<div className="flex items-center mb-4">
					<Icon icon={settings28Regular} width='32' className='mr-2 text-blue-800'/>
					<h2 className="text-2xl fw-normal m-0 text-primary text-up text-blue-800">Ship Specifications</h2>
				</div>
				<div className='st'>
					{JSON.stringify(specification_data) !== "{}" ? Object.keys(specification_data.specification_data).map((k: string) => 
						<div className="flex justify-between items-center py-3 px-1" key={k}>
							<div className="mr-6">{k}</div>
							<div className="text-right">{k === "Sister-ships" ? specification_data.specification_data[k].split(",").map((v: string) => <div key={k}>{v}</div>) : specification_data.specification_data[k]}</div>
						</div>
					) : ""}
				</div>
			</div>
			<div style={{ marginBottom: "6rem" }}>
				<div className="flex items-center mb-4">
					<Icon icon={info24Regular} width='32' className='mr-2 text-blue-800'/>
					<h2 className="text-2xl fw-normal m-0 text-primary text-up text-blue-800">Service Informations</h2>
				</div>
				<div className='st'>
					{specification_data.service_info ? objectMap(specification_data.service_info, (k: string, v: boolean | number) => 
						<div className="flex justify-between items-center py-3 px-1">
							<div className="mr-6">{k}</div>
							{getInfoComponent(v)}
						</div>
					) : ""}
				</div>
			</div>
			<div>
				<div className="flex items-center mb-4">
					<Icon icon={searchVisual24Regular} width='32' className='mr-2 text-blue-800'/>
					<h2 className="text-2xl fw-normal m-0 text-primary text-up text-blue-800">Interesting Facts</h2>
				</div>
				<div className='st'>
					{specification_data.interesting_fact ? objectMap(specification_data.interesting_fact, (k: string, v: object) => 
						<><h3 className="text-2xl mb-2 mt-10">{k}</h3>
							{objectMap(v, (k: string, v: boolean | number) => 
								<div className="flex justify-between items-center py-3 px-1">
									<div className="mr-6">{k}</div>
									{getInfoComponent(v)}
								</div>
							)}</>
					) : ""}
				</div>
			</div>
		</div>
	);
};

const Specifications = connect(mapStateToProps, mapDispatchToProps)(ConnectedSpecifications);

export default Specifications;