import React, { Component } from 'react';
import GithubService from '../../services/github-service';
import Header from '../header';
import './app.css'

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
