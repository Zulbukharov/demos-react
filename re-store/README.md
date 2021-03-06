# Redux Store

## Структура проекта

```
/actions - action creator
/reducers - redux reducers
/services - сервисы для работы с запросами
/utils - утилиты
/components
   /app
   /pages
   /error-boundry
   /error-indicator
   /spinner
   /bookstore-service-context
   /hoc
```

## Redux компоненты

> Для того чтобы создать redux приложение нужно определить функцию reducer
> Action creator на практике важны
> Логику создания store удобно вынести в отдельный файл

## Каркас react-redux приложения

```
// Предоставляет доступ к Redux Store
<Provider store={store}>
	// Оброботка ошибок в компонентах ниже
	<ErrorBoundry>
		// Передает сервис через ContextAPI
		<BookstoreServiceProvider value={service}>
			// роутер из пакета react-router
			<Router>
				// application
				<App/>
```

## Роутинг

```
// отрисовывает максимум один элемент
<Switch>
	// конфигурирует адрес "/"
	<Route path="/" component={home} exact/>
	// конфигурирет адрес "/cart"
	<Route path="/cart" component={cart}>
</Switch>
```

## Чтение данных из Redux в Store

```
const Person = ({name}) => {
	return <p>{name}</p>;
}

// Эта функция определяет какие своя получить из Redux Store
const mapStateToProps = (state) => {
	return (name: state.firstName);
};
```

## Dispatch

> Чтобы получить данные из сервиса и передать их в Redux Store было использовано
> два HOC

> withBookstoreService получает сервис из контекстна и передает в компонент

> connect оборачивает функцию dispatch из Redux Store

> mapDispatchToProps может быть функцией или объектом

## React: setState

> Возвращает полное состояние

```
{ a: 0, b: 0} //initial state

setState({a: 100});

{ a: 100, b: 0}
```

## Redux: reducer()

```
{ a: 0, b: 0} //initial state

const reducer = (state, action) => {
	return {a: 100};
	// return {...state, a: 100}
}

{ a: 100}
```

## Компоненты контейнеры

> Презентационные компоненты отваечают только для представление данных

> Компоненты-контейнеры работаю с Redux реализуют loading, error и другую локигу

> ## Создание новоо компонента
> 
> - Начните с создания нового презентационного компонента, он не должен знать о существовании Redux
> 
> - Обновите state, Добавьте туда новые поля
> 
> - Для начала, заполните state тестовыми данными
> 
> - Реализуйте функции для connect() и подключите компоненты Redux()