'use client';

import { useState, useEffect } from 'react';
import { MovieSort } from './MovieSort';
import { AdminMovieAccordion } from './AdminMovieAccordion';
import useFetchMovies from '@/app/hooks/useFetchMovies';
import { AdminCategories } from './AdminCategories';

export const AdminMovieManager = () => {
	const { movieData, loading } = useFetchMovies(); // データ取得用のカスタムフック
	const [filteredMovies, setFilteredMovies] = useState(movieData); // フィルタリング結果を管理

	useEffect(() => {
		// 初回データ設定
		setFilteredMovies(movieData);
	}, [movieData]);

	// 検索処理
	const handleSearch = (term: string) => {
		const filtered = movieData.filter((movie) =>
			movie.movie_name.toLowerCase().includes(term.toLowerCase())
		);
		setFilteredMovies(filtered);
	};

	if (loading) return <p>Loading...</p>;

	return (
		<>
			<MovieSort onSearch={handleSearch} />
			<AdminCategories />
			<AdminMovieAccordion movies={filteredMovies} />
		</>
	);
};
