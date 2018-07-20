import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

function getWeatherFromOWM(url) {
	// return new Promise((resolve, reject) => {

	// 	let xhr = new XMLHttpRequest()
	// 	xhr.overrideMimeType("application/json")
	// 	xhr.open("GET", url, true)
	// 	xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
	// 	xhr.onload = () => {
	// 		if (xhr.status !== 200) {
	// 			reject(xhr.statusText)
	// 		}
	// 		if (xhr.readyState === 4 && xhr.status === 200) {
	// 			let data = JSON.parse(xhr.responseText)
	// 			this.setState({ cities: res })
	// 			resolve(data)
	// 		}
	// 	}
	// 	xhr.onerror = () => reject(Error("There was a network error."))
	// 	xhr.send()

	// })

	return [{
		"id": 1507220,
		"name": "Dovol’noye",
		"country": "RU",
		"coord": {
			"lon": 79.667267,
			"lat": 54.496498
		}
	},
		{
			"id": 8222846,
			"name": "Solnechnaya",
			"country": "RU",
			"coord": {
				"lon": 131.732803,
				"lat": 49.237499
			}
		},
		{
			"id": 6268219,
			"name": "Kobrino",
			"country": "RU",
			"coord": {
				"lon": 30.11417,
				"lat": 59.424721
			}
		},
		{
			"id": 6845986,
			"name": "Mironovka",
			"country": "RU",
			"coord": {
				"lon": 44.214001,
				"lat": 54.499802
			}
		},
		{
			"id": 519188,
			"name": "Novinki",
			"country": "RU",
			"coord": {
				"lon": 37.666668,
				"lat": 55.683334
			}
		}]

}

class WeatherSelector extends Component {

	state = {
		selectedOption: '',
		cities: []
	}

	componentDidMount() {

		let cities = getWeatherFromOWM('http://localhost:9000/etc/cities.json').map((i) => {
			return { value: i.id, label: i.name }
		})
		this.setState({ cities: cities})

	}

	handleSelectChange = (selectedOption) => {
		this.setState({ selectedOption: selectedOption })
		console.log(selectedOption)
	}

	handleBtnClick = (e) => {
		// (e.name === 'addCity')
		// 	this.props.onSelectCity(this.state.selectedOption)
		(e.name === 'getForecast')
			this.props.onGetWeather(this.state.cities)
	}

	render() {
		const { selectedOption, cities } = this.state

		return (
				<div className="container">
					<Select
					value={ selectedOption }
					onChange={this.handleSelectChange}
						options={ cities }
					/>
				<button className="btn" name="addCity" onClick={this.handleBtnClick}> Добавить город в избраннное</button>
				<button name="getForecast" onClick={this.handleBtnClick}>Прогноз</button>
				</div>
		)
	}
}

// export default hot(module)(App)
export default WeatherSelector