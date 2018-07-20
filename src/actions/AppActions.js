import {
	GET_WEATHER_REQUEST,
	GET_WEATHER_SUCCESS,
	GET_WEATHER_FAIL
} from '../constants/App'

function getWeatherFromOWM(city) {

	return new Promise((resolve, reject) => {
		
		let xhr = new XMLHttpRequest()
		xhr.open("GET", `http://api.openweathermap.org/data/2.5/forecast?id=${city.value}&lang=ru&APPID=120438da9a454938df5c099b36d2c1f2`, true)

		xhr.onload = () => {
			if(xhr.status !== 200) {
				reject(xhr.statusText)
			}
			if(xhr.readyState === 4 && xhr.status === 200) {
				let data = JSON.parse(xhr.responseText)
				resolve(data)
				console.log(data)
			}
		}
		xhr.onerror = () => reject(Error("There was a network error."))
		xhr.send()
	})
}

function getIdsFromCitiesArr(arr) {
	arr = arr.map((cur, i) => {
		return cur.value
	})
	return arr.join()
}

function getWeatherForFav(cities) {

	cities = getIdsFromCitiesArr(cities)
	console.log(cities)

	return new Promise((resolve, reject) => {

		let xhr = new XMLHttpRequest()
		xhr.open("GET", `http://api.openweathermap.org/data/2.5/group?id=${cities}&units=metric&lang=ru&APPID=120438da9a454938df5c099b36d2c1f2`, true)

		xhr.onload = () => {
			if (xhr.status !== 200) {
				reject(xhr.statusText)
			}
			if (xhr.readyState === 4 && xhr.status === 200) {
				let data = JSON.parse(xhr.responseText)
				resolve(data)
				console.log(data)
			}
		}
		xhr.onerror = () => reject(Error("There was a network error."))
		xhr.send()
	})
}


export function getWeather(city) {
	return (dispatch) => {
		dispatch({
			type: GET_WEATHER_REQUEST,
			payload: city
		})
	
		getWeatherFromOWM(city).then((data) => {
			console.log(data)
			dispatch({
				type: GET_WEATHER_SUCCESS,
				payload: data
			})

		}).catch(err => {
			dispatch({
				type: GET_WEATHER_FAIL,
				payload: err
			})
		})


	}
}

export function getWeatherForFavorites(cities) {

	return (dispatch) => {
		dispatch({
			type: GET_WEATHER_REQUEST,
			payload: cities
		})

		getWeatherForFav(cities).then((data) => {
			console.log(data)
			dispatch({
				type: GET_WEATHER_SUCCESS,
				payload: data
			})

		}).catch(err => {
			dispatch({
				type: GET_WEATHER_FAIL,
				payload: err
			})
		})

	}
}