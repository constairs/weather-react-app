import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import transleteToCyr from '../utils/translete.js'

const cities = require('../../etc/cities.json')

function getWeatherFromOWM(url) {
	return cities
}

class WeatherSelector extends Component {

	constructor(props) {
		super(props)
		this.state = {
			selectedOption: null,
			cities: [],
			count: this.props.count,
			disabledBtn: this.props.count > 20 || this.props.count < 1 ? true : false,
			disabledBtnAdd: this.props.count === 20 ? true : false
		}
	}

	componentDidMount() {

		let cities = getWeatherFromOWM('http://localhost:9000/etc/cities.json').map((i) => {
			return { value: i.id, label: transleteToCyr(i.name) }
		})
		function compare(a, b) {
			if(a.label < b.label)
				return -1
			if(a.label > b.label)
				return 1
			return 0
		}
		cities = cities.sort(compare)
		this.setState({ cities: cities})

	}

	handleSelectChange = (selectedOption) => {
		if (this.state.count === 20) {
			this.setState({ selectedOption: selectedOption, disabledBtnAdd: true })
		} else {
			this.setState({selectedOption: selectedOption, disabledBtnAdd: false })
		}
	}

	handleBtnClick = (event) => {
		if (event.target.name === 'addCity') {
			this.props.onSelectCity(this.state.selectedOption)
			this.setState({ selectedOption: false})
		}
			
		if (event.target.name === 'getForecast') {
			this.props.onGetWeather()
		}	
	}

	static getDerivedStateFromProps(nextProps, PrevState) {
		if (nextProps.count !== PrevState.count) {
			if (nextProps.count > 20 || nextProps.count < 1) {
				return {
					count: nextProps.count,
					disabledBtn: true
				}
			} else {
				return {
					count: nextProps.count,
					disabledBtn: false
				}
			}
			
		}
		return null
	}

	render() {
		const { selectedOption, cities } = this.state
		return (
				<div className="container">
					<Select
					value={ selectedOption }
					onChange={this.handleSelectChange}
					options={ cities }
					placeholder="Выберите город"
					/>
				{ this.props.count === 20 ? 
					<p className="message">Не более 20 городов в избранном</p>
					: this.props.count < 1 || this.props.count < 21 ?
					<p className="message">Добавляйте города в список избранного</p>
					: null
				}
				<div className="buttons-container">
					<button className="btn" name="addCity" disabled={!this.state.selectedOption || this.state.disabledBtnAdd } onClick={this.handleBtnClick}> Добавить в избраннное</button>
					<button className="btn" name="getForecast" disabled={this.state.disabledBtn} onClick={this.handleBtnClick}>Прогноз</button>
				</div>

				</div>
		)
	}

}

export default WeatherSelector