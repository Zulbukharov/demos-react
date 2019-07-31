import React, { Component } from 'react';
import Spinner from '../spinner';

const withData = (View) => {
	return class extends Component {

		state = {
			data: null,
			loading: false,
			error: false,
		};

		componentDidMount() {
			this.update();
		};

		componentDidUpdate(prevProps) {
			if (this.props.getData !== prevProps.getData) {
				this.update();
			}
		};

		update() {
			this.setState({
				loading: true,
				error: false,
			})
			this.props.getData()
				.then((data) => {
					this.setState({
						data,
						loading: false,
					});
				})
				.catch((err) => {
					console.error(err);
					this.setState({
						error: true,
						loading: false,
					})
				});
		}
		render() {
			const { data, loading, error } = this.state;
			if (loading || !data) {
				return <Spinner />
			}
			if (error) {
				return
			}
			return (<View {...this.props} data={data}></View>);
		};
	}
};

export default withData;