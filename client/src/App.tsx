import { Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";

import Homepage from "./components/Homepage";
import { Nav, Footer } from "./components/Utils";
import Error404 from "./components/Error";
import Database from "./components/Database";
import Map from "./components/Map";
import Ship from "./components/Ship";
import DocumentTitle from "react-document-title";

import "tailwindcss/tailwind.css";
import "./style.scss";

export default function App(): JSX.Element {
	const location = useLocation();
	const pathname = (location.pathname.match(/\/(.*?)(?:\/|$)/) || ["home"]);
	const pagename = pathname[pathname.length-1];
	return (
		<div className="flex flex-col">
			<Nav className={pagename}/>
			<DocumentTitle title={pagename[0] ? pagename[0].toUpperCase()+pagename.slice(1)+" - Cruisegator" : "Cruisegator"}/>
			<main className={"container-fluid p-0 overflow-hidden h-full "+pathname[pathname.length-1]}>
				<Route>
					<Switch>
						<Route exact path='/'><Homepage/></Route>
						<Route exact path='/home'><Homepage/></Route>
						<Route exact path='/database'><Database/></Route>
						<Route path='/map'><Map/></Route>
						<Route path='/ship/:id' component={Ship}></Route>
						<Route><Error404/></Route>
					</Switch>
				</Route>
			</main>
			{!(pagename==="map")?<Footer />:""}
		</div>
	);
}
