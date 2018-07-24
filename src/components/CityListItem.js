import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class CityListItem extends Component {

	handleDelClick = () => {
		this.props.onDeleteCity(this.props.idn)
	}

	render() {
		return(
			<li className="city-list-item">
				<span>{this.props.info}</span>
				<span className="x-btn"><FontAwesomeIcon onClick={this.handleDelClick} icon={faTimes} /></span>
			</li>
		)
	}

}

export default CityListItem