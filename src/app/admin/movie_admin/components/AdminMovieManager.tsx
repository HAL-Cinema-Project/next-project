'use client';

import { useState, useEffect } from 'react';
import { MovieSort } from './MovieSort';
import { AdminMovieAccordion } from './AdminMovieAccordion';
import useFetchMovies from '@/app/hooks/useFetchMovies';
import { AdminCategories } from './AdminCategories';

import { EditModal } from './EditModal';
import { FormData } from './FormData';

export const AdminMovieManager = () => {
	const { movieData, loading } = useFetchMovies(); // データ取得用のカスタムフック
	const [filteredMovies, setFilteredMovies] = useState(movieData); // フィルタリング結果を管理
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState<FormData | null>(null);

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

	// 編集モーダルを開く
	const openEditModal = (movie: FormData) => {
		setSelectedMovie(movie);
		setIsEditOpen(true);
	};

	// 編集モーダルを閉じる
	const closeEditModal = () => {
		setSelectedMovie(null);
		setIsEditOpen(false);
	};

	// 編集したデータを保存
	const handleEditSave = (updatedData: FormData) => {
		console.log('保存されたデータ:', updatedData);
		// 必要に応じて、サーバーへの更新処理を追加
	};

	if (loading) return <p>Loading...</p>;

	// 編集ボタンを追加した映画データ
	const moviesWithEdit = filteredMovies.map((movie) => ({
		...movie,
		onEdit: () =>
			openEditModal({
				movieName: movie.movie_name,
				startDate: movie.movie_start_date,
				category: movie.category_id.toString(),
				duration: movie.movie_time.toString(), // ここで文字列に変換
				director: movie.movie_director,
				cast: movie.movie_cast,
				description: movie.movie_detail,
				mainImage: null, // 必要に応じてファイルをセット
				subImage: null, // 必要に応じてファイルをセット
			}),
	}));

	return (
		<>
			<MovieSort onSearch={handleSearch} />
			<AdminCategories />
			{/* 編集ボタン付き映画リスト */}
			<AdminMovieAccordion movies={moviesWithEdit} />
			{/* 編集モーダル */}
			{selectedMovie && (
				<EditModal
					isOpen={isEditOpen}
					onClose={closeEditModal}
					initialData={selectedMovie}
					onSave={handleEditSave}
				/>
			)}
		</>
	);
};
