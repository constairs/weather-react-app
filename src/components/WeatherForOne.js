import React, { Component } from 'react'
import moment from 'moment'
import momentru from 'moment/locale/ru.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faSun, faUmbrella, faTimes } from '@fortawesome/free-solid-svg-icons'
import transleteToCyr from '../utils/translete.js'

class WeatherForOne extends Component {

	handleCloseModal = () => {
		
	}
	render () {

		const { city, list } = this.props.data
		return (
			<div className="modal-wrap" onClick={this.props.handleCloseModal}>
				<div className="modal">
					<span className="x-btn" onClick={this.props.onCloseModal}><FontAwesomeIcon icon={faTimes} /></span>
					{ city ?
					<div>
							<h2>{transleteToCyr(city.name)}</h2>
					<ul className="one-city-weather-list">
						{
							list.map((cur, i) => {
								return(
									<li className="list-item" key={i}>
										<p><span className="date">{moment(cur.dt_txt).format('D MMM')}</span> <br/>{moment(cur.dt_txt).format('h:mm a')}</p>
										<div className="weather-pic">
										{
											cur.weather[0].main === 'Clouds' || cur.weather[0].main === 'Mist' ? <p className="weather-item__icon"><FontAwesomeIcon icon={faCloud} /></p> :
											cur.weather[0].main === 'Clear' ? <p className="weather-item__icon"><FontAwesomeIcon icon={faSun} /></p> :
											cur.weather[0].main === 'Rain' ? <p className="weather-item__icon"><FontAwesomeIcon icon={faUmbrella} /></p> :
											null
										}
										</div>
										<p>{cur.weather[0].description}</p>
										<p>{cur.main.temp > 200 ? (cur.main.temp - 278).toFixed() : cur.main.temp.toFixed()}&deg; C</p>
									</li>
								)
							})
						}
					</ul>
					</div>
					: null
					}
				</div>
				
			</div>
		)
	}

}

export default WeatherForOne