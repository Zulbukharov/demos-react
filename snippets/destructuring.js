const person = {
	name: {
		last: "Doe",
		first: "John"
	},
	age: 22
};
//  person.name   let firstName = person.name.first
const { name: { first: firstName, last}, age = 12} = person;
//                                   age default value
console.log(firstName, last, age);
