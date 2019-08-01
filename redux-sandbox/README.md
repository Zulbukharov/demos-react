# Redux

## Reducer

> это обычная функция, (state, action) => newState

> если state undefined => return initialState

> если action undefined => return state

## Store

> Store координирует работу с данными в Redux приложении

```
const store = createStore(reducer);
```

> Получение нотификации об изменениях

```
store.subscribe(() => {
	//do smth
})
```

> Обработать новый action

```
store.dispatch(action);
```
## UI для Redux

> В качестве UI может использоваться любая библиотека или фреймворк

> store.dispatch() используется для обновления состояния

> store.subscripe() используется для обновления UI

## ACTION

> Кроме типа, action может содержать дополнительную информацию

```
store.dispatch(
	{
		type: 'USER_LOGGED_IN',
		name: 'Arnold',
		role: 'Admin',
	}
);
```

## ACTION CREATOR

> функция, которая создает объекты action

```
const userLoggedIn = (name, role) => {
	return ({
		type: 'USER_LOGGED_IN',
		name,
		role,
	})
};

store.dispatch(userLoggedIn('Arnold', 'Admin'));
```

## bindActionCreators

> связывает функцию action creator c функцией dispatch

```
const {add, remove} = bindActionsCreator(actions, dispatch);
```

> Созданные таким образом функции делают сразу два действия - создание действия action() и отправка action() в dispatch()

## React + Redux

> React должен знать когда нужно обновлять 
> компоненты (store.subscribe() сообщает о том,
> что state обновился)

> react-redux упрощает интеграция react + redux
> Provider делает store доступным всему дереву компонентов

> connect() - компонент высшего порядка, который передает
> значения из store в компонент

```
const mapStateToProps = (state) => {
	return {
		name: state.name,
		age: state.age,
	};
};

export default connect(mapStateToProps)(Component);
```

## mapDispatchToProps

> второй аргумент для функции connect(state, dispatch)

```
const mapDispatchToProps = (dispatch) => {
	return ({
		inc: () => dispatch({type: 'INC'}),
	});
};
```

> Созданные функции будут переданы в компонент.
> Таким способом, компонент может обновить состояние в store