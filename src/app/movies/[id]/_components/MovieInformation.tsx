'use client';
import React from 'react';
import { Box, Image, Text, useBreakpoint } from '@yamada-ui/react';
import { movieCard } from '@/mock/movie/mock';

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
};

export function MovieInformation({ movie }: MovieInformationProps) {
	const movieDetail = movieCard[0];

	// console.log(decodeURIComponent(movie.movie_image2));

	const breakpoint = useBreakpoint();
	const isSmallScreen = ['sm', 'md'].includes(breakpoint);

	return (
		<Box
			width="100%"
			height="auto"
			marginTop="15px"
			padding="10px 0"
			borderRadius="2px"
			border="solid 1px #ddd"
			backgroundColor="#fff"
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
				flexDirection={isSmallScreen ? 'column' : 'row'}
				padding="10px 10px 0 10px"
				gap="10px"
			>
				<Box flex={isSmallScreen ? '1' : '4'} width="100%">
					<Image
						objectFit="cover"
						src={`/${movie.movie_image2}`}
						alt="movieImage"
						width="100%"
						aspectRatio="16/9"
						style={{ borderRadius: '2px', objectFit: 'cover' }}
					/>
				</Box>

				<Box
					flex={isSmallScreen ? '1' : '6'}
					borderRadius="2px"
					border="solid 1px #ddd"
				>
					<Text
						fontSize="1.2rem"
						fontWeight="bold"
						padding="10px 10px 0px 10px"
					>
						上映詳細
					</Text>
					<Text padding="0 10px 0 10px">上映時間: {movie.movie_time} 分</Text>
					<Text padding="0 10px 0 10px">
						監督: {movie.movie_director}
						出演:【声の出演】{movie.movie_cast} ほか
					</Text>
					<Text
						fontSize="1.2rem"
						fontWeight="bold"
						padding="10px 10px 0px 10px"
					>
						あらすじ
					</Text>
					<Text padding="0 10px 10px 10px">{movie.movie_detail}</Text>
				</Box>
			</Box>
		</Box>
	);
}
