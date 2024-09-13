export const fetchMethod = async () => {
	try {
		const response = await fetch('../server/route/cashmethod');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed not method', error);
		return null;
	}
};
