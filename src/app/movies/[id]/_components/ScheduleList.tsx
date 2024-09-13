import SeatAvailability from '@/app/hooks/useSchedule';
import { fetchScreen } from '@/app/hooks/useScreen';
import { fetchScreenNumber } from '@/app/hooks/useScreen_Number';
import { fetchTime } from '@/app/hooks/useTime';
import { Box, Card, Text, useBreakpoint } from '@yamada-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type scheduleType = {
	key: number;
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
	screen_id: number;
}

export const ScheduleList = (props: scheduleType) => {
	const [screen, setScreen] = useState<Screen[]>([]);
	const [time, setTime] = useState<MovieTime[]>([]);
	const breakpoint = useBreakpoint();

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
	console.log(screen);

	useEffect(() => {
		const fetchTimeData = async () => {
			const time_data = await fetchTime();

			const formatTime: MovieTime[] = time_data.map((time: any) => ({
				time_id: time.time_id,
				movie_start: time.movie_start,
				screen_id: time.screen_id,
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
							w="240px"
							h="200px"
							color="#fff"
							backgroundColor="#111"
							borderRadius="2px"
							_hover={{
								bg: '#08f',
								color: '#fff',
								transition: 'background-color 0.3s ease',
							}}
						>
							<Box margin="auto">
								<Text fontSize="1.4rem">
									{time[index]?.movie_start || '時間未定'}
								</Text>
								<Text>Screen{screen.screen_id}</Text>
								<Text>指</Text>
								{/* <SeatAvailability movie_id={props.movie_id} screen_id={screen.screen_id} time_id={time[index].time_id}></SeatAvailability> */}
								<Text>予約可能</Text>
							</Box>
						</Card>
					</Link>
				))
			) : (
				<Card
					w="240px"
					h="200px"
					color="#fff"
					backgroundColor="#111"
					borderRadius="2px"
					_hover={{
						bg: '#08f',
						color: '#fff',
						transition: 'background-color 0.3s ease',
					}}
					opacity="0.5"
				>
					<Text>{props.screening_time}</Text>
					<Text>Screen{props.screen_number}</Text>
					{/* <Text>指</Text> */}
					<Text>予約不可</Text>
				</Card>
			)}
		</>
	);
};
