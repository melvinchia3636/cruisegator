/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
import './style.scss';
import { RouteProps, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { changeTab, setShiprawData } from '../../state_manage/actions';

import 'flag-icon-css/sass/flag-icons.scss';

import Overview from './overview';
import Specifications from './specifications';
import Itinerariess from './itineraries';
import Cabin from './cabins';
import Gallery from './gallery';
import DeckPlans from './deckplans';

import { StateProps } from '../../state_manage/interface';

import loadingAnimation from '../Utils/assets/loading-anim.json';
import ids from './id.json';

interface ShipRouteProps extends RouteProps {
  active_tab: number;
  setShiprawData: (shipraw_data: Document) => {
    type: string;
    payload: Document;
  };
  changeTab: (newtab: number) => {
    type: string;
    payload: number;
  };
}

interface ShipHeaderProps {
  image: string;
  name: string;
  country: {
    flag?: string;
    name?: string;
  };
  company: string;
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const getItiID = (id: string): { id: number; name: string } | undefined => {
  const id2 = id.toLowerCase();

  const result = ids.filter((e: { id: number; name: string }) => {
    const id1 = e.name.toLowerCase();
    return id2.includes(id1) || id1.includes(id2);
  });
  if (result.length <= 1) return result[0];

  const result2 = result.map((e: { name: string }) => {
    const id3 = id2.split(' ');
    return id3.map((i) => e.name.toLowerCase().split(' ').includes(i)).filter((e: boolean) => e)
      .length;
  });
  return result[result2.indexOf(Math.max(...result2))];
};

const mapStateToProps = (state: StateProps) => ({
  active_tab: state.current_tab,
  shipraw_data: state.shipraw_data,
});

const MainMapDispatchToProps = (dispatch: Dispatch) => ({
  setShiprawData: (shipraw_data: Document) => dispatch(setShiprawData(shipraw_data)),
  changeTab: (newtab: number) => dispatch(changeTab(newtab)),
});

function ConnectedShip({ active_tab, setShiprawData, changeTab }: ShipRouteProps) {
  const [data, setData] = useState<ShipHeaderProps>();
  const [loaded, setLoaded] = useState<boolean>(false);

  const options: string[] = [
    'overview',
    'specifications',
    'itineraries',
    'deckplans',
    'cabins',
    'reviews',
    'gallery',
  ];

  const specialID: { [key: string]: string } = {
    'Queen Mary 2': 'Queen Mary',
  };

  const { id } = useParams() as { id: string };
  const splittedID: string[] = id.split('-');
  const splittedIDNoNum: string = splittedID
    .slice(0, splittedID.length - 1)
    .join(' ')
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  const cruiseCriticID = getItiID(splittedIDNoNum);
  const ItiID: number | undefined = cruiseCriticID?.id;
  const cruiseCriticName: string | undefined = cruiseCriticID?.name
    ?.replace(/\(|\)/g, '')
    .replaceAll(' ', '-')
    .toLowerCase();
  const cruiseCriticURI = `${cruiseCriticName}-${ItiID}`;

  useEffect(() => {
    const fetchRawData = async () => {
      const domParser: DOMParser = new DOMParser();
      const request = await axios({
        method: 'GET',
        url: `https://cors-anywhere.thecodeblog.net/www.cruisemapper.com/ships/${id}`,
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        },
      });

      const rdata: string = request ? request.data : '<p>none</p>';
      const html: Document = domParser.parseFromString(rdata, 'text/html');
      setShiprawData(html);
      const countryRaw = html
        .querySelectorAll('.specificationTable')[0]
        .querySelector('tr:nth-child(2) td:last-child');
      setData({
        image:
          `https://www.cruisemapper.com${(
            html.querySelector('img[itemprop="image"]') as HTMLImageElement
          )?.src.replace(window.origin, '')}` || '',
        company: html.querySelector('a.shipCompanyLink')?.textContent || 'N/A',
        name: html.querySelector('h1[itemprop="name"]')?.textContent || 'N/A',
        country: {
          name: countryRaw?.textContent?.trim(),
          flag: countryRaw?.querySelector('span')?.className,
        },
      });
    };

    fetchRawData();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('style', `overflow-y: ${loaded ? 'auto' : 'hidden'}`);
  }, [loaded]);

  return (
    <div className="w-full pb-0">
      <div
        className="absolute top-0 left-0 w-full h-screen bg-no-repeat bg-cover bg-blend-darken"
        style={{
          backgroundImage: `url(${data?.image})`,
          backgroundColor: 'rgba(0, 0, 0, .4)',
        }}
      >
        <h1
          className="text-8xl ml-32 mt-56 text-white font-bold w-1/2 leading-[117%]"
          style={{ textShadow: '0 4px 6px rgba(0, 0, 0, .55)' }}
        >
          {data?.name}
        </h1>
        <div className="bg-blue-800 px-8 py-6 absolute -bottom-8 left-32 min-w-[24rem] max-w-[28rem]">
          <h2 className="mb-24 text-white text-3xl font-medium leading-[139%]">{data?.company}</h2>
          <p className="text-xl text-white text-right flex items-center gap-2 w-full justify-end">
            <span className={`!w-6 !h-6 rounded-sm ${data?.country?.flag}`} />
            {data?.country?.name}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-[100vh] mb-12 overflow-visible">
        <div className="py-5 pl-0 pr-12 border-b-2 w-[90%] border-gray-200 overflow-visible">
          <div className="flex justify-between gap-16 font-medium text-xl overflow-visible navbar">
            {options.map((e, i) => (
              <button
                type="button"
                className={active_tab === i ? 'active' : ''}
                key={e}
                onClick={() => changeTab(i)}
              >
                {e[0].toUpperCase() + e.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full min-h-[90%] transition-all duration-500 overflow-hidden ">
        {(() => {
          let tab: JSX.Element;
          switch (active_tab) {
            case 0:
              tab = <Overview id={id} setLoaded={setLoaded} />;
              break;
            case 1:
              tab = <Specifications id={id} setLoaded={setLoaded} />;
              break;
            case 2:
              tab = <Itinerariess id={ItiID} setLoaded={setLoaded} />;
              break;
            case 3:
              tab = <DeckPlans id={specialID[splittedIDNoNum] || splittedIDNoNum} />;
              break;
            case 4:
              tab = (
                <Cabin id={specialID[splittedIDNoNum] || splittedIDNoNum} setLoaded={setLoaded} />
              );
              break;
            case 6:
              tab = <Gallery id={id} ccid={cruiseCriticURI} setLoaded={setLoaded} />;
              break;
            default:
              tab = <></>;
          }
          return tab;
        })()}
      </div>
      {!loaded ? (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-30 z-[9999]">
          <div className="bg-white rounded-md p-2 shadow-gridbox">
            <Lottie
              options={defaultOptions}
              height={80}
              width={80}
              isStopped={false}
              isPaused={false}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

const Ship = connect(mapStateToProps, MainMapDispatchToProps)(ConnectedShip);

export default Ship;
