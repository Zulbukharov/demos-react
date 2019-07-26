import React, { Component } from 'react';
import Spinner from '../spinner';

const withData = (View, getData) => {
	return class extends Component {

		state = {
			data: null,
		};

		componentDidMount() {
			getData()
				.then((data) => {
					this.setState({
						data
					});
				})
				.catch((err) => {
					console.error(err);
				});
		};

		render() {
			const { data } = this.state;
			if (!data) {
				return <Spinner />
			}
			return (<View {...this.props} data={data}></View>);
		};
	}
};

export default withData;