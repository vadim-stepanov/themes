import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
import { ThemeContext } from './theme'
import Header from './Header'

class ScreenA extends React.Component {
	render() {
		return (
			<ThemeContext.Consumer>
				{({ theme }) => (
					<View style={[styles.container, { backgroundColor: theme.primary }]}>
						<Text
							style={[styles.text, { fontSize: 60, fontWeight: 'bold', color: theme.secondary }]}
						>
							Screen A
						</Text>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenB')}>
							<Text style={[styles.text, { color: theme.secondary }]}>goto ScreenB</Text>
						</TouchableOpacity>
					</View>
				)}
			</ThemeContext.Consumer>
		)
	}
}

class ScreenB extends React.Component {
	render() {
		return (
			<ThemeContext.Consumer>
				{({ theme }) => (
					<View style={[styles.container, { backgroundColor: theme.primary }]}>
						<Text
							style={[styles.text, { fontSize: 60, fontWeight: 'bold', color: theme.secondary }]}
						>
							Screen B
						</Text>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenC')}>
							<Text style={[styles.text, { color: theme.secondary }]}>goto ScreenC</Text>
						</TouchableOpacity>
					</View>
				)}
			</ThemeContext.Consumer>
		)
	}
}

let lastSwitch = false
class ScreenC extends React.Component {
	constructor(props) {
		super(props)
		this.state = { switch: lastSwitch }
	}

	componentWillUnmount() {
		lastSwitch = this.state.switch
	}

	_toggleSwitch = toggle => value => {
		this.setState({ switch: value })
		toggle()
	}

	render() {
		return (
			<ThemeContext.Consumer>
				{({ theme, toggleTheme }) => (
					<View style={[styles.container, { backgroundColor: theme.primary }]}>
						<Text
							style={[styles.text, { fontSize: 60, fontWeight: 'bold', color: theme.secondary }]}
						>
							Screen C
						</Text>
						<View style={styles.switcher}>
							<Text style={[styles.switcherText, { color: theme.secondary }]}>white</Text>
							<Switch
								onValueChange={this._toggleSwitch(toggleTheme)}
								value={this.state.switch}
								thumbColor={theme.secondary}
							/>
							<Text style={[styles.switcherText, { color: theme.secondary }]}>dark</Text>
						</View>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenA')}>
							<Text style={[styles.text, { color: theme.secondary }]}>goto ScreenA</Text>
						</TouchableOpacity>
					</View>
				)}
			</ThemeContext.Consumer>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	text: {
		fontSize: 30,
	},
	switcher: {
		flexDirection: 'row',
	},
	switcherText: {
		fontSize: 24,
		marginHorizontal: 10,
	},
})

const AppNavigator = createStackNavigator(
	{
		ScreenA: {
			screen: ScreenA,
			navigationOptions: ({ navigation }) => {
				return {
					header: <Header navigation={navigation} title="Screen A" back={false} />,
				}
			},
		},
		ScreenB: {
			screen: ScreenB,
			navigationOptions: ({ navigation }) => {
				return {
					header: <Header navigation={navigation} title="Screen B" back={true} />,
				}
			},
		},
		ScreenC: {
			screen: ScreenC,
			navigationOptions: ({ navigation }) => {
				return {
					header: <Header navigation={navigation} title="Screen C" back={true} />,
				}
			},
		},
	},
	{
		initialRouteName: 'ScreenA',
		gesturesEnabled: true,

		transitionConfig: () => ({
			screenInterpolator: sceneProps => {
				return StackViewStyleInterpolator.forHorizontal(sceneProps)
			},
		}),
	}
)

export default AppNavigator
