import React, { Component } from 'react'


class WeatherCityItem extends Component {

	render() {
		const { weather } = this.props 
		return (
			<div className="weather-city">
				<h2>{weather.city.name}</h2>
				<ul className="weather-city__list">
					{weather.list.map((el, i) => {
						return (<li key={i}>
							<p>{el.dt_txt}</p>
							<p>{el.weather[0].main} ({el.weather[0].description})</p>
							<p>Влажность: {el.main.humidity}</p>
							<p>Ветер: {el.wind.speed} м/с</p>
							<p>Температура: {el.main.temp - 273,15 }&deg; C</p>
						</li>)
					})}
				</ul>
			</div>
		)
	}

}

export default WeatherCityItem