'use client';
import { Box, useBreakpoint, AspectRatio } from '@yamada-ui/react';
import React, { useEffect, useState } from 'react';
import {
	TopSectionContainer,
	TopSectionHeader,
	TopSlider,
} from './_components/block';
import { MovieCard } from './movies/_components/MovieCard';
import TheaterList from './_components/block/TheaterList';
import ShopList from './_components/block/ShopList';
import { EventList } from './_components/block/EventList';
import { ServiceList } from './_components/block/ServiceList';
import { fetchMovie } from './hooks/useMovie';
import Link from 'next/link';
import Placeholder from './movies/_components/Placeholder';

interface Movie {
	movie_id: number;
	movie_image: string;
	movie_name: string;
}

export default function Page() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState(true);
	const breakpoint = useBreakpoint();

	useEffect(() => {
		const fetchData = async () => {
			const moviesData = await fetchMovie();
			const formattedMovies: Movie[] = moviesData.map((movie: any) => ({
				movie_id: movie.movie_id,
				movie_image: movie.movie_image1,
				movie_name: movie.movie_name,
			}));
			setMovies(formattedMovies);
			setLoading(false);
		};
		fetchData();
	}, []);

	const getContainerWidth = (breakpoint: string) => {
		switch (breakpoint) {
			case 'sm':
				return '100%';
			case 'md':
				return 'calc(50% - 7.5px)';
			default:
				return 'calc(33.3333% - 10px)';
		}
	};

	return (
		<>
			<TopSlider />

			<TopSectionContainer>
				<TopSectionHeader title="作品案内" link="/movies" />
				<Box
					flexWrap="wrap"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					marginTop="15px"
					gap="15px"
				>
					{loading
						? Array.from({ length: 6 }).map((_, index) => (
								<Box key={index} width={getContainerWidth(breakpoint)}>
									<AspectRatio ratio={5 / 7}>
										<Placeholder width="100%" height="100%" />
									</AspectRatio>
								</Box>
							))
						: movies.map((movie: Movie) => (
								<Box key={movie.movie_id} width={getContainerWidth(breakpoint)}>
									<Link href={`./movies/${movie.movie_id}`}>
										<MovieCard
											key={movie.movie_id}
											movie_id={movie.movie_id}
											movie_image={movie.movie_image}
											movie_name={movie.movie_name}
										/>
									</Link>
								</Box>
							))}
				</Box>
			</TopSectionContainer>

			<TopSectionContainer>
				<TopSectionHeader title="劇場案内" link="/theaters" />
				<TheaterList />
			</TopSectionContainer>

			<TopSectionContainer>
				<TopSectionHeader title="売店案内" link="/shops" />
				<ShopList />
			</TopSectionContainer>

			<TopSectionContainer>
				<TopSectionHeader title="イベント案内" link="/events" />
				<EventList />
			</TopSectionContainer>

			<TopSectionContainer>
				<TopSectionHeader title="サービス案内" link="/services" />
				<ServiceList />
			</TopSectionContainer>
		</>
	);
}
