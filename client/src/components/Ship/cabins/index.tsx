/* eslint-disable object-curly-newline */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import { Icon } from '@iconify/react';
import { ThumbsUp } from 'react-feather';
import axios from 'axios';
import { Dispatch } from 'redux';
import { StateProps } from '../../../state_manage/interface';
import { setCabinsData } from '../../../state_manage/actions';
import { CabinsProps, CabinsData } from './interface';

const mapStateToProps = (state: StateProps) => ({
  cabins_data: state.cabins_data,
  shipraw_data: state.shipraw_data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCabinsData: (data: CabinsData[]) => dispatch(setCabinsData(data)),
});

function ListItem({ str }: { str: string }) {
  return (
    <div className="bg-gray-100 text-gray-600 m-1 rounded-md overflow-hidden">
      <div className="px-3 py-2 lb" style={{ borderLeft: '4.5px solid rgba(0, 85, 185, 1)' }}>
        {str.replace(/&amp;/g, '&')}
      </div>
    </div>
  );
}

function CabinDiagram({ diagram }: { diagram: CabinsData['diagram'] }) {
  return (
    <LazyLoad
      debounce={10}
      placeholder={<img alt="" src="https://via.placeholder.com/250x150/FFFFFF/666666?text=%20" />}
      style={{ height: '200px' }}
    >
      <img
        alt=""
        src={diagram.thumb}
        style={{ height: '200px' }}
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src =
            'https://via.placeholder.com/200x150/FFFFFF/666666?text=N/A';
        }}
      />
    </LazyLoad>
  );
}

function CabinCategories({ categories }: { categories: CabinsData['categories'] }) {
  return (
    <div className="flex mb-6 flex-wrap justify-center w-full">
      {categories.map((e) => (
        <span
          key={e.name}
          style={{ background: e.background.replace('..', 'https://www.cruisedeckplans.com/DP') }}
          className="ctg px-5 mr-2 mb-2 text-white rounded-full whitespace-nowrap py-1 text-sm"
        >
          {e.name}
        </span>
      ))}
    </div>
  );
}

function CabinImages({ image }: { image: CabinsData['image'] }) {
  return (
    <div className="md:pl-20 flex flex-col sm:flex-row md:flex-col items-center justify-center mt-6 md:mt-0">
      {image.map((e) => (
        <LazyLoad
          debounce={10}
          placeholder={
            <img alt="" src="https://via.placeholder.com/169x128/FFFFFF/666666?text=%20" />
          }
          style={{ width: '100%' }}
          key={e}
        >
          <img alt="" src={e} className="w-full p-2" />
        </LazyLoad>
      ))}
      <img alt="" src="https://via.placeholder.com/500x300" key="placeholder" className="p-2" />
    </div>
  );
}

function MetaTable({ e }: { e: CabinsData }) {
  return (
    <div className="text-left grid grid-cols-2 whitespace-nowrap">
      <div className="pr-64 text-gray-600 font-medium border-b-2 border-gray-300 py-2 pl-2">
        Sleep up to
      </div>
      <div className="border-b-2 border-gray-300 py-2 text-right pr-2">{e.capacity}</div>
      <div className="text-gray-600 font-medium border-b-2 border-gray-300 py-2 pl-2">Amount</div>
      <div className="border-b-2 border-gray-300 py-2 text-right pr-2">{e.amount}</div>
      <div className="text-gray-600 font-medium border-b-2 border-gray-300 py-2 pl-2">Cabin</div>
      <div className="border-b-2 border-gray-300 py-2 text-right pr-2">
        {e.room_sqft} sqft ({e.room_m2} m<sup>2</sup>)
      </div>
      <div className="text-gray-600 font-medium py-2 pl-2">Balcony</div>
      <div className="py-2 text-right pr-2">
        {e.balcony_sqft} sqft ({e.balcony_m2} m<sup>2</sup>)
      </div>
    </div>
  );
}

function OtherData({ others }: { others: CabinsData['others'] }) {
  return (
    <>
      {others.map(({ type, content }) => {
        content = content.replace(/^:/, '');
        let result: JSX.Element;
        switch (type) {
          case 'B':
            result = <p className="text-gray-800 text-md md:text-lg font-medium my-4">{content}</p>;
            break;
          case 'I':
            result = (
              <p className="text-gray-800 text-md md:text-lg font-medium my-4 italic">{content}</p>
            );
            break;
          case 'U':
            result = (
              <h3
                className="uppercase text-xl font-medium mt-4 pl-2"
                style={{ borderLeft: '4px solid rgba(0, 85, 185, 1)' }}
              >
                {content}
              </h3>
            );
            break;
          case 'NOTE':
            result = (
              <div className="rounded-md overflow-hidden my-4">
                <div
                  className="p-6 lb bg-blue-100 text-blue-800"
                  style={{ borderLeft: '4.5px solid rgba(0, 85, 185, 1)' }}
                >
                  <div className="font-bold mb-3 text-xl">NOTE</div>
                  {content.slice(5, content.length).replace(/\/$/, '')}
                </div>
              </div>
            );
            break;
          default:
            result = <p className="text-gray-600 text-md md:text-lg my-4">{content}</p>;
        }
        return result;
      })}
    </>
  );
}

