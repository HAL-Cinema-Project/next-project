// import { Box, Card, Image, Text } from '@yamada-ui/react';
// import React from 'react';
// import { scheduleData } from '@/mock/schedule/mock';
// import { fetchScheduleInterface } from '@/mock/schedule/scheduleInterface';
// import { TheaterSchedule } from './TheaterSchedule';
// import Link from 'next/link';

// type propsType = {
// 	key: number;
// 	id: number;
// 	title: string;
// 	image: string;
// };

// export const MovieScheduleField = (props: propsType) => {
// 	return (
// 		<Card
// 			key={props.id}
// 			m="20px auto"
// 			variant="outline"
// 			borderRadius="2px"
// 			bgColor="theaterSchedule.bg"
// 		>
// 			<Box display="flex" alignItems="center" w="100%" h="75px" pl="20px">
// 				<Text fontWeight="bold" fontSize="1.2rem">
// 					{props.title}
// 				</Text>
// 			</Box>

// 			<Box display="flex" justifyContent="space-between" p="0 0 20px 20px">
// 				<Image
// 					className="img"
// 					src={props.image}
// 					w="250px"
// 					mr="25px"
// 					aspectRatio="9\16"
// 					objectFit="cover"
// 					borderRadius="2px"
// 					alt={props.title}
// 				/>

// 				<Box display="flex" gap="12px" pl="20px" flexWrap="wrap" w="100%">
// 					{scheduleData.map((data: fetchScheduleInterface) => (
// 						// <Link href={""} key={data.id}>
// 						<TheaterSchedule
// 							key={data.id}
// 							id={data.id}
// 							screening_time={data.screening_time}
// 							screen_number={data.screen_number}
// 							reservation={data.reservation}
// 						/>
// 						// </Link>
// 					))}
// 				</Box>
// 			</Box>
// 		</Card>
// 	);
// };

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
							/>
						))}
					</Box>
				</Box>
			</Box>
		</Card>
	);
}
