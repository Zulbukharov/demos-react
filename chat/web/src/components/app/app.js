import React, { Component } from 'react';
import GithubService from '../../services/github-service';
import Header from '../header';
import './app.css'
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloProvider } from 'react-apollo';
import Sidebar from '../sidebar';
import Chat from '../chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

			link: new WebSocketLink({
				uri: 'wss://testing-app-1997.herokuapp.com/v1alpha1/graphql',
				options: {
					reconnect: true,
					connectionParams: {
						headers: {
							Authorization: `Bearer ${authToken}`,
						}
					}
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
		console.log(jwt_token);
		const client = this.createApolloClient(jwt_token)
		return (
			<ApolloProvider client={client}>
				<Router>
					<Header logout={this.props.auth.logout} avatar_url={avatar_url} />
					<Switch>
						<Route path="/" exact render={() => {
							return (
								<div className="chat-container">
									<Sidebar />
									<Chat login={login} />
								</div>
							);
						}}>
						</Route>
						<Route path="/code" render={() => {
							console.log("page code")
							return (
								<span>Hello</span>
							);
						}}>

						</Route>

					</Switch>

					{/* <div className="container user"> */}
					{/* <TodosQuery /> */}

					{/* </div> */}
				</Router>
			</ApolloProvider>
		)
	}
}
