'use client';
import { Box, Card, Text } from '@yamada-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useHover } from '@yamada-ui/react';
import { fetchMovieSchedule } from '@/app/hooks/useMovieSchedule';
import { fetchMovieSchedules } from '@/app/hooks/useMovieScheduleMovie';
import { fetchCinemaSchedules } from '@/app/hooks/useMovieScheduleTheater';

type propsType = {
	key: number;
	id: number;
	screening_time: string;
	screen_number: string;
	reservation: boolean;
	movie_id: number;
	cinema_id: number;
};

interface MovieSchedule {
	movie_schedule_id: number;
	cinema_id: number;
	screen_id: number;
	movie_id: number;
	start_time: number;
	end_time: number;
}

export const TheaterSchedule = (props: propsType) => {
	const [schedule, setSchedule] = useState<MovieSchedule[]>([]);
	const { hovered, ref } = useHover();

	useEffect(() => {
		const fetchData = async () => {
			const screen_data = await fetchCinemaSchedules(props.cinema_id);

			const formattedScreen: MovieSchedule[] = screen_data.map(
				(screen: any) => ({
					screen_id: screen.screen_id,
				})
			);
			setSchedule(formattedScreen);
		};
		fetchData();
	}, [props.cinema_id]);

	return (
		<>
			{props.reservation === true ? (
				schedule.map((schedule, index) => (
					<Link
						key={index}
						href={{
							pathname: '/bookings',
							query: {
								screen_id: schedule.screen_id,
							},
						}}
						passHref
					>
						<Card
							backgroundColor="#111"
							color="#fff"
							key={props.id}
							w="226px"
							h="204px"
							borderRadius="none"
							p="2px"
							ref={ref}
							_hover={{
								backgroundColor: '#08f',
								transition: 'background-color 0.3s ease',
							}}
						>
							<Box margin="auto">
								<Text fontSize="1.4rem">{schedule.start_time}</Text>
								<Text>Screen{schedule.screen_id}</Text>
								<Text>予約可能</Text>
							</Box>
						</Card>
					</Link>
				))
			) : (
				<Card
					key={props.key}
					w="226px"
					h="204px"
					opacity="0.5"
					variant="none"
					borderRadius="none"
					p="2px"
				>
					<Box margin="auto">
						<Text fontSize="1.4rem">{props.screening_time}</Text>
						<Text>{props.screen_number}</Text>
						<Text>予約不可</Text>
					</Box>
				</Card>
			)}
		</>
	);
};
