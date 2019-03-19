import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ThemeContext } from './theme'

export default class Header extends React.Component {
	render() {
		return (
			<ThemeContext.Consumer>
				{({ theme }) => (
					<View style={[styles.container, { backgroundColor: theme.secondary }]}>
						<View style={styles.leftButton}>
							{this.props.back && (
								<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
									<Ionicons name="md-arrow-back" size={32} color={theme.primary} />
								</TouchableOpacity>
							)}
						</View>
						<View style={styles.title}>
							<Text style={[styles.titleText, { color: theme.primary }]}>{this.props.title}</Text>
						</View>
					</View>
				)}
			</ThemeContext.Consumer>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
		elevation: 15,
	},
	leftButton: {
		marginTop: 20,
		marginHorizontal: 20,
	},
	title: {
		marginTop: 16,
	},
	titleText: {
		fontSize: 20,
	},
})
