import React, { Component } from 'react'
import moment from 'moment'
import momentru from 'moment/locale/ru.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faSun, faUmbrella } from '@fortawesome/free-solid-svg-icons'

function transleteToCyr (str) {
	let arrru = ['Я','я','Ю','ю','Ч','ч','Ш','ш','Щ','щ','Ж','ж','А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','ь','ъ','Э','э'];
	let arren = ['Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y',"'",'\'','E', 'e'];
	console.log(str)
	for(let i=0; i<arren.length; i++) {
		let reg = new RegExp(arren[i], 'g')
		
		str = str.replace(reg, arrru[i])
	}
	return str
}

class WeatherItem extends Component {

	render() {
		const { weather } = this.props
		return (
			<div>
			{ weather ?
			<div className="weather-item">
				{ weather.name ? <h2> {transleteToCyr(weather.name)} </h2> : <h2>{transleteToCyr("Dovol'noe")}</h2>}
				<div className="weather-item__main">
					{
						weather.weather[0].main === 'Clouds' ? <p className="weather-item__icon"><FontAwesomeIcon icon={faCloud} /></p> :
						weather.weather[0].main === 'Sun' ? <p className="weather-item__icon"><FontAwesomeIcon icon={faSun} /></p> :
						weather.weather[0].main === 'Rain' ? <p className="weather-item__icon"><FontAwesomeIcon icon={faUmbrella} /></p> :
						null
					}
					<p>{weather.weather[0].description}</p>
					<p>Температура: {weather.main.temp > 200 ? (weather.main.temp-273.15).toFixed() : weather.main.temp}&deg; C</p>
				</div>
				<p>{moment(weather.dt).format('LLL')}</p>
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