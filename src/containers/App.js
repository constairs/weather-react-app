import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as appActions from '../actions/AppActions'
import '../styles.sass'
import WeatherSelector from '../components/WeatherSelector'
import WeatherList from '../components/WeatherList'
import FavoriteCities from '../components/FavoriteCities'
import WeatherForOne from '../components/WeatherForOne'

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			favorites: this.props.app.favorites,
			modalOn: false,
			curCityData: null
		}
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		if(prevState.favorites !== nextProps.app.favorites) {
			return {
				favorites: nextProps.app.favorites
			}
		}
		if (prevState.curCityData !== nextProps.app.weathersCities) {
			return {
				curCityData: nextProps.app.weathersCities
			}
		}
		return null
	}

	handleReqWeather = () => {
		this.props.appActions.getWeatherForFavorites(this.props.app.favorites)
	}

	handleAddFavorite = (city) => {
		let fav = this.state.favorites.map((cur)=>{
			return cur
		})

		let simillar = false
		
		for (let i of fav) {
			console.log(city.label, i.label)
			if (i.label === city.label) {
				simillar = true
				break	
			}
		}

		if(simillar) {
			alert('Этот город уже добавлен!')
		} else {
			fav.push(city)
			this.props.appActions.setFavoriteCity(fav)
		}
	}

	handleDeleteCityFromFav = (cityid) => {
	let fav = this.state.favorites.map((cur) => {
		return cur
	})
	fav.splice(cityid, 1)
	this.props.appActions.setFavoriteCity(fav)	
	}

	handleOpenCityModal = (id) => {
		this.props.appActions.getWeatherForOne(id)
		this.setState({curCityData: this.props.app.weathersCities})
		this.setState({modalOn: true})
	}

	handleCloseModal = () => {
		this.setState({modalOn: false})
	}

	render() {
		const { app } = this.props
		return (
			<div className="App">
				<h1 className="main-title">Weather app</h1>
				<WeatherSelector 
				onGetWeather={this.handleReqWeather} 
				onSelectCity={this.handleAddFavorite}
				count={this.props.app.favorites.length}
				/>
				<FavoriteCities list={app.favorites} onDeleteCity={this.handleDeleteCityFromFav} />
				<WeatherList data={app} onOpenCity={this.handleOpenCityModal} />

				{ this.state.modalOn ? <WeatherForOne onCloseModal={this.handleCloseModal} data={this.state.curCityData} /> : null }
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