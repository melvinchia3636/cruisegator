/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/ban-types */
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { setSpecificationData } from '../../../state_manage/actions';
import { StateProps } from '../../../state_manage/interface';
import { SpecificationsProps, SpecificationData } from './interface';

const mapStateToProps = (state: StateProps) => ({
  specification_data: state.specification_data,
  shipraw_data: state.shipraw_data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSpecificationData: (data: SpecificationData) => dispatch(setSpecificationData(data)),
});

function ConnectedSpecifications({ specification_data }: SpecificationsProps) {
  const [activeTab, changeTab] = useState(0);
  const options: string[] = ['specifications', 'service info', 'interesting fact'];

  const objectMap = (obj: Object, fn: Function) => Object.entries(obj).map(([k, v]) => fn(k, v));

  const getInfoComponent = (value: number | boolean): JSX.Element => {
    let result: JSX.Element = <></>;
    switch (typeof value) {
      case 'number':
        result = <span>{value}</span>;
        break;
      case 'boolean':
        result = (
          <span
            className={`border-blue-800 !w-[0.83rem] !h-[0.83rem] !block border-2 rounded-full ${
              value ? 'bg-blue-800' : ''
            }`}
          />
        );
        break;
      default:
        break;
    }
    return result;
  };

  return (
    <div className="p-10 md:px-32 w-full flex flex-col">
      <div className="flex overflow-visible">
        <div className="py-5 pl-0 pr-12 border-b-2 w-full border-gray-300 overflow-visible">
          <div className="flex gap-32 font-medium text-xl overflow-visible navbar">
            {options.map((e, i) => (
              <button
                type="button"
                className={activeTab === i ? 'active' : ''}
                key={e}
                onClick={() => changeTab(i)}
              >
                {e[0].toUpperCase() + e.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="st mt-0.5 mb-16">
        {activeTab === 0 && JSON.stringify(specification_data) !== '{}'
          ? Object.keys(specification_data.specification_data).map((k: string) => (
              <div className="flex justify-between items-center py-5 px-3" key={k}>
                <div className="mr-6 font-medium">{k}</div>
                <div className="text-right">
                  {k === 'Sister-ships'
                    ? specification_data.specification_data[k]
                        .split(',')
                        .map((v: string) => <div key={k}>{v}</div>)
                    : specification_data.specification_data[k]}
                </div>
              </div>
            ))
          : ''}
        {activeTab === 1 && specification_data.service_info
          ? objectMap(specification_data.service_info, (k: string, v: boolean | number) => (
              <div className="flex justify-between items-center py-5 px-3">
                <div className="mr-6 font-medium">{k}</div>
                {getInfoComponent(v)}
              </div>
            ))
          : ''}
        {activeTab === 2 && specification_data.interesting_fact
          ? objectMap(specification_data.interesting_fact, (k: string, v: object) => (
              <>
                <h3 className="text-2xl mb-2 mt-16 font-medium">{k}</h3>
                {objectMap(v, (k: string, v: boolean | number) => (
                  <div className="flex justify-between items-center py-5 px-3">
                    <div className="mr-6 font-medium">{k}</div>
                    {getInfoComponent(v)}
                  </div>
                ))}
              </>
            ))
          : ''}
      </div>
    </div>
  );
}

const Specifications = connect(mapStateToProps, mapDispatchToProps)(ConnectedSpecifications);

export default Specifications;
