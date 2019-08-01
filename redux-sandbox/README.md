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