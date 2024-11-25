export const fetchSchedules = async () => {
	try {
		const response = await fetch('/server/route/schedule'); // エンドポイントを正しいパスに修正してください
		if (!response.ok) {
			throw new Error(`HTTP error status: ${response.status}`);
		}

		const schedules = await response.json();
		return schedules;
	} catch (error) {
		console.error('Error fetching schedules:', error);
		return [];
	}
};
