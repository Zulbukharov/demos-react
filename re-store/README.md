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