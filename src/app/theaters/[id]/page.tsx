'use client';
import {
	Box,
	Center,
	SegmentedControl,
	SegmentedControlItem,
	useBreakpointValue,
} from '@yamada-ui/react';
import React, { useEffect, useState } from 'react';
import { MovieScheduleField } from './_components/MovieScheduleField';
import { BreadcrumbList } from './_components/BreadcrumbList';
import { Title } from './_components/Title';
import { getNextWeekDates } from '@/utils/scheduleDate';
import { fetchMovie } from '@/app/hooks/useMovie';
import { useParams } from 'next/navigation';
import { fetchCinemaId } from '@/app/hooks/useCinemaId';

interface Movie {
	movie_id: number;
	movie_image: string;
	movie_name: string;
	cinema_id: number;
}

interface Cinema {
	cinema_id: number;
}

const Page = () => {
	const params = useParams();
	const cinemaId = Number(params.id); // 動的パラメータを取得し、数値型に変換
	const [movies, setMovies] = useState<Movie[]>([]);
	const [cinemas, setCinemas] = useState<Cinema | null>(null);
	const [loading, setLoading] = useState(true);
	const items: SegmentedControlItem[] = getNextWeekDates();
	const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md' });
	const isSmallScreen = ['sm', 'md'].includes(breakpoint);
	const [selectedDate, setSelectedDate] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const moviesData = await fetchMovie(); // 映画データ

			console.log(cinemaId);
			// 対象の映画館に紐づく映画をフィルタリング
			const filteredMovies = moviesData.filter(
				(movie: any) => movie.cinema_id === cinemaId
			);

			// フィルタリング結果をフォーマット
			const formattedData: Movie[] = filteredMovies.map((movie: any) => ({
				movie_id: movie.movie_id,
				movie_image: movie.movie_image1,
				movie_name: movie.movie_name,
			}));

			setMovies(formattedData);
			setLoading(false);
		};

		// cinemaId が存在する場合のみデータを取得
		if (cinemaId) fetchData();
	}, [cinemaId]);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<Box
			margin="0 auto"
			marginBottom="15px"
			maxWidth="1500px"
			width="100%"
			height="auto"
			backgroundColor="#fff"
		>
			<BreadcrumbList />
			<Title />

			<Box margin="15px 0">
				<SegmentedControl
					borderRadius="2px"
					w="100%"
					items={items}
					onChange={(value) => setSelectedDate(Number(value))}
					flexWrap="nowrap"
					overflowX="auto"
					sx={{
						display: 'grid',
						gridTemplateColumns: isSmallScreen
							? 'repeat(2, 1fr)'
							: 'repeat(auto-fit, minmax(100px, 1fr))',
						gap: 2,
					}}
				/>
			</Box>

			{movies.map((movie: Movie) => (
				<MovieScheduleField
					key={movie.movie_id}
					movie_id={movie.movie_id}
					movie_image={movie.movie_image}
					movie_name={movie.movie_name}
					cinema_id={cinemaId}
				/>
			))}
		</Box>
	);
};

export default Page;
