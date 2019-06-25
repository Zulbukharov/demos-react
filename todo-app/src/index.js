import React from 'react';
import ReactDOM from 'react-dom';
// данные иструкции импортируют реакт, теперь мы можем создавать компоненты
import App from './components/app'

// мм, это jsx... 
// Babel сделает похже из него обычный
// const el = (
// 	<h1>Hello, World!</h1>
// );
// то же самое, только другой синтаксис
// const el = React.createElement("h1", null, "Hello, World!");
// console.log(el)

// ищем id root в index.html, после чего, рендерим на нее el
ReactDOM.render(<App />, document.getElementById("root"))

