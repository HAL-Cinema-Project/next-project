'use client';
import { Box, Card, Text } from '@yamada-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useHover } from '@yamada-ui/react';
import { fetchScreenNumber } from '@/app/hooks/useScreen_Number';
import { fetchTime } from '@/app/hooks/useTime';

type propsType = {
	key: number;
	id: number;
	screening_time: string;
	screen_number: string;
	reservation: boolean;
	movie_id: number;
};

interface Screen {
	screen_id: number;
}

interface MovieTime {
	time_id: number;
	movie_start: string;
}

export const TheaterSchedule = (props: propsType) => {
	const [screen, setScreen] = useState<Screen[]>([]);
	const [time, setTime] = useState<MovieTime[]>([]);
	const { hovered, ref } = useHover();

	useEffect(() => {
		const fetchData = async () => {
			const screen_data = await fetchScreenNumber();

			const formattedScreen: Screen[] = screen_data.map((screen: any) => ({
				screen_id: screen.screen_id,
			}));
			setScreen(formattedScreen);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchTimeData = async () => {
			const time_data = await fetchTime();

			const formatTime: MovieTime[] = time_data.map((time: any) => ({
				time_id: time.time_id,
				movie_start: time.movie_start,
			}));
			setTime(formatTime);
		};
		fetchTimeData();
	}, []);
	return (
		<>
			{props.reservation === true ? (
				screen.map((screen, index) => (
					<Link
						key={index}
						href={{
							pathname: '/bookings',
							query: {
								screen_id: screen.screen_id,
								movie_id: props.movie_id,
								time_id: time[index]?.time_id,
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
								<Text fontSize="1.4rem">{time[index]?.movie_start}</Text>
								<Text>Screen{screen.screen_id}</Text>
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
