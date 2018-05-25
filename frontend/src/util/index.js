export const logError = (func) => console.warn(func + ' is not defined');

export const addTokenHeader = (token) => {
	return {
		headers: {
			'x-access-token': token
		}
	};
};