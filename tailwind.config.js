module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				blue: {
					800: "#0055B9"
				},
			}
		},
		fontFamily: {
			"poppins": ["Poppins"]
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
