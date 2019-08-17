import React from "react";
import './login.css';

const CLIENT_ID = "eb2e5a2441c30d513a70";
const REDIRECT_URI = "http://localhost:3000/code";

const Login = () => (
	<div className="overlay">
		<div className="overlay-content">
			<div className="overlay-heading">
				Welcome to the GraphQL tutorial app
    </div>
			<div className="overlay-message">
				Please login to continue
    </div>
			<div className="overlay-action">

				<a
					href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>
					Login
                    </a>
			</div>
		</div>
	</div>
);

export default Login;
