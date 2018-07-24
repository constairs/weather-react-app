import React, { Component } from 'react'
import WeatherItem from './WeatherItem'

class WeatherList extends Component {

	constructor(props) {
		super(props)
	}

	handleOpenCity = (id) => {
		this.props.onOpenCity(id)
	}

	render() {
		const { weather } = this.props.data

		return (
			<div className="weather-list">
				{
					weather.list ?
						weather.list.map((cur, i) => {
							return <WeatherItem onOpenCity={this.handleOpenCity} weather={cur} key={i} />
						})
					:
					<p>Ничего нет</p>
				}
			</div>
		)
	}
}

export default WeatherList