export const fetchInquiry = async () => {
	try {
		const response = await fetch('../server/route/inquiry');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch inquiry', error);
		return [];
	}
};
