'use client';
import React from 'react';
import { Box } from '@yamada-ui/react';
import { BreadcrumbList } from './_components/BreadcrumbList';
import { Title } from './_components/Title';
import { MovieInformation } from './_components/MovieInformation';
import { ScheduleAccordion } from './_components/ScheduleAccordion';
import { useParams, useSearchParams } from 'next/navigation';
import useMovieId from '@/app/hooks/useMovieId';
import { useRouter } from 'next/navigation';

const Page = () => {
	const params = useParams();
	const str_id = params.id;
	const id_num = Number(str_id);

	const { movie, loading, error } = useMovieId(id_num);
	// console.log(id_num);
	// console.log(movie);
	if (!movie) {
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
			</Box>
		);
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
			<MovieInformation movie={movie} />
			<ScheduleAccordion movie={movie} />
		</Box>
	);
};

export default Page;
