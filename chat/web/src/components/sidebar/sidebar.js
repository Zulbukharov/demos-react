import React, { Component } from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import './sidebar.css';

const SUBSCRIPTION_USERS = gql`
subscription {
	users {
	  name
	  id
	}
  }
  
`;

class Sidebar extends Component {
	render() {
		return (
			<div className="sidebar" >
				<Subscription subscription={SUBSCRIPTION_USERS}>
					{({ loading, error, data }) => {
						if (loading) {
							return (<span>loading...</span>);
						}
						if (error) {
							return (<span>error...</span>);
						}
						return (
							data.users.map((user) => {
								return (
									<div className="user">
										<img className="user-avatar" src="https://picsum.photos/50/50" />
										<p className="user-login">{user.name}</p>
									</div>
								)
							})
						)
					}
					}
				</Subscription>
			</div>
		)
	}
}

export default Sidebar;