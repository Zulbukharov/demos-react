import React, { Component } from 'react';
import GithubService from '../../services/github-service';
import Header from '../header';
import './app.css'
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

export default class App extends Component {
	githubService = new GithubService();

	state = {
		data: {},
	}

	// loginAndGetData = async (code) => {
	//     await this.githubService.getToken(code);
	//     const user = await this.githubService.getUser();
	//     this.setState({
	//         data: user,
	//     })
	// }

	createApolloClient = (authToken) => {

		return new ApolloClient({

			link: new HttpLink({

				uri: 'http://testing-app-1997.herokuapp.com/v1alpha1/graphql',

				headers: {

					Authorization: `Bearer ${authToken}`

				}

			}),

			cache: new InMemoryCache(),

		});

	};



	componentDidMount() {
		// const url = new URL(window.location.href);
		// const code = url.searchParams.get("code")
		// if (code) {
		// this.loginAndGetData(code);
		// }
		this.githubService.getUser()
			.then((data) => {
				this.setState({
					data: data,
				})
			})
	}

	render() {
		const { data: { avatar_url, bio, login } } = this.state;
		const jwt_token = localStorage.getItem('jwt')
		const client = this.createApolloClient(jwt_token)
		return (
			<React.Fragment>
				<Header logout={this.props.auth.logout} />
				<div className="container user">
					<div className="user-image">
						<img src={avatar_url} alt="avatar" />
					</div>
					<div className="user-info">
						<h2 className="user-login">{login}</h2>
						<h3 className="user-bio">{bio}</h3>
					</div>
				</div>
			</React.Fragment>
		)
	}
}
