import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';

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

// const { incDispatch, decDispatch, rndDispatch } = bindActionCreators({
// 	incDispatch: actions.inc,
// 	decDispatch: actions.dec,
// 	rndDispatch: actions.rnd,
// }, dispatch);

// const mapDispatchToProps = (dispatch) => {
// 	return bindActionCreators(actions, dispatch);
// }

export default connect(mapStateToProps, actions)(Counter);