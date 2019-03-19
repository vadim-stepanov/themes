import React from 'react'

export const themes = {
	light: {
		primary: '#fff',
		secondary: '#000',
	},
	dark: {
		primary: '#000',
		secondary: '#fff',
	},
}

export const ThemeContext = React.createContext({
	theme: themes.dark,
	toggleTheme: () => {},
})
