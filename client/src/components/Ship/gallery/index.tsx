/* eslint-disable @typescript-eslint/indent */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import { Icon } from '@iconify/react';
import { ChevronLeft, ChevronRight } from 'react-feather';
// @ts-ignore
import ReactPannellum from 'react-pannellum';
import { Dispatch } from 'redux';
import { setGalleryData } from '../../../state_manage/actions';
import { StateProps } from '../../../state_manage/interface';
import { GalleryData, GalleryProps } from './interface';

const mapStateToProps = (state: StateProps) => ({
  gallery_data: state.gallery_data,
  shipraw_data: state.shipraw_data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setGalleryData: (data: GalleryData[]) => dispatch(setGalleryData(data)),
});

const IconMap: { [key: string]: JSX.Element } = {
  'Restaurants And Bars': (
    <Icon icon="ic:outline-branch-dining" width={36} className="text-blue-800" />
  ),
  Family: (
    <Icon
      icon="carbon:pedestrian-family"
      width={36}
      className="text-blue-800"
      style={{ strokeWidth: '.5px' }}
    />
  ),
  'The Ship': (
    <Icon
      icon="fluent:vehicle-ship-24-regular"
      width={36}
      className="text-blue-800"
      style={{ strokeWidth: '.5px' }}
    />
  ),
  'Activities And Events': (
    <Icon icon="fluent:shifts-activity-24-filled" width={36} className="text-blue-800" />
  ),
  'Spa And Fitness': (
    <Icon icon="cil:spa" width={36} className="text-blue-800" style={{ strokeWidth: '8px' }} />
  ),
  'Pools And Sun Decks': (
    <Icon icon="cil:pool" width={36} className="text-blue-800" style={{ strokeWidth: '12px' }} />
  ),
  Cabins: (
    <Icon
      icon="fluent:bed-24-regular"
      width={36}
      className="text-blue-800"
      style={{ strokeWidth: '0.5px' }}
    />
  ),
  Ports: <Icon icon="ic:outline-anchor" width={36} className="text-blue-800" />,
};

function ConnectedGallery({ gallery_data, ccid, setGalleryData, setLoaded }: GalleryProps) {
  const [imageURL, setImageURL] = useState<{ url: string | string[]; id: number; type: string }[]>(
    [],
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showImage, setShowImage] = useState<boolean>(false);

  const fetchAndShowImage = async (
    name: string,
    album_id: number,
    image_id: number,
  ): Promise<void> => {
    setLoaded(false);
    const request = await axios
      .get(
        `https://api.cruisegator.thecodeblog.net/ship/gallery/image/${ccid}/${name}-${album_id}/${name}--v${image_id}`,
      )
      .catch(() => null);
    const data = request && request?.data;
    setImageURL(data || {});
    setLoaded(true);
  };

  if (gallery_data.length === 0) {
    setLoaded(false);
    axios
      .get(`https://api.cruisegator.thecodeblog.net/ship/gallery/index/${ccid}`)
      .then((res) => {
        const data = res && res?.data;
        setGalleryData(data || {});
        setLoaded(true);
      })
      .catch(() => null);
  }

  const data = gallery_data === 'no data' ? [] : gallery_data;

  return (
    <div className="p-10 w-full flex flex-col">
      {data.map((e: GalleryData) => (
        <div key={e.name} className="mb-24">
          <div className="flex items-center mb-5 w-full justify-center">
            {IconMap[e.name]}
            <h2 className="text-blue-800 text-[1.8em] font-medium ml-3 leading-tight">{e.name}</h2>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gl w-full overflow-y-scroll no-scrollbar justify-center">
              {e.list.map((e) => (
                <div
                  key={e?.id}
                  className="rounded-lg mx-2 w-96 flex-shrink-0 overflow-hidden relative"
                >
                  <LazyLoad
                    debounce={300}
                    placeholder={
                      <img
                        alt=""
                        src="https://via.placeholder.com/1000x800/BBBBBB/666666?text=%20"
                      />
                    }
                  >
                    <img
                      alt=""
                      src={e.coverImage.format.replace('{width}x{height}_{ratio}', 'x300_')}
                      key={e.id}
                      className="w-full"
                    />
                  </LazyLoad>
                  <div className="w-full h-full absolute top-0 left-0 ic">
                    <button
                      type="button"
                      className="w-full bg-black bg-opacity-0 py-4 px-5 flex items-center transition-all duration-300 cursor-pointer justify-between h-16"
                      onClick={() => {
                        setShowImage(true);
                        fetchAndShowImage(
                          e.name.toLowerCase().replaceAll(' ', '-'),
                          e.id,
                          e.coverImage.id,
                        );
                        setCurrentImageIndex(0);
                      }}
                    >
                      <h3 className="!text-white text-xl max-w-[60%] overflow-ellipsis whitespace-nowrap !block overflow-hidden">
                        {e?.name}
                      </h3>
                      <p className="!text-white text-sm">{e.totalMedia} photos</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      {showImage ? (
        <button
          type="button"
          className="w-full h-full bg-black bg-opacity-90 fixed top-0 left-0 flex flex-col items-center justify-center z-[9999]"
          onClick={(e) =>
            (e.target as HTMLElement).classList.contains('bg-black')
              ? (() => {
                  setShowImage(false);
                  setImageURL([]);
                })()
              : ''
          }
        >
          {imageURL.length > 0 ? (
            <>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="p-5"
                  onClick={() =>
                    currentImageIndex > 0 ? setCurrentImageIndex(currentImageIndex - 1) : ''
                  }
                >
                  <ChevronLeft color="white" />
                </button>
                {(() => {
                  const image = imageURL[currentImageIndex];
                  let component;
                  switch (image?.type) {
                    case 'panorama':
                      component = (
                        <ReactPannellum
                          id="panorama"
                          className="!w-[75vw] !h-[75vh]"
                          autoLoad
                          type="cubemap"
                          cubeMap={imageURL[currentImageIndex].url}
                        />
                      );
                      ReactPannellum.addScene(
                        `Scene${image.id}`,
                        {
                          type: 'cubemap',
                          cubeMap: imageURL[currentImageIndex].url,
                        },
                        () => ReactPannellum.loadScene(`Scene${image.id}`),
                      );
                      break;
                    case 'image':
                      component = <img alt="" src={imageURL[currentImageIndex].url as string} />;
                      break;
                    default:
                      break;
                  }
                  return component;
                })()}
                <button
                  type="button"
                  className="p-5"
                  onClick={() =>
                    currentImageIndex + 1 < imageURL.length
                      ? setCurrentImageIndex(currentImageIndex + 1)
                      : ''
                  }
                >
                  <ChevronRight color="white" />
                </button>
              </div>
              <p className="text-white mt-4">
                {currentImageIndex + 1} - {imageURL.length}
              </p>
            </>
          ) : (
            ''
          )}
        </button>
      ) : (
        ''
      )}
      <ReactPannellum id="panorama" className="hidden" autoLoad />
    </div>
  );
}

const gallery = connect(mapStateToProps, mapDispatchToProps)(ConnectedGallery);

export default gallery;
