import { useState, useEffect } from 'react';

type Movie = {
	movie_id: number;
	movie_name: string;
	movie_detail: string;
	movie_time: number;
	movie_image1: string;
	movie_image2: string;
	movie_cast: string;
	movie_director: string;
};

const fetchMovieId = async (id: number): Promise<Movie | null> => {
	try {
		const response = await fetch(`../server/route/movie/${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch movie data');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching movie data', error);
		return null;
	}
};

const useMovieId = (id: number) => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			const movieData = await fetchMovieId(id);
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

	return { movie, loading, error };
};

export default useMovieId;
