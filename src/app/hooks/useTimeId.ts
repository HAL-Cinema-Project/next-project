import { useEffect, useState } from 'react';

type MovieTime = {
	time_id: number;
	movie_start: string;
};

const fetchTimeId = async (id: number): Promise<MovieTime | null> => {
	try {
		const response = await fetch(`../server/route/time/${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch movie_time data');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching movie_time data', error);
		return null;
	}
};

const useTimeId = (id: number) => {
	const [time, setMovie] = useState<MovieTime | null>(null);
	const [loading_time, setLoading] = useState(true);
	const [error_time, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			const movieData = await fetchTimeId(id);
			if (movieData) {
				setMovie(movieData);
			} else {
				setError('Failed to fetch movie data');
			}
			setLoading(false);
		};

		if (id) {
			fetchData();
		}
	}, [id]);

	return { time, loading_time, error_time };
};

export default useTimeId;
