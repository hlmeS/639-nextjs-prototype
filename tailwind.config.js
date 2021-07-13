const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				gray: colors.coolGray,
				// blue: colors.lightBlue,
				red: colors.rose,
				pink: colors.fuchsia,
				orange: colors.orange,
			},
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {
		extend: {},
	},
	// eslint-disable-next-line global-require
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
}
