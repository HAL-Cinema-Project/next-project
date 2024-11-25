'use client';

import { useEffect, useState } from 'react';
import { Movie } from '../interfaces/movieDataInterface';
import { fetchMovie } from './useMovie';

const useFetchMovies = () => {
	const [movieData, setMovieData] = useState<Movie[]>([]);
	const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const moviesData = await fetchMovie();
			const formattedData: Movie[] = moviesData.map((movie: Movie) => ({
				movie_id: movie.movie_id,
				movie_name: movie.movie_name,
				category_id: movie.category_id,
				movie_time: movie.movie_time,
				movie_detail: movie.movie_detail,
				movie_image1: movie.movie_image1,
				movie_image2: movie.movie_image2,
				movie_cast: movie.movie_cast,
				movie_director: movie.movie_director,
				movie_start_date: movie.movie_start_date,
				movie_end_date: movie.movie_end_date,
			}));
			setMovieData(formattedData);
			setFilteredMovies(formattedData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return { movieData, filteredMovies, loading };
};

export default useFetchMovies;
