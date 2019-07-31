1. React ничего не знает о работе с сервером -
это задача других библиотек
в данном
2. Сетевой код стоит изолировать от кода компонентов
service/swapi-service.js изолирует работу с сервером

3. Если необходимо трансформировать данные до того, как их получит компонент выполнен в сетевом коде
4. Обрабатывайте состояния "загрузка" и "ошибка"
можно создать отдельный компонент, а в state главного компонента
создать переменные о состоянии
5. Разделяйте ответственность компонентов:
логику и рендеринг


# Жизненный цикл компонента React

* Создается компонент, вызывается его конструктор
* Вызывается функция render, которая возвращает React дерево компонентов
* Происходит процесс обновления
* Компонент удаляется


> lifecycle hooks
> componentWillUnmount = destructor

## MOUNTING
-------
> constructor => render() => componentDidMount()
> первоначальная инициализация, запрос к API
> DOM элементы уже на странице и они проинициализированы

## UPDATES
-------
> new props
>    => render() => componentDidUpdate(prevProps, prevState)
> setState

> всегда проверять prevprops с this.props
## UNMOUNTING
-------
> componentWillUnmount()
> отменить текущий запрос к серверу, интервалы

## ERROR
-------
> componentDidCatch()

## React Router
-------
> npm install react-router-dom
> import { BrowseRouter as Router, Route } from 'react-router-dom';



// содержит ли path ту строку, если да, то вернуть компонент

render={() => {
return
hello
;
}}

exact={true} // точь такой же




>

/app.js
{
const id = match.params.id;
return
}} />

/starships-page.js
import { withRouter } from 'react-router-dom';
history.push( /starships/${itemId} )
export default withRouter(StarshipPage);


> опциональный параметр /:id?

> Switch => Redirect if not exist

> link

import { Link } from 'react-router-dom';
People



## REDUX

> Redux решает проблему управления состоянием приложения

> Redux предлагает хранить state в одном глобальном объекте

> Функция Reducer обновляет глобальный state в ответ на Actions

> Объект store координирует обновления