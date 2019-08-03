import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../../actions';
import './footer.css'

const Footer = ({ active, onAll, onActive, onCompleted }) => {
	return (
		<div className="footer">
			<button onClick={onAll}
				disabled={active === 'SHOW_ALL'}
				className="btn btn-success footer-button mb-5">
				All
		</button>
			<button onClick={onActive}
				disabled={active === 'ON_ACTIVE'}
				className="btn btn-success footer-button mb-5">
				Active
		</button>
			<button onClick={onCompleted}
				disabled={active === 'ON_COMPLETED'}
				className="btn btn-success footer-button mb-5">
				Completed
		</button>
		</div>
	)
};

const mapStateToProps = (state) => {
	return {
		active: state.filter
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAll: () => dispatch(setFilter('SHOW_ALL')),
		onActive: () => dispatch(setFilter('ON_ACTIVE')),
		onCompleted: () => dispatch(setFilter('ON_COMPLETED')),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);