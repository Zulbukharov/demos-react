import React from 'react';
import App from '../app';
import Login from '../login';
import Callback from './callback';
import GithubService from '../../services/github-service';

export default class Auth extends React.Component {

	githubService = new GithubService();

	state = {
		isAuthenticated: false,
		idToken: null
	};

	handleAuthentication = (code) => {
		this.setState({ isAuthenticated: 'loading' });

		this.githubService.getToken(code)
			.then((resp) => {
				console.log(resp);
				this.setSession(resp);
			})
	};

<<<<<<< HEAD
	setSession({ access_token }) {
=======
	setSession({ access_token, jwt_token }) {
>>>>>>> 61f683f950ec588bc0eb38bc16c7dddba3dce801
		if (!access_token) {
			this.setState({
				isAuthenticated: false
			});
			return;
		}
		localStorage.setItem('isLoggedIn', 'true');
		localStorage.setItem('token', access_token)
<<<<<<< HEAD
=======
		localStorage.setItem('jwt', jwt_token)

		window.location.replace("http://localhost:3000/");

>>>>>>> 61f683f950ec588bc0eb38bc16c7dddba3dce801
		this.setState({
			isAuthenticated: true,
			idToken: access_token
		});
	}

	logout = () => {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('token');
<<<<<<< HEAD
=======
		localStorage.removeItem('jwt');

		// history.replace('/');

		window.location.replace("http://localhost:3000/");

>>>>>>> 61f683f950ec588bc0eb38bc16c7dddba3dce801
		this.setState({
			isAuthenticated: false,
			idToken: null
		});
	}

	componentDidMount() {
		const url = new URL(window.location.href);
		const code = url.searchParams.get("code")
		if (code) {
			console.log(code);
			this.handleAuthentication(code);
		}
<<<<<<< HEAD
=======
		console.log(localStorage.getItem('token'))
>>>>>>> 61f683f950ec588bc0eb38bc16c7dddba3dce801
		if (localStorage.getItem('token')) {
			this.setState({
				isAuthenticated: true,
			})
			return;
		}
	}

	render() {
		console.log(this.props);
		if (this.state.isAuthenticated === 'loading') {
			return (<Callback {...this.props} />);
		}

		if (!this.state.isAuthenticated) {
			return (<Login loginHandler={this.login} />);
		}

		return (<App {...this.props} auth={{ ...this.state, logout: this.logout }} />);
	}

}
