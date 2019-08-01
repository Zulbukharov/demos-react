// может не быть pure function
export const inc = () => ({ type: 'INC' });
export const dec = () => ({ type: 'DEC' });
export const rnd = () => {
	const payload = Math.floor(Math.random() * 10);
	return ({ type: 'RND', payload: payload });
};
