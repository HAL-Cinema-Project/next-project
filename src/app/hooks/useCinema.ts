export const fetchCinema = async () => {
	try {
		const response = await fetch('../server/route/cinema');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch cinema', error);
		return [];
	}
};
