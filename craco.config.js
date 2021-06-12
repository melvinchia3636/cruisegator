module.exports = {
	style: {
	  postcss: {
		plugins: [
		  require('tailwindcss'),
		  require('autoprefixer'),
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
  }