import Cookies from 'js-cookie';

export const userSchedule = async () => {
	const handleScheduleInfo = async (scheduleId: number): Promise<void> => {
		try {
			const userId = Cookies.get('user_id');

			const userScheduleData = {
				user_id: userId,
				schedule_id: scheduleId,
			};

			const response = await fetch('../server/route/userschedule', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userScheduleData),
			});

			if (!response.ok) {
				throw new Error(`http error status: ${response.status}`);
			}

			const data = await response.json();
			console.log('UserSchedule registered:', data);
		} catch (error) {
			console.error('Error registering UserSchedule:', error);
		}
	};
	return {
		handleScheduleInfo,
	};
};
