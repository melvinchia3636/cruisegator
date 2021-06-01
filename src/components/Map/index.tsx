import React, { useRef, useEffect, useState } from 'react';
import './style.scss'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'

const circles = Array(13).fill(null).map((_, i) => require(`./assets/circle/circle${Math.pow(2, i)}.png`).default)
const arrows = Array(13).fill(null).map((_, i) => require(`./assets/arrow/arrow${Math.pow(2, i)}.png`).default)

mapboxgl.accessToken = 'pk.eyJ1IjoicmVkYXhlIiwiYSI6ImNrOWk3am0zYjB4dGIzZGtmenl3cmw1ZmMifQ.mwTbGVSSSuBpmCvOh6oCxw';

interface IMapState {
	lng: number;
	lat: number;
	zoom: number;
}

interface IMapProps {
}

export default class Map extends React.Component<IMapProps, IMapState> {
	mapContainer: React.RefObject<HTMLInputElement>;
	constructor(props:IMapProps) {
		super(props);
		this.state = {
			lng: 0,
			lat: 90,
			zoom: .55
		};
		this.mapContainer = React.createRef();
	}

	componentDidMount() {
		const { lng, lat, zoom } = this.state;
		let colors: [number, [number, number, number, number]][]
		colors = [
			[128, [98, 110, 180, 255]],
			[2, [224, 77, 126, 255]],
			[256, [124, 98, 170, 255]],
			[64, [231, 68, 67, 255]],
			[2048, [247, 176, 202, 255]],
			[16, [251, 225, 94, 255]],
			[4096, [126, 146, 157, 255]],
			[512, [91, 156, 212, 255]],
			[32, [250, 162, 60, 255]],
			[1024, [67, 182, 200, 255]],
			[1, [197, 181, 174, 255]],
			[8, [150, 194, 104, 255]],
			[4, [204, 212, 95, 255]]
		]
		colors.sort((a, b) => a[0] - b[0])
		const map = new mapboxgl.Map({
			container: this.mapContainer.current || '',
			style: 'mapbox://styles/redaxe/ckpds90od199z17o8k97ertk3',
			center: [lng, lat],
			zoom: zoom
		});
		map.dragRotate.disable();
		map.touchZoomRotate.disableRotation();
		
		
		map.on('load', function() {
			fetch('https://codeblog-corsanywhere.herokuapp.com/https://www.cruisemapper.com/map/ships.json?minLat=-90&maxLat=90&minLon=-180&maxLon=180&filter='+encodeURIComponent(Array(46).fill(null).map((_, i)=>i).join(',')), {
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Accept': 'application/json; charset=UTF-8',
				}
			})
      		.then(res => res.json()).then(
				data => {
					for (let sets of [arrows, circles]) {
						for (let icon of sets) map.loadImage(
							'https://codeblog-corsanywhere.herokuapp.com/http://118.101.111.28:3000'+icon,
							function(error, image) {
								var i: any
								i = image
								if (error) throw error;
								let name = icon.match(/.+\/(.*?)\./)
								console.log(name)
								map.addImage(name[name.length-1], i);
							}
						);
					}
					map.addSource('places', {
						'type': 'geojson',
						'data': {
							'type': 'FeatureCollection',
							'features': data.map((row:any) => {
								return {
									'type': 'Feature',
									'properties': {  
										'description': `<strong>${row.hover}</strong><p style='margin: 0'>${row.ship_line_title}</p>`,
										'value': parseInt(row.icon),
										'rotation': parseInt(row.heading),
										'icon': (row.sog <= 1 ? 'circle' : 'arrow')+row.icon
									},
									'geometry': {
										'type': 'Point',
										'coordinates': [parseFloat(row.lon), parseFloat(row.lat)]
									}
								}
							})
						}
					});
					// Add a layer showing the places.
					map.addLayer({
						'id': 'places',
						'type': "symbol",
						'source': 'places',
						'layout': {
							'icon-rotate': ['get', 'rotation'],
							'icon-ignore-placement': true,
							'icon-image': ['get', 'icon'],
							'icon-size': 0.03,
							'icon-padding': 0,
							'icon-anchor': 'center'
						},
						'paint': {
							"icon-color": {
								'property': 'value',
								'stops': colors.map(([i, c]) => [i, (([r, g, b, a]) => `rgba(${r}, ${g}, ${b}, ${a})`)(c)])
							},
							'icon-halo-width': 0
						}
					});
					var popup = new mapboxgl.Popup({
						closeButton: false,
						closeOnClick: false
					});
					map.on('mouseenter', 'places', function(e:any) {
						map.getCanvas().style.cursor = 'pointer';
						var coordinates = e.features[0].geometry.coordinates.slice();
						var description = e.features[0].properties.description;
						while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
							coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
						}
						popup.setLngLat(coordinates).setHTML(description).addTo(map);
					});
					map.on('mouseleave', 'places', function() {
						map.getCanvas().style.cursor = '';
						popup.remove();
					});
				});
			}
		)
		map.on('mousemove', (e) => {
			this.setState({...e.lngLat});
		});
		map.on('move', () => {
			this.setState({
				zoom: parseFloat(map.getZoom().toFixed(2))
			})
		})
	}

	render() {
		const { lng, lat, zoom } = this.state
		return (
			<React.Fragment>
				<div ref={this.mapContainer} className="map-container" ></div>
				<div className='longlat'>Lon:{lng.toFixed(4)} | Lat:{lat.toFixed(4)} | Zoom:{zoom}</div>
			</React.Fragment>
		)
	}
}