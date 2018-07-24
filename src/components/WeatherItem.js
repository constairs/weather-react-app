import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faSun, faUmbrella } from '@fortawesome/free-solid-svg-icons'

import transleteToCyr from '../utils/translete.js'

class WeatherItem extends Component {

	handleOpenCity = () => {
		this.props.onOpenCity(this.props.weather.id)
	}

	render() {
		const { weather } = this.props
		return (
			<div onClick={this.handleOpenCity}>
			{ weather ?
			<div className="weather-item">
				{ weather.name ? <h2> {transleteToCyr(weather.name)} </h2>: null}
				<div className="weather-item__main">
					{
						weather.weather[0].main === 'Clouds' || weather.weather[0].main === 'Mist' ? <p className="weather-item__icon"><FontAwesomeIcon icon={faCloud} /></p> :
						weather.weather[0].main === 'Clear' ? <p className="weather-item__icon"><FontAwesomeIcon icon={faSun} /></p> :
						weather.weather[0].main === 'Rain' ? <p className="weather-item__icon"><FontAwesomeIcon icon={faUmbrella} /></p> :
						null
					}
					<p>{weather.weather[0].description}</p>
					<p>Температура: {weather.main.temp > 200 ? (weather.main.temp-273.15).toFixed() : weather.main.temp}&deg; C</p>
				</div>
				<p>Влажность: {weather.main.humidity}</p>
				<p>Ветер: {weather.wind.speed} м/с</p>
			</div>
			: null
			}
			</div>
		)
	}

}

export default WeatherItem