import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/auth/auth';
import ErrorBoundry from './components/error-boundry';


ReactDOM.render(
	<ErrorBoundry>
		<Auth />
	</ErrorBoundry>,
	document.getElementById('root'));