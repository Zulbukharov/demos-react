## arrow function
юзайте лучше объявление функций
```
function hello() {
	return ("Hello");
}

const hel = () => "Hello"
```

## default parametres
если нужно создать дефолтные параметры, достаточно, в функции присвоить эти значения параметрам
```
function wow(a = 10, b = 0) {
}
```

## rest parametres
используем ... как остальные параметры, он будет всегда массивом
```
function max(... numbers) {
}
```

## spread operator
раскладывает массив на список переменных
```
Math.max(..arr);
```

## destructiring
локанично достать данные из объекта, структуры
```
const person = {
	fn: "John",
	ln: "Doe",
	age: 22
};

const { fn, ln } = person;
console.log(fn, ln);
// Jogn Doe
```
