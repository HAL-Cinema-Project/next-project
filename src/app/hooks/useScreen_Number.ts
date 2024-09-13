export const fetchScreenNumber = async () => {
	try {
		const response = await fetch('../server/route/screen');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed not screen', error);
		return null;
	}
};
