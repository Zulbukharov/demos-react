import React from 'react';
import { connect } from 'react-redux';

const Counter = ({ counter, inc, dec, rnd }) => {
	return (
		<div className="jumbotron">
			<h2>{counter}</h2>
			<button className="btn btn-primary btn-lg"
				onClick={dec}>
				decrement
			</button>
			<button className="btn btn-primary btn-lg"
				onClick={inc}>
				increment
			</button>
			<button className="btn btn-primary btn-lg"
				onClick={rnd}>
				random
			</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return ({
		counter: state,
	})
}

export default connect(mapStateToProps)(Counter);