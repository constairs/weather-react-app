import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as appActions from '../actions/AppActions'
import '../styles.sass'
import WeatherSelector from '../components/WeatherSelector'
import WeatherList from '../components/WeatherList'

class App extends Component {

	constructor(props) {
		super(props)
		this.state = ''
	}

	handleReqWeather = (cities) => {
		this.props.appActions.getWeatherForFavorites(cities)
	}


	render() {
		const { app } = this.props
		return (
			<div className="App">
				<h1>Header</h1>
				<WeatherSelector 
				onGetWeather={this.handleReqWeather} 
				// onSelectCity={this.handleReqWeather} 
				/>
				<WeatherList data={app} />
			</div>
		)
	}

}

function mapStateToProps(state) {
	return {
		app: state
	}
}

function mapDispatchtoProps(dispatch) {
	return {
		appActions: bindActionCreators(appActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchtoProps)(App)