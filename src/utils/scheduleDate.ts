export const getNextWeekDates = (): { label: string; value: string }[] => {
	const dates = [];
	const today = new Date();

	for (let i = 0; i < 8; i++) {
		const currentDate = new Date(today);
		currentDate.setDate(today.getDate() + i);

		const month = currentDate.getMonth() + 1;
		const day = currentDate.getDate();
		const formattedDate = `${month}月${day}日`;

		dates.push({ label: formattedDate, value: formattedDate });
	}

	return dates;
};
