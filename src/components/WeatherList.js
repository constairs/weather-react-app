import React, { Component } from 'react'
import WeatherItem from './WeatherItem'

class WeatherList extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		const { weather } = this.props.data

		return (
			<div className="weather-list">
				{
					weather.list ?
						weather.list.map((cur, i) => {
							return <WeatherItem weather={cur} key={i} />
						})
						// <div>Meh</div>
					:
					<p>Ничего нет</p>
				}
			</div>
		)
	}
}

export default WeatherList