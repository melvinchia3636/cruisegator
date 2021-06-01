import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Logo, SearchIcon, Youtube, Twitter, Pinterest, Instagram, Facebook, LogoLight } from './assets';
import './style.scss';

interface INavProps {
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
			['Home', '/home'],
			['Database', '/database'],
			['News'],
			['Map', '/map'],
			['Donate']
		];
		this.state = {
			isToggleOn: false,
			hideNav: false,
			isDone: false
		};
	}

	navToggleCallback() {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn,
			isDone: true
		}));
	}

	componentDidMount() {
		window.addEventListener("resize", this.resize.bind(this));
		this.resize();
	}

	resize() {
		this.setState({hideNav: window.innerWidth <= 960});
	}	

	render() {
		return (
			<Navbar expand="lg" className={[`bg-white fixed-top px-2 px-sm-5 align-items-start align-items-lg-center py-${this.state.isToggleOn&&this.state.hideNav ? 5 : 2} justify-content-lg-between`, !this.state.isToggleOn ? 'flex-nowrap ' : '', this.state.isToggleOn ? 'expand' : ''].join(' ')}>
				<div className='d-flex'>
					<button className="navbar-toggler border-0" type="button" onClick={this.navToggleCallback.bind(this)} data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<a href='/home'><img src={Logo} height='70' /></a>
				</div>
				<div className={"collapse navbar-collapse justify-content-end mt-lg-0 pt-lg-0 pt-5 mt-lg-0 mt-5"+(this.state.isDone?(this.state.isToggleOn?' show':' hide'):'')} id="navbarNavAltMarkup">
					<div className="navbar-nav align-items-center">
						{this.navitem.map(([text, link]) => <a className="nav-link mx-lg-3 my-3 my-lg-0" href={link}>{text}</a>)}
						<a className="btn btn-primary mx-4 text-nowrap rounded-pill px-4 py-2 mx-lg-3 my-3" href="#">Register</a>
					</div>
				</div>
			</Navbar>
		);
	}
}

const Footer = (): JSX.Element => {
	var social_media_icon: string[][];
	var nav_link: string[][]

	social_media_icon = [
		[Youtube, 'https://www.youtube.com/channel/UCsSf5dUsiQYfEucaJlusXng'],
		[Twitter, '/'],
		[Pinterest, '/'],
		[Instagram],
		[Facebook, 'https://facebook.com/TheSillyCoder']
	]
	nav_link = [
		['Home', '/'],
		['News', '/'],
		['Database', '/database'],
		['Map', '/'],
		['Pricing', '/'],
		['Privacy Policy', '/']
	]
	return (
		<footer className='w-100 pt-5 pb-2 d-flex flex-column justify-content-center align-items-center'>
			<div className='d-flex flex-lg-row flex-column justify-content-center align-items-center w-100'>
				<div className='d-flex flex-column align-items-center me-lg-5 pe-lg-5 my-lg-0 my-5'>
					<img src={LogoLight}/>
					<div className='d-flex justify-content-between mt-4'>
						{social_media_icon.map(([icon, link])=><a className='mx-3' href={link}><img src={icon}/></a>)}
					</div>
				</div>
				<div className='d-grid nav-link fw-lighter me-lg-5 pe-lg-5 my-lg-0 my-5 text-nowrap'>
					{nav_link.map(([text, href]) => <a href={href} className='text-white text-decoration-none'>{text}</a>)}
				</div>
				<form className='my-lg-0 my-5'>
					<p className='fw-light text-light fs-5'>Get Updated</p>
					<input className='form-control mb-3 border-0 fw-lighter' type='email' name='email' placeholder='Email Address'/>
					<input className='form-control border-0' type='submit' name='submit' value='Subscribe'/>
				</form>
			</div>
			<p className='text-light fw-lighter m-0 mt-5'>Copyright © Cruisegator 2021. All rights reserved</p>
		</footer>
	)
}

export {Nav, Footer}