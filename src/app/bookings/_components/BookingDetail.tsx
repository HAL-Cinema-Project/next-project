import { Box, Text, Image } from '@yamada-ui/react';
import React from 'react';

type MovieInformationProps = {
	movie: {
		movie_id: number;
		movie_name: string;
		movie_detail: string;
		movie_time: number;
		movie_image1: string;
		movie_image2: string;
		movie_cast: string;
		movie_director: string;
	};
	time: {
		time_id: number;
		movie_start: string;
	};
};

export const BookingDetail = ({ movie, time }: MovieInformationProps) => {
	return (
		<>
			<Box w="100%">
				<Box
					h="40px"
					marginBottom="10px"
					paddingLeft="10px"
					fontSize="20px"
					lineHeight="2.0"
					bgColor="#111"
				>
					<Text
						color="#fff"
						whiteSpace="nowrap"
						overflow="hidden"
						textOverflow="ellipsis"
					>
						上映情報
					</Text>
				</Box>
				<Box
					h="40px"
					marginBottom="10px"
					paddingLeft="10px"
					fontSize="20px"
					lineHeight="2.0"
					bgColor="#111"
				>
					<Text
						color="#fff"
						whiteSpace="nowrap"
						overflow="hidden"
						textOverflow="ellipsis"
					>
						HAL名古屋
					</Text>
				</Box>
				<Box
					h="40px"
					marginBottom="10px"
					paddingLeft="10px"
					fontSize="20px"
					lineHeight="2.0"
					bgColor="#111"
				>
					<Text
						color="#fff"
						whiteSpace="nowrap"
						overflow="hidden"
						textOverflow="ellipsis"
					>
						{movie.movie_name}
					</Text>
				</Box>
				<Box
					h="40px"
					marginBottom="10px"
					paddingLeft="10px"
					fontSize="20px"
					lineHeight="2.0"
					bgColor="#111"
				>
					<Text
						color="#fff"
						whiteSpace="nowrap"
						overflow="hidden"
						textOverflow="ellipsis"
					>
						{time.movie_start}
					</Text>
				</Box>
				<Box display="flex" justifyContent="center">
					<Image
						src={`/${movie.movie_image1}`}
						alt="movieImage"
						w="100%"
						pb="10px"
					/>
				</Box>
			</Box>
		</>
	);
};
