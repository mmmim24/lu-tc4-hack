// craco.config.js

const CracoLessPlugin = require("craco-less");

module.exports = {
	style: {
		postcss: {
			plugins: [require("tailwindcss"), require("autoprefixer")],
		},
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { "@primary-color": "#3c6e71ff" },
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
