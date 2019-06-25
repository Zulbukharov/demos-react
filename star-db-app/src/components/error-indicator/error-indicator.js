import React, { Component } from 'react';

import './error-indicator.css';
import icon from './death-star.png';

export default class ErrorIndicator extends Component {
	render() {
		return (
			<div className="error-indicator">
				<img src={icon} alt="death star" />
				<span className="boom">BOOM</span>
				<span>
					something has gone terribly wrong
				</span>
				<span>
					(but we already sent drons to fix it)
				</span>
			</div>
		)
	}
}
