export const fetchTime = async () => {
	try {
		const response = await fetch('../server/route/time');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed not time', error);
		return null;
	}
};
