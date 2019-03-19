import React from 'react'
import { ThemeContext, themes } from './src/theme'
import AppNavigator from './src/AppNavigator'

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.toggleTheme = () => {
			this.setState(state => ({
				theme: state.theme === themes.dark ? themes.light : themes.dark,
			}))
		}

		this.state = {
			theme: themes.light,
			toggleTheme: this.toggleTheme,
		}
	}

	render() {
		return (
			<ThemeContext.Provider value={this.state}>
				<AppNavigator />
			</ThemeContext.Provider>
		)
	}
}
