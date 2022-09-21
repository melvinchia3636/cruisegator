/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import './style.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import Scrollbar from 'react-smooth-scrollbar';

import { Icon } from '@iconify/react';

// eslint-disable-next-line
// @ts-ignore
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
import mapboxgl, { MapLayerMouseEvent, MapMouseEvent } from 'mapbox-gl';
import { Point } from 'geojson';
// @ts-ignore
mapboxgl.workerClass = MapboxWorker;

const circles = Array(13)
  .fill(null)
  .map((_, i) => `./assets/circle/circle${2 ** i}.png`);
const arrows = Array(13)
  .fill(null)
  .map((_, i) => `./assets/arrow/arrow${2 ** i}.png`);

console.log(circles);

const colors: [number, number[]][] = [
  [1, [197, 181, 174, 255]],
  [2, [224, 77, 126, 255]],
  [4, [204, 212, 95, 255]],
  [8, [150, 194, 104, 255]],
  [16, [251, 225, 94, 255]],
  [32, [250, 162, 60, 255]],
  [64, [231, 68, 67, 255]],
  [128, [98, 110, 180, 255]],
  [256, [124, 98, 170, 255]],
  [512, [91, 156, 212, 255]],
  [1024, [67, 182, 200, 255]],
  [2048, [247, 176, 202, 255]],
  [4096, [126, 146, 157, 255]],
];
let names: (number | string | boolean)[][];
let currentSelected: (number | boolean)[];

names = [
  [2, 'Carnival Cruise Line'],
  [4, 'Royal Caribbean'],
  [8, 'Princess Cruises'],
  [8, 'P&O Cruises'],
  [16, 'Holland America'],
  [32, 'Norwegian Cruise Line'],
  [64, 'Costa Cruises'],
  [128, 'AIDA Cruises'],
  [128, 'TUI Cruises'],
  [256, 'Celebrity Cruises'],
  [512, 'MSC Cruises'],
  [512, 'Disney Cruise Line'],
  [512, 'Viking Cruises'],
  [1024, 'Marella Cruises'],
  [1024, 'Cunard'],
  [1024, 'Seabourn Cruises'],
  [1024, 'Silversea Cruises'],
  [1024, 'Oceania Cruises'],
  [1024, 'Regent Seven Seas Cruises'],
  [1024, 'Ponant Cruises'],
  [1024, 'Azamara Cruises'],
  [1024, 'Crystal Cruises'],
  [1024, 'Windstar Cruises'],
  [1024, 'Cruise and Maritime Voyages'],
  [1024, 'Fred Olsen Cruise Lines'],
  [1024, 'Phoenix Reisen'],
  [1024, 'Hapag-Lloyd Cruises'],
  [1024, 'Saga Cruises'],
  [1024, 'Hurtigruten'],
  [1024, 'Mystic Cruises'],
  [1024, 'Lindblad Expeditions'],
  [1024, 'River Cruises'],
  [1024, 'AmaWaterways'],
  [1024, 'American Cruise Lines'],
  [1024, 'Arosa Cruises'],
  [1024, 'Avalon Waterways'],
  [1024, 'CroisiEurope'],
  [1024, 'Emerald Cruises'],
  [1024, 'Luftner-Amadeus River Cruises'],
  [1024, 'Scenic Cruises'],
  [1024, 'Scylla Cruises'],
  [1024, 'Uniworld'],
  [1024, 'Russian River Cruises'],
  [2048, 'Ferries'],
  [4096, 'Icebreakers'],
  [1, 'Other'],
];

currentSelected = Array(46)
  .fill(0)
  .map((_, i) => i);
names = names.map((v, i) => [v[0] !== 1 ? i + 1 : 0, ...v, true]);

colors.sort((a, b) => a[0] - b[0]);

mapboxgl.accessToken =
  'pk.eyJ1IjoicmVkYXhlIiwiYSI6ImNrOWk3am0zYjB4dGIzZGtmenl3cmw1ZmMifQ.mwTbGVSSSuBpmCvOh6oCxw';

