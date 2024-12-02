// utils/sortByDate.ts
export const sortByDate = (
	data: any[],
	key: string,
	order: 'asc' | 'desc' = 'asc'
): any[] => {
	return [...data].sort((a, b) => {
		const dateA = new Date(a[key]);
		const dateB = new Date(b[key]);

		if (order === 'asc') {
			return dateA.getTime() - dateB.getTime();
		} else {
			return dateB.getTime() - dateA.getTime();
		}
	});
};
