/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				'montserrat': ['Montserrat', 'sans-serif'],
			}
		},
	},

	plugins: []
};

module.exports = config;
