import React, { Component } from 'react';
import './spinner.css'

export default class Spinner extends Component {
	render() {
		const st = {
			width: "100%",
			height: "100%"
		}
		return (
			<div className="lds-css ng-scope load">
				<div style={st} className="lds-flickr">
					<div></div>
					<div></div>
					<div></div>
				</div>
				<style type="text/css">

				</style>
			</div>
		)
	}
}
