import {
	GET_WEATHER_REQUEST,
	GET_WEATHER_SUCCESS,
	GET_WEATHER_FAIL,
	SET_FAVORITE_CITY,
	GET_WEATHER_FOR_ONE_REQUEST,
	GET_WEATHER_FOR_ONE_SUCCESS,
	GET_WEATHER_FOR_ONE_FAIL
} from '../constants/App'

const initialState = {
	favorites: [],
	weather: {},
	fetching: false,
	error: '',
	weathersCities: {}
}

export default function app(state = initialState, action) {

	switch (action.type) {
		case GET_WEATHER_REQUEST:
			return { ...state, favorites: action.payload, fetching: true }

		case GET_WEATHER_SUCCESS:
			return { ...state, weather: action.payload, fetching: false, error: '' }

		case GET_WEATHER_FAIL:
			return { ...state, error: action.payload.message, fetching: false }

		case SET_FAVORITE_CITY:
			return { ...state, favorites: action.payload, fetching: false }

		case GET_WEATHER_FOR_ONE_REQUEST:
			return { ...state, cityId: action.payload, fetching: true }

		case GET_WEATHER_FOR_ONE_SUCCESS:
			return { ...state, weathersCities: action.payload, fetching: false, error: '' }

		case GET_WEATHER_FOR_ONE_FAIL:
			return { ...state, error: action.payload.message, fetching: false }

		default:
			return state
	}

}