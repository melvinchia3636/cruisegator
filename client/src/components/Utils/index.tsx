import React, { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ReactAnime from "react-animejs";

interface INavProps {
	className: string
}

const Nav: React.FC<INavProps> = (): JSX.Element => {
	const page = [["Home"], ["Database", "ship"], ["Map"], ["News"]];
	const pathname = location.pathname.match(/\/(.*?)(?:\/|$)/) || [];
	const pagename = pathname[pathname.length-1] || "home";
	const {Anime, stagger} = ReactAnime;
	const [isNavToggle, setNavToggle] = useState(false);
	const [firstTime, setFirstTime] = useState(true);
	const [isDown, setDown] = useState(false);

	useEffect(() => {
		document.addEventListener("scroll", () => {
			setDown((document.querySelector("html")?.scrollTop || false) > 100);
		});
	}, []);

	return <nav className={"sticky top-0 left-0 z-[9999] transition-all " + (pagename === "map" || isDown ? "bg-white" : "")}>
		<div className={`absolute top-0 left-0 w-screen h-screen transform overflow-hidden ${!firstTime ? (isNavToggle ? "rounded-animation-on" : "rounded-animation-off") : "-translate-y-full"} ${pagename === "database" ? "" : "bg-white"}`}>
			{isNavToggle ? <Anime initial={[
				{
					targets: ".phone-nav li",
					translateX: ["-1000%", "0%"],
					delay: stagger(200, {start: 300}),
					easing: "spring(1, 80, 100, 0)"
				}
			]} className="h-full">
				<ul className="font-medium text-xl phone-nav flex flex-col justify-center items-center h-full gap-24">
					{page.map(e => 
						<li key={e[0]}>
							<a href={`/${e[0]}`} className={`${e.map(e => e.toLowerCase()).includes(pagename) ? "active": ""}`}>{e[0]}</a>
						</li>)}
				</ul>
			</Anime> : ""}
		</div>
		<div className="mx-8 lg:mx-32 border-gray-200 border-b-2 py-6 flex items-center justify-between relative z-[9999]">
			<a href="/">
				<svg className="h-10" viewBox="0 0 257 49" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M17.8648 4.08333C17.4586 4.08333 17.0692 4.24465 16.782 4.53182C16.4948 4.81898 16.3335 5.20846 16.3335 5.61458V10.2083H11.7398C11.3336 10.2083 10.9442 10.3697 10.657 10.6568C10.3698 10.944 10.2085 11.3335 10.2085 11.7396V21.4661L7.22767 22.5584C7.02863 22.6311 6.84686 22.7443 6.69384 22.8909C6.54083 23.0375 6.41991 23.2143 6.33873 23.41C6.25755 23.6058 6.21789 23.8162 6.22225 24.0281C6.22661 24.24 6.27489 24.4486 6.36405 24.6409L11.1313 34.888C11.8286 34.6579 12.5799 34.6483 13.2828 34.8605C13.9857 35.0728 14.6061 35.4966 15.0595 36.0742L9.84509 24.8614L23.2935 19.9369C24.0774 19.6498 24.9369 19.6461 25.7231 19.9267L39.5554 24.8634L34.2022 35.7761C34.6889 35.2809 35.3096 34.9383 35.988 34.7904C36.6665 34.6424 37.3734 34.6955 38.0221 34.9431L43.061 24.6715C43.1561 24.4778 43.2092 24.2663 43.2169 24.0507C43.2245 23.8351 43.1865 23.6203 43.1054 23.4204C43.0242 23.2205 42.9017 23.04 42.7459 22.8907C42.5902 22.7415 42.4046 22.6268 42.2014 22.5543L38.7918 21.3375V11.7396C38.7918 11.3335 38.6305 10.944 38.3433 10.6568C38.0562 10.3697 37.6667 10.2083 37.2606 10.2083H32.6668V5.61458C32.6668 5.20846 32.5055 4.81898 32.2183 4.53182C31.9312 4.24465 31.5417 4.08333 31.1356 4.08333H17.8648ZM29.6043 10.2083H19.396V7.14583H29.6043V10.2083ZM35.7293 13.2708V20.2452L26.7521 17.0418C25.2919 16.5213 23.6955 16.5285 22.24 17.0622L13.271 20.3432V13.2708H35.7293Z" className={pagename==="ship" && !isDown ? "fill-[#FFFFFF]" : "fill-[#4189DD]"}/>
					<path d="M38.2346 37.9015L38.2285 37.881C38.1415 37.5606 37.9527 37.2771 37.6906 37.0732C37.4284 36.8694 37.1071 36.7563 36.7751 36.751C36.4431 36.7457 36.1183 36.8485 35.8498 37.0439C35.5813 37.2392 35.3836 37.5166 35.2864 37.8341V37.8382L35.2782 37.8565L35.2374 37.975C34.9785 38.6679 34.6231 39.3208 34.1819 39.9145C33.3917 40.966 32.2647 41.8541 30.6253 41.8541C28.9858 41.8541 27.8568 40.966 27.0667 39.9145C26.6 39.2863 26.2298 38.592 25.9682 37.8545L25.9621 37.8361C25.8663 37.5222 25.6722 37.2473 25.4083 37.052C25.1444 36.8568 24.8247 36.7515 24.4965 36.7518C24.1682 36.752 23.8487 36.8577 23.5851 37.0533C23.3215 37.2489 23.1277 37.5241 23.0323 37.8382V37.8402L23.0242 37.8606C22.9551 38.0615 22.8768 38.2591 22.7894 38.4527C22.6077 38.857 22.3259 39.3919 21.9319 39.9145C21.1458 40.966 20.0209 41.8541 18.3753 41.8541C16.7297 41.8541 15.6027 40.966 14.8146 39.9145C14.3501 39.2875 13.9819 38.5945 13.7223 37.8586L13.7162 37.8361C13.6197 37.5184 13.4225 37.2407 13.1544 37.0448C12.8863 36.849 12.5618 36.7455 12.2298 36.7501C11.8978 36.7547 11.5763 36.8671 11.3138 37.0704C11.0512 37.2736 10.8618 37.5567 10.7742 37.877L10.768 37.8953L10.7313 38.0056C10.491 38.684 10.1436 39.3195 9.70228 39.888C8.91828 40.8884 7.66879 41.8541 5.61487 41.8541C5.20876 41.8541 4.81928 42.0155 4.53211 42.3026C4.24495 42.5898 4.08362 42.9793 4.08362 43.3854C4.08362 43.7915 4.24495 44.181 4.53211 44.4681C4.81928 44.7553 5.20876 44.9166 5.61487 44.9166C8.82845 44.9166 10.8967 43.3303 12.1135 41.7786L12.2503 41.5969L12.3646 41.752C13.4916 43.2527 15.4271 44.9166 18.3753 44.9166C21.3235 44.9166 23.259 43.2527 24.3839 41.752L24.5003 41.5928L24.6187 41.7541C25.7457 43.2527 27.6812 44.9166 30.6253 44.9166C33.5694 44.9166 35.5049 43.2527 36.6319 41.752L36.7442 41.5989C36.787 41.6602 36.832 41.7173 36.8789 41.7765C38.0937 43.3303 40.166 44.9166 43.3857 44.9166C43.7918 44.9166 44.1813 44.7553 44.4685 44.4681C44.7556 44.181 44.917 43.7915 44.917 43.3854C44.917 42.9793 44.7556 42.5898 44.4685 42.3026C44.1813 42.0155 43.7918 41.8541 43.3857 41.8541C41.3195 41.8541 40.0721 40.8884 39.2922 39.89C38.8295 39.2919 38.4718 38.6195 38.2346 37.9015Z" className={pagename==="ship" && !isDown ? "fill-[#FFFFFF]" : "fill-[#4189DD]"}/>
					<path d="M66.184 24.832C66.184 22.656 66.6853 20.704 67.688 18.976C68.712 17.248 70.088 15.904 71.816 14.944C73.5653 13.9627 75.4747 13.472 77.544 13.472C79.912 13.472 82.0133 14.0587 83.848 15.232C85.704 16.384 87.048 18.0267 87.88 20.16H83.496C82.92 18.9867 82.12 18.112 81.096 17.536C80.072 16.96 78.888 16.672 77.544 16.672C76.072 16.672 74.76 17.0027 73.608 17.664C72.456 18.3253 71.5493 19.2747 70.888 20.512C70.248 21.7493 69.928 23.1893 69.928 24.832C69.928 26.4747 70.248 27.9147 70.888 29.152C71.5493 30.3893 72.456 31.3493 73.608 32.032C74.76 32.6933 76.072 33.024 77.544 33.024C78.888 33.024 80.072 32.736 81.096 32.16C82.12 31.584 82.92 30.7093 83.496 29.536H87.88C87.048 31.6693 85.704 33.312 83.848 34.464C82.0133 35.616 79.912 36.192 77.544 36.192C75.4533 36.192 73.544 35.712 71.816 34.752C70.088 33.7707 68.712 32.416 67.688 30.688C66.6853 28.96 66.184 27.008 66.184 24.832ZM95.798 20.928C96.3313 20.032 97.0353 19.3387 97.91 18.848C98.806 18.336 99.862 18.08 101.078 18.08V21.856H100.15C98.7207 21.856 97.6327 22.2187 96.886 22.944C96.1607 23.6693 95.798 24.928 95.798 26.72V36H92.15V18.368H95.798V20.928ZM120.399 18.368V36H116.751V33.92C116.175 34.6453 115.418 35.2213 114.479 35.648C113.562 36.0533 112.581 36.256 111.535 36.256C110.149 36.256 108.901 35.968 107.791 35.392C106.703 34.816 105.839 33.9627 105.199 32.832C104.581 31.7013 104.271 30.336 104.271 28.736V18.368H107.887V28.192C107.887 29.7707 108.282 30.9867 109.071 31.84C109.861 32.672 110.938 33.088 112.303 33.088C113.669 33.088 114.746 32.672 115.535 31.84C116.346 30.9867 116.751 29.7707 116.751 28.192V18.368H120.399ZM127.069 16.032C126.407 16.032 125.853 15.808 125.405 15.36C124.957 14.912 124.733 14.3573 124.733 13.696C124.733 13.0347 124.957 12.48 125.405 12.032C125.853 11.584 126.407 11.36 127.069 11.36C127.709 11.36 128.253 11.584 128.701 12.032C129.149 12.48 129.373 13.0347 129.373 13.696C129.373 14.3573 129.149 14.912 128.701 15.36C128.253 15.808 127.709 16.032 127.069 16.032ZM128.861 18.368V36H125.213V18.368H128.861ZM140.05 36.288C138.663 36.288 137.415 36.0427 136.306 35.552C135.218 35.04 134.354 34.3573 133.714 33.504C133.074 32.6293 132.733 31.6587 132.69 30.592H136.466C136.53 31.3387 136.882 31.968 137.522 32.48C138.183 32.9707 139.005 33.216 139.986 33.216C141.01 33.216 141.799 33.024 142.354 32.64C142.93 32.2347 143.218 31.7227 143.218 31.104C143.218 30.4427 142.898 29.952 142.258 29.632C141.639 29.312 140.647 28.96 139.282 28.576C137.959 28.2133 136.882 27.8613 136.05 27.52C135.218 27.1787 134.493 26.656 133.874 25.952C133.277 25.248 132.978 24.32 132.978 23.168C132.978 22.2293 133.255 21.376 133.81 20.608C134.365 19.8187 135.154 19.2 136.178 18.752C137.223 18.304 138.418 18.08 139.762 18.08C141.767 18.08 143.378 18.592 144.594 19.616C145.831 20.6187 146.493 21.9947 146.578 23.744H142.93C142.866 22.9547 142.546 22.3253 141.97 21.856C141.394 21.3867 140.615 21.152 139.634 21.152C138.674 21.152 137.938 21.3333 137.426 21.696C136.914 22.0587 136.658 22.5387 136.658 23.136C136.658 23.6053 136.829 24 137.17 24.32C137.511 24.64 137.927 24.896 138.418 25.088C138.909 25.2587 139.634 25.4827 140.594 25.76C141.874 26.1013 142.919 26.4533 143.73 26.816C144.562 27.1573 145.277 27.6693 145.874 28.352C146.471 29.0347 146.781 29.9413 146.802 31.072C146.802 32.0747 146.525 32.9707 145.97 33.76C145.415 34.5493 144.626 35.168 143.602 35.616C142.599 36.064 141.415 36.288 140.05 36.288ZM166.904 26.752C166.904 27.4133 166.861 28.0107 166.776 28.544H153.304C153.41 29.952 153.933 31.0827 154.872 31.936C155.81 32.7893 156.962 33.216 158.328 33.216C160.29 33.216 161.677 32.3947 162.488 30.752H166.424C165.89 32.3733 164.92 33.7067 163.512 34.752C162.125 35.776 160.397 36.288 158.328 36.288C156.642 36.288 155.128 35.9147 153.784 35.168C152.461 34.4 151.416 33.3333 150.648 31.968C149.901 30.5813 149.528 28.9813 149.528 27.168C149.528 25.3547 149.89 23.7653 150.616 22.4C151.362 21.0133 152.397 19.9467 153.72 19.2C155.064 18.4533 156.6 18.08 158.328 18.08C159.992 18.08 161.474 18.4427 162.776 19.168C164.077 19.8933 165.09 20.9173 165.816 22.24C166.541 23.5413 166.904 25.0453 166.904 26.752ZM163.096 25.6C163.074 24.256 162.594 23.1787 161.656 22.368C160.717 21.5573 159.554 21.152 158.168 21.152C156.909 21.152 155.832 21.5573 154.936 22.368C154.04 23.1573 153.506 24.2347 153.336 25.6H163.096ZM177.598 18.08C178.963 18.08 180.168 18.3573 181.214 18.912C182.28 19.4453 183.112 20.1173 183.71 20.928V18.368H187.39V36.288C187.39 37.9093 187.048 39.3493 186.366 40.608C185.683 41.888 184.691 42.8907 183.39 43.616C182.11 44.3413 180.574 44.704 178.782 44.704C176.392 44.704 174.408 44.1387 172.83 43.008C171.251 41.8987 170.355 40.384 170.142 38.464H173.758C174.035 39.3813 174.622 40.1173 175.518 40.672C176.435 41.248 177.523 41.536 178.782 41.536C180.254 41.536 181.438 41.088 182.334 40.192C183.251 39.296 183.71 37.9947 183.71 36.288V33.344C183.091 34.176 182.248 34.88 181.182 35.456C180.136 36.0107 178.942 36.288 177.598 36.288C176.062 36.288 174.654 35.904 173.374 35.136C172.115 34.3467 171.112 33.2587 170.366 31.872C169.64 30.464 169.278 28.8747 169.278 27.104C169.278 25.3333 169.64 23.7653 170.366 22.4C171.112 21.0347 172.115 19.9787 173.374 19.232C174.654 18.464 176.062 18.08 177.598 18.08ZM183.71 27.168C183.71 25.952 183.454 24.896 182.942 24C182.451 23.104 181.8 22.4213 180.99 21.952C180.179 21.4827 179.304 21.248 178.366 21.248C177.427 21.248 176.552 21.4827 175.742 21.952C174.931 22.4 174.27 23.072 173.758 23.968C173.267 24.8427 173.022 25.888 173.022 27.104C173.022 28.32 173.267 29.3867 173.758 30.304C174.27 31.2213 174.931 31.9253 175.742 32.416C176.574 32.8853 177.448 33.12 178.366 33.12C179.304 33.12 180.179 32.8853 180.99 32.416C181.8 31.9467 182.451 31.264 182.942 30.368C183.454 29.4507 183.71 28.384 183.71 27.168ZM190.965 27.104C190.965 25.3333 191.328 23.7653 192.053 22.4C192.8 21.0347 193.803 19.9787 195.061 19.232C196.341 18.464 197.749 18.08 199.285 18.08C200.672 18.08 201.877 18.3573 202.901 18.912C203.947 19.4453 204.779 20.1173 205.397 20.928V18.368H209.077V36H205.397V33.376C204.779 34.208 203.936 34.9013 202.869 35.456C201.803 36.0107 200.587 36.288 199.221 36.288C197.707 36.288 196.32 35.904 195.061 35.136C193.803 34.3467 192.8 33.2587 192.053 31.872C191.328 30.464 190.965 28.8747 190.965 27.104ZM205.397 27.168C205.397 25.952 205.141 24.896 204.629 24C204.139 23.104 203.488 22.4213 202.677 21.952C201.867 21.4827 200.992 21.248 200.053 21.248C199.115 21.248 198.24 21.4827 197.429 21.952C196.619 22.4 195.957 23.072 195.445 23.968C194.955 24.8427 194.709 25.888 194.709 27.104C194.709 28.32 194.955 29.3867 195.445 30.304C195.957 31.2213 196.619 31.9253 197.429 32.416C198.261 32.8853 199.136 33.12 200.053 33.12C200.992 33.12 201.867 32.8853 202.677 32.416C203.488 31.9467 204.139 31.264 204.629 30.368C205.141 29.4507 205.397 28.384 205.397 27.168ZM218.125 21.344V31.104C218.125 31.7653 218.274 32.2453 218.573 32.544C218.893 32.8213 219.426 32.96 220.173 32.96H222.413V36H219.533C217.89 36 216.631 35.616 215.757 34.848C214.882 34.08 214.445 32.832 214.445 31.104V21.344H212.365V18.368H214.445V13.984H218.125V18.368H222.413V21.344H218.125ZM233.423 36.288C231.759 36.288 230.255 35.9147 228.911 35.168C227.567 34.4 226.511 33.3333 225.743 31.968C224.975 30.5813 224.591 28.9813 224.591 27.168C224.591 25.376 224.986 23.7867 225.775 22.4C226.564 21.0133 227.642 19.9467 229.007 19.2C230.372 18.4533 231.898 18.08 233.583 18.08C235.268 18.08 236.794 18.4533 238.159 19.2C239.524 19.9467 240.602 21.0133 241.391 22.4C242.18 23.7867 242.575 25.376 242.575 27.168C242.575 28.96 242.17 30.5493 241.359 31.936C240.548 33.3227 239.439 34.4 238.031 35.168C236.644 35.9147 235.108 36.288 233.423 36.288ZM233.423 33.12C234.362 33.12 235.236 32.896 236.047 32.448C236.879 32 237.551 31.328 238.063 30.432C238.575 29.536 238.831 28.448 238.831 27.168C238.831 25.888 238.586 24.8107 238.095 23.936C237.604 23.04 236.954 22.368 236.143 21.92C235.332 21.472 234.458 21.248 233.519 21.248C232.58 21.248 231.706 21.472 230.895 21.92C230.106 22.368 229.476 23.04 229.007 23.936C228.538 24.8107 228.303 25.888 228.303 27.168C228.303 29.0667 228.783 30.5387 229.743 31.584C230.724 32.608 231.951 33.12 233.423 33.12ZM249.829 20.928C250.363 20.032 251.067 19.3387 251.941 18.848C252.837 18.336 253.893 18.08 255.109 18.08V21.856H254.181C252.752 21.856 251.664 22.2187 250.917 22.944C250.192 23.6693 249.829 24.928 249.829 26.72V36H246.181V18.368H249.829V20.928Z" className={pagename==="ship" && !isDown ? "fill-[#FFFFFF]" : "fill-[#4189DD]"}/>
				</svg>
			</a>
			<div className="hidden xl:flex">
				{page.map((e, i) => <a key={i} href={`/${e[0].toLowerCase()}`} className={`font-medium ml-24 ${pagename==="ship" && !isDown ? "text-white" : ""} ${e.map(e => e.toLowerCase()).includes(pagename) ? "active": ""}`}>{e[0]}</a>)}
			</div>
			<button onClick={() => {setNavToggle(!isNavToggle); setFirstTime(false);}} className="flex items-center justify-center xl:hidden"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2.6em" height="2.6em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 16"><g fill="none"><path d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z" fill="#4189DD"/><path d="M11 11a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8z" fill="#4189DD"/></g></svg></button>
		</div>
	</nav>;
};

const Footer = (): JSX.Element => {
	const nav_link: [string, string[][]][] = [
		["Our Features", [
			["Home", "/"],
			["Database", "/database"],
			["Map", "/map"],
			["News", "/"],
		]], 
		["About Us", [
			["Stories", "/"],
			["Old Designs", "/database"],
			["Inspirations", "/map"],
			["Thoughts", "/"],
		]],
	];
	return (<footer className="w-100 pt-24 flex flex-col justify-center items-center bg-blue-700">
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[repeat(4,auto)] gap-y-24 justify-between w-[calc(100%-6rem)] sm:w-[calc(100%-16rem)] sm:mx-32 pb-12 border-b-2 border-gray-200">
			<svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M32.8965 9.83301C32.2169 9.83301 31.5651 10.103 31.0846 10.5835C30.604 11.0641 30.334 11.7159 30.334 12.3955V20.083H22.6465C21.9669 20.083 21.3151 20.353 20.8346 20.8335C20.354 21.3141 20.084 21.9659 20.084 22.6455V38.9225L15.0957 40.7504C14.7626 40.8721 14.4584 41.0616 14.2023 41.307C13.9463 41.5523 13.7439 41.8481 13.6081 42.1757C13.4722 42.5032 13.4058 42.8555 13.4131 43.21C13.4204 43.5645 13.5012 43.9137 13.6504 44.2354L21.6284 61.3837C22.7952 60.9985 24.0525 60.9825 25.2288 61.3377C26.4051 61.6929 27.4433 62.4022 28.202 63.3688L19.4759 44.6044L41.9814 36.3634C43.2931 35.883 44.7316 35.8769 46.0473 36.3463L69.1952 44.6078L60.2367 62.8699C61.0513 62.0412 62.0899 61.4679 63.2252 61.2203C64.3606 60.9727 65.5436 61.0616 66.6293 61.4759L75.0616 44.2867C75.2208 43.9626 75.3097 43.6086 75.3225 43.2478C75.3353 42.887 75.2717 42.5275 75.1359 42.193C75.0001 41.8585 74.7951 41.5564 74.5344 41.3066C74.2737 41.0569 73.9632 40.865 73.6232 40.7436L67.9174 38.7073V22.6455C67.9174 21.9659 67.6474 21.3141 67.1668 20.8335C66.6863 20.353 66.0345 20.083 65.3549 20.083H57.6674V12.3955C57.6674 11.7159 57.3974 11.0641 56.9168 10.5835C56.4363 10.103 55.7845 9.83301 55.1049 9.83301H32.8965ZM52.5424 20.083H35.459V14.958H52.5424V20.083ZM62.7924 25.208V36.8793L47.7693 31.5186C45.3256 30.6476 42.6541 30.6597 40.2184 31.5528L25.209 37.0433V25.208H62.7924Z" fill="#4189DD"/>
				<path d="M66.9846 66.4265L66.9743 66.3923C66.8288 65.856 66.5128 65.3815 66.0742 65.0405C65.6355 64.6994 65.0978 64.5101 64.5422 64.5013C63.9865 64.4924 63.4431 64.6644 62.9937 64.9913C62.5444 65.3182 62.2135 65.7823 62.0509 66.3137V66.3205L62.0372 66.3513L61.9689 66.5495C61.5356 67.7091 60.9409 68.8018 60.2025 69.7953C58.8802 71.5549 56.9942 73.0411 54.2506 73.0411C51.5071 73.0411 49.6176 71.5549 48.2954 69.7953C47.5145 68.744 46.895 67.5821 46.4572 66.3479L46.447 66.3171C46.2867 65.7917 45.9617 65.3317 45.5201 65.005C45.0785 64.6783 44.5436 64.5021 43.9943 64.5025C43.4449 64.5029 42.9103 64.6798 42.4691 65.0071C42.0279 65.3345 41.7037 65.7949 41.5441 66.3205V66.324L41.5304 66.3581C41.4148 66.6943 41.2837 67.0249 41.1375 67.349C40.8334 68.0255 40.3619 68.9206 39.7025 69.7953C38.3871 71.5549 36.5045 73.0411 33.7506 73.0411C30.9968 73.0411 29.1108 71.5549 27.792 69.7953C27.0146 68.746 26.3985 67.5863 25.9641 66.3547L25.9538 66.3171C25.7923 65.7855 25.4623 65.3207 25.0137 64.9929C24.565 64.6651 24.022 64.492 23.4664 64.4998C22.9108 64.5075 22.3728 64.6956 21.9334 65.0357C21.494 65.3758 21.1771 65.8495 21.0304 66.3855L21.0202 66.4162L20.9587 66.6007C20.5565 67.736 19.9752 68.7995 19.2367 69.7509C17.9247 71.425 15.8337 73.0411 12.3965 73.0411C11.7169 73.0411 11.0651 73.3111 10.5845 73.7917C10.104 74.2722 9.83398 74.924 9.83398 75.6036C9.83398 76.2833 10.104 76.935 10.5845 77.4156C11.0651 77.8962 11.7169 78.1661 12.3965 78.1661C17.7743 78.1661 21.2354 75.5114 23.2717 72.9147L23.5007 72.6106L23.692 72.8703C25.578 75.3816 28.817 78.1661 33.7506 78.1661C38.6843 78.1661 41.9233 75.3816 43.8059 72.8703L44.0006 72.6038L44.1988 72.8737C46.0848 75.3816 49.3238 78.1661 54.2506 78.1661C59.1775 78.1661 62.4165 75.3816 64.3025 72.8703L64.4904 72.614C64.5621 72.7165 64.6373 72.8122 64.7159 72.9113C66.7488 75.5114 70.2167 78.1661 75.6048 78.1661C76.2844 78.1661 76.9362 77.8962 77.4168 77.4156C77.8973 76.935 78.1673 76.2833 78.1673 75.6036C78.1673 74.924 77.8973 74.2722 77.4168 73.7917C76.9362 73.3111 76.2844 73.0411 75.6048 73.0411C72.1471 73.0411 70.0596 71.425 68.7544 69.7543C67.9801 68.7534 67.3816 67.628 66.9846 66.4265V66.4265Z" fill="#4189DD"/>
			</svg>
			{nav_link.map(([name, items]) => (
				<div key={name}>
					<h4 className="font-semibold text-2xl text-blue-800">{name}</h4>
					{items.map(([text, href]) => <a className="font-medium text-lg flex my-4" href={href} key={text}>{text}</a>)}
				</div>
			))}
			<form className="max-w-[24rem]">
				<h4 className="font-semibold text-2xl text-blue-800">Subscribe Us</h4>
				<p className="font-medium text-md leading-[139%] mt-2 mb-6">Get the latest news from our website everyday though email</p>
				<div className="flex rounded-md">
					<div className="bg-white h-full pl-2 py-2 rounded-l-md">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 1.9502C6.48 1.9502 2 6.4302 2 11.9502C2 17.4702 6.48 21.9502 12 21.9502H17V19.9502H12C7.66 19.9502 4 16.2902 4 11.9502C4 7.6102 7.66 3.9502 12 3.9502C16.34 3.9502 20 7.6102 20 11.9502V13.3802C20 14.1702 19.29 14.9502 18.5 14.9502C17.71 14.9502 17 14.1702 17 13.3802V11.9502C17 9.1902 14.76 6.9502 12 6.9502C9.24 6.9502 7 9.1902 7 11.9502C7 14.7102 9.24 16.9502 12 16.9502C13.38 16.9502 14.64 16.3902 15.54 15.4802C16.19 16.3702 17.31 16.9502 18.5 16.9502C20.47 16.9502 22 15.3502 22 13.3802V11.9502C22 6.4302 17.52 1.9502 12 1.9502ZM12 14.9502C10.34 14.9502 9 13.6102 9 11.9502C9 10.2902 10.34 8.9502 12 8.9502C13.66 8.9502 15 10.2902 15 11.9502C15 13.6102 13.66 14.9502 12 14.9502Z" fill="#C4CBD4"/>
						</svg>
					</div>
					<input className="border-0 fw-lighter block w-full px-2 py-2 bg-white placeholder-gray-200 rounded-none" type="email" name="email" placeholder="Email Address"/>
					<input className="border-0 block px-6 py-2 bg-blue-800 text-white font-medium tracking-wider rounded-r-md rounded-l-none" type="submit" name="submit" value="Send"/>
				</div>
				<div className="flex gap-6 mt-8">
					<a>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M16.8047 8.27572C17.4011 8.27572 17.8847 7.79219 17.8847 7.19572C17.8847 6.59925 17.4011 6.11572 16.8047 6.11572C16.2082 6.11572 15.7247 6.59925 15.7247 7.19572C15.7247 7.79219 16.2082 8.27572 16.8047 8.27572Z" fill="#4189DD"/>
							<path d="M12 7.37842C11.0859 7.37842 10.1924 7.64946 9.43241 8.15728C8.67241 8.6651 8.08006 9.38688 7.73027 10.2313C7.38048 11.0758 7.28896 12.005 7.46728 12.9015C7.6456 13.798 8.08576 14.6215 8.73209 15.2678C9.37842 15.9141 10.2019 16.3543 11.0984 16.5326C11.9949 16.7109 12.9241 16.6194 13.7686 16.2696C14.613 15.9198 15.3348 15.3275 15.8426 14.5675C16.3504 13.8075 16.6215 12.914 16.6215 11.9999C16.6215 10.7742 16.1346 9.59872 15.2679 8.73202C14.4012 7.86532 13.2257 7.37842 12 7.37842ZM12 14.9999C11.4066 14.9999 10.8266 14.824 10.3333 14.4943C9.83992 14.1647 9.4554 13.6961 9.22834 13.148C9.00128 12.5998 8.94187 11.9966 9.05762 11.4146C9.17338 10.8327 9.4591 10.2982 9.87866 9.8786C10.2982 9.45904 10.8328 9.17332 11.4147 9.05756C11.9967 8.94181 12.5999 9.00122 13.148 9.22828C13.6962 9.45534 14.1647 9.83986 14.4944 10.3332C14.824 10.8266 15 11.4066 15 11.9999C15 12.7956 14.6839 13.5586 14.1213 14.1212C13.5587 14.6838 12.7956 14.9999 12 14.9999Z" fill="#4189DD"/>
							<path d="M12 4.6215C14.403 4.6215 14.688 4.6305 15.6368 4.674C16.2074 4.68077 16.7726 4.78555 17.3077 4.98375C17.696 5.13352 18.0486 5.36291 18.3428 5.65716C18.6371 5.95141 18.8665 6.304 19.0163 6.69225C19.2145 7.2274 19.3192 7.79262 19.326 8.36325C19.3695 9.312 19.3785 9.597 19.3785 12.0007C19.3785 14.4045 19.3695 14.688 19.326 15.6368C19.3192 16.2074 19.2145 16.7726 19.0163 17.3077C18.8665 17.696 18.6371 18.0486 18.3428 18.3428C18.0486 18.6371 17.696 18.8665 17.3077 19.0163C16.7726 19.2145 16.2074 19.3192 15.6368 19.326C14.688 19.3695 14.403 19.3785 12 19.3785C9.597 19.3785 9.312 19.3695 8.36325 19.326C7.79262 19.3192 7.2274 19.2145 6.69225 19.0163C6.304 18.8665 5.95141 18.6371 5.65716 18.3428C5.36291 18.0486 5.13352 17.696 4.98375 17.3077C4.78555 16.7726 4.68077 16.2074 4.674 15.6368C4.6305 14.688 4.6215 14.403 4.6215 12C4.6215 9.597 4.6305 9.312 4.674 8.36325C4.68077 7.79262 4.78555 7.2274 4.98375 6.69225C5.13352 6.304 5.36291 5.95141 5.65716 5.65716C5.95141 5.36291 6.304 5.13352 6.69225 4.98375C7.2274 4.78555 7.79262 4.68077 8.36325 4.674C9.312 4.6305 9.597 4.6215 12 4.6215ZM12 3C9.55575 3 9.249 3.0105 8.289 3.054C7.54258 3.06907 6.80412 3.21058 6.105 3.4725C5.50704 3.70372 4.96399 4.05733 4.51066 4.51066C4.05733 4.96399 3.70372 5.50704 3.4725 6.105C3.21049 6.80435 3.06899 7.54308 3.054 8.28975C3.0105 9.24975 3 9.555 3 12C3 14.445 3.0105 14.751 3.054 15.711C3.06907 16.4574 3.21058 17.1959 3.4725 17.895C3.70372 18.493 4.05733 19.036 4.51066 19.4893C4.96399 19.9427 5.50704 20.2963 6.105 20.5275C6.80435 20.7895 7.54308 20.931 8.28975 20.946C9.24975 20.9895 9.55575 21 12 21C14.4443 21 14.751 20.9895 15.711 20.946C16.4577 20.931 17.1964 20.7895 17.8958 20.5275C18.4937 20.2963 19.0368 19.9427 19.4901 19.4893C19.9434 19.036 20.297 18.493 20.5282 17.895C20.79 17.1956 20.9313 16.4569 20.946 15.7103C20.9895 14.7503 21 14.445 21 12C21 9.555 20.9895 9.249 20.946 8.289C20.9309 7.54258 20.7894 6.80412 20.5275 6.105C20.2963 5.50704 19.9427 4.96399 19.4893 4.51066C19.036 4.05733 18.493 3.70372 17.895 3.4725C17.1956 3.21075 16.4569 3.0695 15.7103 3.05475C14.7503 3.00975 14.445 3 12 3Z" fill="#4189DD"/>
						</svg>
					</a>
					<a>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12.006 19.012H11.986C11.924 19.012 5.721 19 4.156 18.575C3.73314 18.4611 3.34762 18.2381 3.03804 17.9283C2.72846 17.6186 2.50568 17.2329 2.392 16.81C2.11059 15.2224 1.97469 13.6123 1.986 12C1.97874 10.385 2.11831 8.77271 2.403 7.183C2.51989 6.75937 2.7437 6.3729 3.05295 6.06067C3.36221 5.74844 3.74652 5.52094 4.169 5.4C5.691 5 11.723 5 11.979 5H12C12.063 5 18.282 5.012 19.831 5.437C20.69 5.67 21.361 6.341 21.593 7.2C21.883 8.794 22.02 10.411 22 12.031C22.007 13.644 21.8671 15.2543 21.582 16.842C21.4668 17.2645 21.2432 17.6494 20.9332 17.9587C20.6232 18.268 20.2377 18.4908 19.815 18.605C18.295 19.008 12.262 19.012 12.006 19.012ZM10.006 9.005L10.001 15.005L15.213 12.005L10.006 9.005Z" fill="#4189DD"/>
						</svg>
					</a>
					<a>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M13.397 20.9972V12.8012H16.162L16.573 9.59217H13.397V7.54817C13.397 6.62217 13.655 5.98817 14.984 5.98817H16.668V3.12717C15.8487 3.03936 15.0251 2.99696 14.201 3.00017C11.757 3.00017 10.079 4.49217 10.079 7.23117V9.58617H7.33203V12.7952H10.085V20.9972H13.397Z" fill="#4189DD"/>
						</svg>
					</a>
					<a>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M12.026 2C6.517 2 2.052 6.465 2.052 11.974C2.052 16.38 4.909 20.119 8.873 21.439C9.372 21.529 9.552 21.222 9.552 20.958C9.552 20.721 9.544 20.093 9.541 19.262C6.766 19.864 6.18 17.924 6.18 17.924C5.728 16.772 5.073 16.465 5.073 16.465C4.168 15.846 5.142 15.86 5.142 15.86C6.144 15.93 6.669 16.888 6.669 16.888C7.559 18.412 9.005 17.972 9.571 17.717C9.662 17.072 9.922 16.632 10.206 16.383C7.992 16.132 5.664 15.276 5.664 11.453C5.664 10.366 6.053 9.474 6.688 8.778C6.587 8.525 6.242 7.51 6.787 6.138C6.787 6.138 7.624 5.869 9.529 7.159C10.3426 6.93767 11.1818 6.8247 12.025 6.823C12.8682 6.82437 13.7075 6.93735 14.521 7.159C16.427 5.868 17.263 6.138 17.263 6.138C17.808 7.51 17.466 8.525 17.362 8.778C18.002 9.474 18.386 10.365 18.386 11.453C18.386 15.286 16.056 16.128 13.834 16.375C14.189 16.683 14.509 17.291 14.509 18.221C14.509 19.555 14.497 20.631 14.497 20.958C14.497 21.225 14.675 21.535 15.184 21.437C19.146 20.115 22 16.379 22 11.974C22 6.465 17.535 2 12.026 2Z" fill="#4189DD"/>
						</svg>
					</a>
				</div>
			</form>
		</div>
		<div className="flex justify-between w-full px-12 sm:px-32 gap-2 sm:gap-6 flex-col sm:flex-row items-center">
			<p className="text-blue-500 font-medium mt-5 sm:mb-5">Copyright © Cruisegator 2021.</p>
			<p className="text-blue-500 font-medium mb-5 sm:mt-5">Design by <span className="text-blue-800">Melvin Chia</span></p>
		</div>
	</footer>
	);
};

export {Nav, Footer};
