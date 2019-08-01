import { createStore } from 'redux';
import { dec, inc, rnd } from './actions';
import reducer from './reducer';

const store = createStore(reducer);

document
	.getElementById('inc')
	.addEventListener('click', () => {
		store.dispatch(inc());
	})

document
	.getElementById('dec')
	.addEventListener('click', () => {
		store.dispatch(dec());
	})

document
	.getElementById('rnd')
	.addEventListener('click', () => {
		const payload = Math.floor(Math.random() * 10);
		store.dispatch(rnd(payload));
	})

const update = () => {
	document
		.getElementById('counter')
		.innerHTML = store.getState();
};

store.subscribe(() => {
	update();
});


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
