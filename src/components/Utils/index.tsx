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

class Nav extends React.Component<INavProps, INavState> {
	private navitem: string[][];

	constructor(props: INavProps) {
		super(props);
		this.navitem = [
			["Home", "/home"],
			["Database", "/database"],
			["News"],
			["Map", "/map"],
			["Donate"]
		];
		this.state = {
			isToggleOn: false,
			hideNav: false,
			isDone: false
		};
	}

	navToggleCallback(): void {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn,
			isDone: true
		}));
	}

	componentDidMount(): void {
		window.addEventListener("resize", this.resize.bind(this));
		this.resize();
	}

	resize(): void {
		this.setState({hideNav: window.innerWidth <= 1200});
	}	

	render(): JSX.Element {
		return (
			<nav className={[`flex overflow-hidden h-24 z-50 shadow bg-white fixed pl-4 pr-10 items-start xl:items-center transition-all duration-700 w-screen py-${this.state.isToggleOn&&this.state.hideNav ? 5 : 1} justify-between`, this.state.isToggleOn ? "expand flex-col !h-full" : "", this.props.className].join(" ")} style={{transitionTimingFunction: "cubic-bezier( 0.19, 1, 0.22, 1 )"}}>
				<div className="flex items-center mt-1">
					<button className="border-0 block xl:hidden" type="button" onClick={this.navToggleCallback.bind(this)}>
						<Menu width={48} strokeWidth={2}/>
					</button>
					<a href="/home"><img src={Logo} alt="logo" className="h-20"/></a>
				</div>
				<div className={"items-center xl:flex " + (this.state.isToggleOn ? "flex flex-col h-full w-full items-center justify-between py-20" : "hidden")}>
					{this.navitem.map(([text, link]) => <a className="mx-6 text-md text-gray-600 font-poppins" href={link} key={text}>{text}</a>)}
					<a className="btn bg-blue-800 whitespace-nowrap rounded-full py-3 ml-4 font-poppins text-white" href="/">Get Started</a>
				</div>
			</nav>
		);
	}
}

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