module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
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
					300: "#CACFD5",
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
		boxShadow: {
			"default": "0px 4px 4px rgba(0, 0, 0, 0.25)",
			"gridbox": "0px 13px 12px rgba(0, 0, 0, 0.09)",
			"form": "0px 4px 6px rgba(0, 0, 0, 0.11)"
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
