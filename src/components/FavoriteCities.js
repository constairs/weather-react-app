import React, { Component } from 'react'
import CityListItem from './CityListItem'

class FavoriteCities extends Component {

	handleDeleteCity = (cityid) => {
		this.props.onDeleteCity(cityid)
	}

	render() {
		const { list } = this.props
		return(
			<div>
				<h2>Избранные города</h2>
				<ul className="favorite-cities-list">
					{
						list.map((cur, i) => {
						return <CityListItem key={i} info={cur.label} idn={i} onDeleteCity={this.handleDeleteCity} />
					})
					}
				</ul>
			</div>
		)
	}

}

export default FavoriteCities