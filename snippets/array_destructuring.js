const fin = [1, 1, 2, 3, 5, 8];

const [p1, p2, p3] = fin;
console.log(p1, p2, p3);

const dict = {
	duck: 'quak',
	dog: 'wouf',
	cow: 'moo',
	bull: 'moo'
};

const res = Object.entries(dict) // obj => 2d arr
	.filter(([, value]) => value === 'moo')
	.map(([key]) => key);

console.log(res);

