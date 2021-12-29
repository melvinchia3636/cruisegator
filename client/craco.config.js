module.exports = {
	style: {
		postcssOptions: {
			plugins: [
				require("tailwindcss"),
				require("autoprefixer"),
			],
		},
	},
	module: {
		rules: [
			{
				test: /\bmapbox-gl-csp-worker.js\b/i,
				use: { loader: "worker-loader" },
			},
		],
	},
};