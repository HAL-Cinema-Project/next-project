'use client';
import { Box, Card, Image, Text, useBreakpoint } from '@yamada-ui/react';
import React from 'react';
import { scheduleData } from '@/mock/schedule/mock';
import { fetchScheduleInterface } from '@/mock/schedule/scheduleInterface';
import { TheaterSchedule } from './TheaterSchedule';
import Link from 'next/link';

type MovieCardProps = {
	key: number;
	movie_image: string;
	movie_name: string;
	movie_id: number;
	cinema_id: number;
};

export function MovieScheduleField(movie: MovieCardProps) {
	const breakpoint = useBreakpoint();
	return (
		<Card
			key={movie.movie_id}
			width="100%"
			marginTop="15px"
			padding="10px 0"
			variant="outline"
			borderRadius="2px"
			bgColor="#fff"
		>
			<Box
				className="title-box"
				width="calc(100% - 20px)"
				height="40px"
				marginLeft="10px"
				borderRadius="2px"
				backgroundColor="#111"
			>
				<p
					style={{
						paddingLeft: '10px',
						fontSize: '30px',
						lineHeight: '1.2',
						color: '#fff',
					}}
				>
					{movie.movie_name}
				</p>
			</Box>
			<Box
				display="flex"
				flexDirection={['sm', 'md'].includes(breakpoint) ? 'column' : 'row'}
			>
				<Box
					flex="2"
					height="auto"
					margin="10px 10px 0 10px"
					borderRadius="2px"
					backgroundColor="#fff"
				>
					<Box position="relative">
						<Image
							src={`/${movie.movie_image}`}
							alt={movie.movie_image}
							width="100%"
							objectFit="cover"
							style={{ borderRadius: '2px' }}
						/>
					</Box>
				</Box>
				<Box
					flex="8"
					display="flex"
					margin="10px 0 0 0"
					flexDirection="column"
					marginLeft={['sm', 'md'].includes(breakpoint) ? '10px' : '0'}
					flexWrap="wrap"
				>
					<Box display="flex" flexWrap="wrap" gap="10px">
						{scheduleData.map((data: fetchScheduleInterface) => (
							<TheaterSchedule
								key={data.id}
								id={data.id}
								screening_time={data.screening_time}
								screen_number={data.screen_number}
								reservation={data.reservation}
								movie_id={movie.movie_id}
								cinema_id={movie.cinema_id}
							/>
						))}
					</Box>
				</Box>
			</Box>
		</Card>
	);
}
