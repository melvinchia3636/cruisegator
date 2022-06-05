module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			colors: {
				blue: {
					500: "#90B3DD",
					600: "#C0D3EA",
					700: "#E3EAF2",
					800: "#4189DD"
				},
				gray: {
					100: "#F6F5F7",
					200: "#C4CBD4",
					300: "rgb(217, 222, 228)",
					500: "#8E959E"
				}
			},
			screens: {
				"480": "480px",
				"1170": "1170px",
				"1396": "1396px",
				"1440": "1440px",
			},
		},
		fontFamily: {
			"poppins": ["Poppins"]
		},
	},
	plugins: [],
};