interface IMapState {
  lng: number;
  lat: number;
  zoom: number;
  height: number;
  map?: mapboxgl.Map;
  names: (number | string | boolean)[][];
  sidebarOpened: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMapProps {}

export default class Map extends React.Component<IMapProps, IMapState> {
  mapContainer: React.RefObject<HTMLInputElement>;

  constructor(props: IMapProps) {
    super(props);
    this.state = {
      lng: 0,
      lat: 90,
      zoom: 0.55,
      height: window.innerHeight - 78,
      names,
      sidebarOpened: true,
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount(): void {
    window.scrollTo(0, 0);
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current || '',
      style: 'mapbox://styles/redaxe/ckpds90od199z17o8k97ertk3',
      center: [lng, lat],
      zoom,
    });
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
    this.setState({ map });

    map.on('load', () => {
      fetch(
        `https://cors-anywhere.thecodeblog.net/www.cruisemapper.com/map/ships.json?minLat=-90&maxLat=90&minLon=-180&maxLon=180&t=${Date.now()}&filter=${encodeURIComponent(
          currentSelected.join(','),
        )}`,
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json; charset=UTF-8',
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          for (const sets of [arrows, circles]) {
            for (const icon of sets) {
              map.loadImage(`./${icon}`, (error, image) => {
                if (error) throw error;
                const name = icon.match(/.+\/(.*?)\./);
                map.addImage(name[name.length - 1], image as HTMLImageElement);
              });
            }
          }
          map.addSource('places', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: data.map(
                (row: {
                  ship_line_title: string;
                  hover: string;
                  icon: string;
                  heading: string;
                  sog: number;
                  lon: string;
                  lat: string;
                }) => ({
                  type: 'Feature',
                  properties: {
                    description: `<strong>${row.hover}</strong><p style='margin: 0'>${row.ship_line_title}</p>`,
                    value: parseInt(row.icon, 10),
                    rotation: parseInt(row.heading, 10),
                    icon: (row.sog <= 1 ? 'circle' : 'arrow') + row.icon,
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(row.lon), parseFloat(row.lat)],
                  },
                }),
              ),
            },
          });
          // Add a layer showing the places.
          map.addLayer({
            id: 'places',
            type: 'symbol',
            source: 'places',
            layout: {
              'icon-rotate': ['get', 'rotation'],
              'icon-ignore-placement': true,
              'icon-image': ['get', 'icon'],
              'icon-size': 0.03,
              'icon-padding': 0,
              'icon-anchor': 'center',
            },
            paint: {
              'icon-color': {
                property: 'value',
                stops: colors.map(([i, c]) => [
                  i,
                  (([r, g, b, a]) => `rgba(${r}, ${g}, ${b}, ${a})`)(c),
                ]),
              },
              'icon-halo-width': 0,
            },
          });
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          });
          map.on('mouseenter', 'places', (e: MapLayerMouseEvent) => {
            map.getCanvas().style.cursor = 'pointer';
            if ((e.features || [])[0].geometry.type === 'Point') {
              const g: Point = (e.features || [])[0].geometry as unknown as Point;
              const coordinates = g.coordinates.slice() as [number, number];
              const description = (e.features || [])[0].properties?.description;
              popup.setLngLat(coordinates).setHTML(description).addTo(map);
            }
          });
          map.on('mouseleave', 'places', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
          });
        });
    });
    map.on('mousemove', (e: MapMouseEvent) => {
      this.setState({ ...e.lngLat });
    });
    map.on('move', () => {
      this.setState({
        zoom: parseFloat(map.getZoom().toFixed(2)),
      });
    });
  }

  toggleSelector(index: number): void {
    const newNames = this.state.names;
    index = index - 1 < 0 ? names.length - 1 : index - 1;
    newNames[index][3] = !this.state.names[index][3];
    this.setState({ names: newNames });
    document.cookie = 'mapZoom=2';
    currentSelected = newNames.filter((e) => e[3]).map((e) => e[0]) as (number | boolean)[];
    fetch(
      `https://cors-anywhere.thecodeblog.net/www.cruisemapper.com/map/ships.json?minLat=-90&maxLat=90&minLon=-180&maxLon=180&t=${Date.now()}&filter=${encodeURIComponent(
        currentSelected.join(','),
      )}`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json; charset=UTF-8',
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        ((this.state.map as mapboxgl.Map).getSource('places') as mapboxgl.GeoJSONSource).setData({
          type: 'FeatureCollection',
          features: data.map(
            (row: {
              ship_line_title: string;
              hover: string;
              icon: string;
              heading: string;
              sog: number;
              lon: string;
              lat: string;
            }) => ({
              type: 'Feature',
              properties: {
                description: `<strong>${row.hover}</strong><p style='margin: 0'>${row.ship_line_title}</p>`,
                value: parseInt(row.icon, 10),
                rotation: parseInt(row.heading, 10),
                icon: (row.sog <= 1 ? 'circle' : 'arrow') + row.icon,
              },
              geometry: {
                type: 'Point',
                coordinates: [parseFloat(row.lon), parseFloat(row.lat)],
              },
            }),
          ),
        });
      });
  }

  toggleSidebar(): void {
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
    (this.state.map || new mapboxgl.Map()).resize();
  }

  render(): JSX.Element {
    const { lng, lat, zoom } = this.state;
    return (
      <div className="flex h-screen absolute top-0 left-0 w-full">
        <div
          ref={this.mapContainer}
          className="map-container w-full"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
          }}
        >
          <div className="longlat whitespace-nowrap py-1 px-2">
            Lon:
            {lng.toFixed(4)} | Lat:
            {lat.toFixed(4)} | Zoom:
            {zoom}
          </div>
        </div>
        <div
          className={`sb bg-white relative flex h-full ${
            this.state.sidebarOpened ? 'sb-expand' : 'sb-collapse'
          }`}
        >
          <Scrollbar
            className="nc m-6 overflow-hidden flex h-full mt-32"
            alwaysShowTracks
            style={{ height: this.state.height - 80 }}
          >
            <div className="w-100 overflow-auto bg-whtie flex flex-col">
              {names.map(([index, id, name]) => (
                <div
                  className="flex mb-3 items-center whitespace-nowrap mr-3 overflow-hidden text-base"
                  key={Math.random()}
                >
                  <button
                    type="button"
                    id={index.toString()}
                    className="p-0 border-0 flex items-center justify-center bg-white"
                    onClick={() => {
                      this.toggleSelector(index as number);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                      width="1.2em"
                      height="1.2em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      {this.state.names[this.state.names.findIndex((e) => e[0] === index)][3] ? (
                        <path
                          d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8.29 13.29a.996.996 0 0 1-1.41 0L5.71 12.7a.996.996 0 1 1 1.41-1.41L10 14.17l6.88-6.88a.996.996 0 1 1 1.41 1.41l-7.58 7.59z"
                          fill="rgba(0, 85, 185, 1)"
                        />
                      ) : (
                        <path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                      )}
                    </svg>
                  </button>
                  <span
                    style={{
                      background: (([r, g, b, a]) => `rgba(${r}, ${g}, ${b}, ${a})`)(
                        colors[Math.log2(id as number)][1],
                      ),
                    }}
                    className="block ci ml-3 mr-2 rounded-full"
                  />
                  {name}
                </div>
              ))}
            </div>
          </Scrollbar>
          <button
            type="button"
            className="absolute translate-middle-y p-0 py-6 px-1 border-0 bg-white rounded-r-md"
            style={{ left: '98%', top: '45%' }}
            onClick={this.toggleSidebar.bind(this)}
          >
            <Icon icon="ri:arrow-left-s-line" color="#606060" width="1.2em" height="1.2em" />
          </button>
        </div>
      </div>
    );
  }
}
