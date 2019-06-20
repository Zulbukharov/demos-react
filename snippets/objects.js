// objects

const prefix = '_blah_';

const person = {
	[prefix + 'name']: 'Bob',
	[prefix + 'age']: 22
};

console.log(person);

const defaults = {
	host: 'localhost',
	dbName: 'blog',
	user: 'admin'
};

const opts = {
	user: 'john',
	password: '****'
};

const res = Object.assign({}, defaults, opts);
console.log(res);