function Location({ location }: { location: CabinsData['location'] }) {
  return (
    <>
      <div className="text-blue-800 flex items-center text-[1.5em]">
        <Icon
          icon="fluent:location-28-regular"
          className="mr-2"
          width={32}
          style={{ stroke: 'rgba(0, 85, 185, 1)', strokeWidth: '0.5px' }}
        />
        <h3>Stateroom Location</h3>
      </div>
      <div className="grid gap-y-8 gap-x-16 mt-8 grid-cols-[repeat(2,auto)]">
        {location.map(({ deck, categories }) => (
          <>
            <h4 className="whitespace-nowrap text-lg text-gray-600">{deck}</h4>
            <div className="flex flex-wrap">
              {categories.map((e) => (
                <span
                  key={e.name}
                  style={{
                    background: e.background?.replace('..', 'https://www.cruisedeckplans.com/DP'),
                  }}
                  className="ctg px-5 mr-1 mb-1 text-white rounded-full whitespace-nowrap py-1 text-sm"
                >
                  {e.name}
                </span>
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
}

function Features({ features }: { features: CabinsData['features'] }) {
  return (
    <>
      <div className="text-blue-800 flex items-center mt-20 text-[1.5em]">
        <ThumbsUp size={28} className="mr-2" />
        <h3>Features</h3>
      </div>
      <div className="mt-6 text-md md:text-lg flex flex-wrap">
        {features
          .sort((a, b) => a.length - b.length)
          .map((e, i) => {
            if (e.split(':')[0].includes('NOTE')) {
              return (
                <div className="rounded-md overflow-hidden my-4 w-full">
                  <div
                    className="p-6 lb bg-blue-100 text-blue-800"
                    style={{ borderLeft: '4.5px solid rgba(0, 85, 185, 1)' }}
                  >
                    <div className="font-bold mb-3 text-xl">NOTE</div>
                    {`${e
                      .split(':')[1]
                      .trim()
                      .replace(/^(.)/, (e) => e.toUpperCase())}.`}
                  </div>
                </div>
              );
            }
            return <ListItem str={e} key={i} />;
          })}
      </div>
    </>
  );
}

function SizeInfo({ size_info }: { size_info: CabinsData['important_size_info'] }) {
  return (
    <>
      <div className="text-blue-800 flex items-center mt-20 text-[1.5em]">
        <Icon
          icon="fluent:resize-20-regular"
          className="mr-2"
          width={32}
          style={{ stroke: 'rgba(0, 85, 185, 1)', strokeWidth: '0.5px' }}
        />
        <h3>Size Information</h3>
      </div>
      <p className="mt-6 text-lg text-gray-600">{size_info || 'N/A'}</p>
    </>
  );
}

function Perks({ perks }: { perks: CabinsData['perks'] }) {
  return (
    <>
      <div className="text-blue-800 flex items-center mt-20 text-[1.5em]">
        <Icon
          icon="book-star-24-regular"
          className="mr-2"
          width={32}
          style={{ stroke: 'rgba(0, 85, 185, 1)', strokeWidth: '0.2px' }}
        />
        <h3>Perks</h3>
      </div>
      <div className="mt-6 text-md md:text-lg flex flex-wrap">
        {perks.length > 0 ? (
          perks.sort((a, b) => a.length - b.length).map((e, i) => <ListItem str={e} key={i} />)
        ) : (
          <p>N/A</p>
        )}
      </div>
    </>
  );
}

function MoreDetails({ e, i }: { e: CabinsData; i: number }) {
  return (
    <div
      className="w-full overflow-auto p-4 pt-8 md:p-8 my-3 flex flex-col justify-center"
      id={`c-${i}`}
    >
      <Location location={e.location} />
      <Features features={e.features} />
      <SizeInfo size_info={e.important_size_info} />
      <Perks perks={e.perks} />
      <OtherData others={e.others} />
    </div>
  );
}

function CabinCard({ e, i }: { e: CabinsData; i: number }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        key={i}
        className="w-full flex bg-white flex-col justify-center rounded-xl cursor-pointer transition-all transform hover:-translate-y-1"
        style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
        onClick={() => setShow(true)}
      >
        <div className="flex flex-col items-center p-8">
          <CabinDiagram diagram={e.diagram} />
          <div className="flex flex-col md:flex-row h-100 mt-6 lg:mt-0">
            <div className="flex items-start h-100 flex-col justify-start pt-5">
              <h2 className="font-medium text-3xl mt-9 mb-3 text-blue-800 text-center w-full">
                {e.name}
              </h2>
              <CabinCategories categories={e.categories} />
              <MetaTable e={e} />
            </div>
          </div>
        </div>
      </div>
      {show && (
        <div
          className="top-0 left-0 w-full h-screen z-[9999] fixed bg-black opacity-20 cursor-pointer"
          onClick={() => setShow(false)}
        />
      )}
      <div
        className={`${
          show ? 'top-1/2' : '-top-1/2'
        } transition-all duration-500 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-8rem)] h-[calc(100vh-8rem)] overflow-auto rounded-xl z-[9999] fixed bg-white`}
      >
        <MoreDetails e={e} i={i} />
      </div>
    </>
  );
}

function ConnectedCabins({ cabins_data, id, setCabinsData, setLoaded }: CabinsProps) {
  if (cabins_data.length === 0) {
    setLoaded(false);
    axios
      .get(`https://api.cruisegator.thecodeblog.net/ship/cabins/${id}`)
      .catch(() => null)
      .then((res) => {
        const data = res && res?.data;
        setCabinsData(data);
        setLoaded(true);
      })
      .catch(() => null);
  }
  const data = cabins_data;
  data.forEach((e) => ([e.state, e.setState] = useState(0)));

  return (
    <div className="p-10 md:px-32 w-full grid grid-cols-3 gap-4">
      {data ? data.map((e, i) => <CabinCard e={e} i={i} key={i} />) : ''}
    </div>
  );
}

const Cabins = connect(mapStateToProps, mapDispatchToProps)(ConnectedCabins);

export default Cabins;
