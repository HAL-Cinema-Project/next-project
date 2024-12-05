type Cinema = {
	cinema_id: number;
	cinema_region: string;
	cinema_address: string;
	cinema_tel: string;
	cinema_email: string;
	cinema_detail: string;
	cinema_image: string;
};

export const fetchCinemaId = async (id: number): Promise<Cinema | null> => {
	try {
		const response = await fetch(`../server/route/cinema/${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch cinema data');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching cinema data', error);
		return null;
	}
};
