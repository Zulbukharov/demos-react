import React, { Component, Fragment } from 'react';
import { Subscription, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import './chat.css';

const SUBSCRIPTION_MESSAGES = gql`
subscription {
	messages {
	  message
	  id
	  user {
		name
	  }
	}
  }
  
  
`;

const INSERT_MESSAGE = gql`
mutation insertUser ($message: String!) {
	insert_messages(objects: {message: $message}) {
	  affected_rows
	}
  }
`;

class Chat extends Component {
	render() {
		let input;

		const { login } = this.props;
		return (
			<div className="chat" id="chat">
				<div className="chat-body">
					<Subscription subscription={SUBSCRIPTION_MESSAGES} onSubscriptionData={() => {
						const objDiv = document.getElementById("chat");
						objDiv.scrollTop = objDiv.scrollHeight;
					}}>
						{
							({ loading, error, data }) => {
								if (loading) {
									return (<span>loading...</span>);
								}
								if (error) {
									console.log(error)
									return (<span>error...</span>);
								}
								return (
									data.messages.map(({ message, id, user }) => {

										return (
											<div className="chat-message"
												key={id}
												style={{
													justifyContent: login === user.name ? 'flex-start' : 'flex-end'
												}}>
												<p className="chat-message-login-text">
													{user.name}: {message}
												</p>
											</div>
										)
									})
								)
							}
						}
					</Subscription>
				</div>
				<div className="chat-form">
					<Mutation mutation={INSERT_MESSAGE}>
						{(insertMessage) => {
							return (
								<form id="message-form" className="input-group" onSubmit={
									(e) => {
										e.preventDefault();
										if (!input.value.trim()) {
											return
										};
										insertMessage({ variables: { message: input.value } });
										input.value = '';

									}
								}>
									<input
										className="form-control chat-form-input"
										ref={node => input = node}
										placeholder="Send Message" />
									<div className="input-group-append">
									</div>

								</form>
							)
						}

						}

					</Mutation>
				</div>
			</div>
		)
	}
}

export default Chat;