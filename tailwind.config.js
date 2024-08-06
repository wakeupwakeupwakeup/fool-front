/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
export default {
	darkMode: 'class',
	content: ['./src.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			white: '#fff',
			yellow: '#FFC700',
			red: '#FF0000',
			green: '#00EF26',
			blue: '#1F335C'
		},
		extend: {
			boxShadow: {
				'base-x1': '0 0 16px 0 rgba(0, 0, 0, 0.25)'
			},
			spacing: {
				'base-x1': '8px',
				'base-x2': '12px',
				'base-x3': '16px',
				'base-x4': '18px',
				'base-x5': '24px',
				'base-x6': '30px',
				'base-x7': '64px'
			},
			borderRadius: {
				'base-x1': '6px'
			},
			fontSize: {
				'base-x1': '10px',
				'base-x2': '14px',
				'base-x3': '20px'
			},
			backgroundImage: {
				'radial-gradient':
					'radial-gradient(50% 50%, rgb(0 178 255 / 39%) 0%, rgba(113, 162, 255, 0) 100%);'
			},
			backgroundColor: {
				gradient: 'rgba(113,194,229,7%)'
			}
		}
	}
}
