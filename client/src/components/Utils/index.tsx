import React from "react";
import { Logo, Youtube, Twitter, Pinterest, Instagram, Facebook, LogoLight } from "./assets";
1;
import { Icon } from "@iconify/react";
import { Menu } from "react-feather";

interface INavProps {
	className: string
}

interface INavState {
	isToggleOn: boolean;
	hideNav: boolean;
	isDone: boolean;
}

const Nav: React.FC<INavProps> = (): JSX.Element => {
	return <nav className="mx-32 py-6 flex items-center sticky top-0 left-0 justify-between z-[9999] bg-white border-gray-200 border-b-2">
		<img src={Logo}/>
		<div className="flex">
			<a className="text-xl font-medium mx-12 active">Home</a>
			<a className="text-xl font-medium mx-12">Database</a>
			<a className="text-xl font-medium mx-12">Map</a>
			<a className="text-xl font-medium mx-12">News</a>
		</div>
	</nav>;
};

const Footer = (): JSX.Element => {
	const social_media_icon: string[][] = [
		[Youtube, "https://www.youtube.com/channel/UCsSf5dUsiQYfEucaJlusXng"],
		[Twitter, "/"],
		[Pinterest, "/"],
		[Instagram],
		[Facebook, "https://facebook.com/TheSillyCoder"]
	];
	const nav_link: string[][] = [
		["Home", "/"],
		["News", "/"],
		["Database", "/database"],
		["Map", "/"],
		["Pricing", "/"],
		["Privacy Policy", "/"]
	];
	return <footer></footer>;/*(
		<footer className="w-100 pt-5 pb-2 flex flex-col justify-center items-center bg-blue-800">
			<div className="flex flex-column justify-center items-center w-100">
				<div className="flex flex-col items-center mr-20">
					<img src={LogoLight} alt="logo"/>
					<div className="flex justify-between mt-8">
						{social_media_icon.map(([icon, link])=><a className="mx-3" href={link} key={link}><img src={icon} alt={link}/></a>)}
					</div>
				</div>
				<div className="grid nav-link fw-lighter mr-20 my-8 text-nowrap grid-flow-col grid-rows-3 items-center gap-x-16 gap-y-4">
					{nav_link.map(([text, href]) => <a href={href} className="text-white" key={text}>{text}</a>)}
				</div>
				<form className="w-64">
					<p className="fw-light text-white text-xl mb-4">Get Updated</p>
					<input className="mb-3 border-0 fw-lighter block w-full px-4 py-2 bg-blue-600 text-white placeholder-blue-300 rounded-sm" type="email" name="email" placeholder="Email Address"/>
					<input className="border-0 block w-full px-4 py-2 text-blue-800 font-poppins rounded-sm" type="submit" name="submit" value="Subscribe"/>
				</form>
			</div>
			<p className="text-gray-300 fw-lighter text-sm m-0 mt-5">Copyright © Cruisegator 2021. All rights reserved</p>
		</footer>
	);*/
};

export {Nav, Footer};