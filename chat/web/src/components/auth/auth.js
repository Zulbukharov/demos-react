import React from 'react';
import App from '../app';
import Login from './login';
import Callback from './callback';
import GithubService from '../../services/github-service';

export default class Auth extends React.Component {

	githubService = new GithubService();

	state = {
		isAuthenticated: false, // This can be true, false, 'loading'
		idToken: null
	};

	// login() {
	// 	this.auth0.authorize();
	// }

	handleAuthentication = (code) => {
		this.setState({ isAuthenticated: 'loading' });

		this.githubService.getToken(code)
			.then((resp) => {
				console.log(resp);
				this.setSession(resp);
			})

		// this.auth0.parseHash((err, authResult) => {
		// 	if (authResult && authResult.accessToken && authResult.idToken) {
		// 		this.setSession(authResult);
		// 	} else if (err) {
		// 		this.logout();
		// 		console.error(err);
		// 		alert(`Error: ${err.error} - ${err.errorDescription}`);
		// 	}
		// });
	};

	// getAccessToken() {
	// 	return this.accessToken;
	// }

	// getIdToken() {
	// 	return this.idToken;
	// }

	setSession({ access_token }) {
		// Set isLoggedIn flag in localStorage
		if (!access_token) {
			this.setState({
				isAuthenticated: false
			});
			return;
		}
		localStorage.setItem('isLoggedIn', 'true');
		localStorage.setItem('token', access_token)

		// Set the time that the access token will expire at
		// let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
		// this.accessToken = authResult.accessToken;
		// this.idToken = authResult.idToken;
		// this.expiresAt = expiresAt;

		// navigate to the home route
		// history.replace('/');
		this.setState({
			isAuthenticated: true,
			idToken: access_token
		});
	}

	// renewSession() {
	// 	this.setState({ isAuthenticated: 'loading' });

	// 	this.auth0.checkSession({}, (err, authResult) => {
	// 		if (authResult && authResult.accessToken && authResult.idToken) {
	// 			this.setSession(authResult);
	// 		} else if (err) {
	// 			this.logout();
	// 			console.log(err);
	// 			alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
	// 		}
	// 	});
	// }

	logout = () => {
		// Remove tokens and expiry time
		// this.accessToken = null;
		// this.idToken = null;
		// this.expiresAt = 0;

		// Remove isLoggedIn flag from localStorage
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('token');

		// this.auth0.logout({
		// return_to: window.location.origin
		// });

		// navigate to the home route
		// history.replace('/');
		this.setState({
			isAuthenticated: false,
			idToken: null
		});
		console.log("logout");
	}

	// isExpired() {
	// 	// Check whether the current time is past the
	// 	// access token's expiry time
	// 	let expiresAt = this.expiresAt;
	// 	return new Date().getTime() > expiresAt;
	// }

	componentDidMount() {
		// If this is a callback URL then do the right things
		// const location = this.props.location;
		// console.log(location);
		const url = new URL(window.location.href);
		const code = url.searchParams.get("code")
		if (code) {
			console.log(code);
			this.handleAuthentication(code);
		}
		// if (location && location.pathname.startsWith('/callback')) {
		// 	this.handleAuthentication();
		// 	return;
		// }

		// // On first load, check if we are already logged in and get the idTokens and things
		console.log(localStorage.getItem('token'))
		if (localStorage.getItem('token')) {
			// 	this.renewSession();
			this.setState({
				isAuthenticated: true,
			})
			return;
		}
	}

	render() {
		if (this.state.isAuthenticated === 'loading') {
			return (<Callback {...this.props} />);
		}

		if (!this.state.isAuthenticated) {
			return (<Login loginHandler={this.login} />);
		}

		return (<App {...this.props} auth={{ ...this.state, logout: this.logout }} />);
	}

}
