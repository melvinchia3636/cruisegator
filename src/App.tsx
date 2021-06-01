import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

import Homepage from './components/Homepage';
import { Nav, Footer } from './components/Utils';
import Error404 from './components/Error';
import Database from './components/Database';
import Map from './components/Map';

import './style.scss'

export default function App(): JSX.Element {
	const location = useLocation();
	const pathname = (location.pathname.match(/\/(.*?)(?:\/|$)/) || ['home'])
	return (
		<main className={'container-fluid p-0 min-vh-100 '+pathname[pathname.length-1]}>
			<Nav />
			<Route>
				<Switch>
					<Route exact path='/' component={Homepage}></Route>
					<Route path='/home' component={Homepage}></Route>
					<Route path='/database' component={Database}></Route>
					<Route path='/map' component={() => <Map/>}></Route>
					<Route component={Error404}></Route>
				</Switch>
			</Route>
			<Footer />
		</main>
	);
}