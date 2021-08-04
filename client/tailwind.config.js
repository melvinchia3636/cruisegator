module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				blue: {
					700: "#E3EAF2",
					800: "#4189DD"
				},
				gray: {
					500: "#8E959E"
				}
			}
		},
		fontFamily: {
			"poppins": ["Poppins"]
		},
		boxShadow: {
			"default": "0px 4px 4px rgba(0, 0, 0, 0.25)"
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
