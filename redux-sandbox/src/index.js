import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';
import App from './components/app';
// import * as actions  from './actions';
// import Counter from './components/counter';
// import { dec, inc, rnd } from './actions';

const store = createStore(reducer);
// const { dispatch } = store;

// const bindActionCreator = (creator, dispatch) => (...args) => {
// 	return (dispatch(creator(...args)))
// };
// const { incDispatch, decDispatch, rndDispatch } = bindActionCreators({
// 	incDispatch: actions.inc,
// 	decDispatch: actions.dec,
// 	rndDispatch: actions.rnd,
// }, dispatch);

// const incDispatch = bindActionCreator(inc, dispatch);
// const decDispatch = bindActionCreator(dec, dispatch);
// const rndDispatch = bindActionCreator(rnd, dispatch );

// document
// 	.getElementById('inc')
// 	.addEventListener('click', () => {
// 		incDispatch();
// 	});

// document
// 	.getElementById('dec')
// 	.addEventListener('click', () => {
// 		decDispatch();
// 	});

// document
// 	.getElementById('rnd')
// 	.addEventListener('click', () => {
// 		const payload = Math.floor(Math.random() * 10);
// 		rndDispatch(payload);
// 	});

// const update = () => {
// document
// 	.getElementById('counter')
// 	.innerHTML = store.getState();
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
// };
// update();
// store.subscribe(() => {
	// update();
// });



// при любом изменении вызывать функцию
// store.subscribe(() => {
	// console.log(store.getState());
// })

// console.log(store.getState());
// getState() получение текущего state

// просто вызов reducer
// store.dispatch({ type: 'INC' });
// store.dispatch({ type: 'INC' });
// console.log(store.getState());
