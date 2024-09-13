'use client';
import React, { useEffect } from 'react';
import { BigScreen } from './_components/BigScreen';
import { SmallScreen } from './_components/SmallScreen';
import { BreadcrumbList } from './_components/BreadCrumbList';
import { Box, Button, Text, useTime } from '@yamada-ui/react';

import { BookingDetail } from './_components/BookingDetail';
import { BookingCaption } from './_components/BookingCaption';
import { useSeat } from '../hooks';
import { useSearchParams } from 'next/navigation';
import { MiddleScreen } from './_components/MiddleScreen';
import useMovieId from '../hooks/useMovieId';
import useTimeId from '../hooks/useTimeId';
import Link from 'next/link';

const Page = () => {
	const { handleReservedSeatInfo, handleReserveSeat } = useSeat();

	const router = useSearchParams();
	const screen_id = router.get('screen_id');
	const movie_id = router.get('movie_id');
	const time_id = router.get('time_id');

	const screen_number = Number(screen_id);
	const movie_number = Number(movie_id);
	const time_number = Number(time_id);

	const { time, loading_time, error_time } = useTimeId(time_number);

	const { movie, loading, error } = useMovieId(movie_number);

	useEffect(() => {
		handleReservedSeatInfo(movie_number);
	}, []);

	const renderScreenComponent = () => {
		if (screen_number === 1) {
			return <BigScreen screen_id={screen_number}></BigScreen>;
		} else if (screen_number === 2) {
			return <BigScreen screen_id={screen_number}></BigScreen>;
		} else if (screen_number === 3) {
			return <BigScreen screen_id={screen_number}></BigScreen>;
		} else if (screen_number === 4) {
			return <MiddleScreen screen_id={screen_number}></MiddleScreen>;
		} else if (screen_number === 5) {
			return <MiddleScreen screen_id={screen_number}></MiddleScreen>;
		} else if (screen_number === 6) {
			return <SmallScreen screen_id={screen_number}></SmallScreen>;
		} else if (screen_number === 7) {
			return <SmallScreen screen_id={screen_number}></SmallScreen>;
		} else if (screen_number === 8) {
			return <SmallScreen screen_id={screen_number}></SmallScreen>;
		} else {
			return <div>該当するスクリーンが見つかりません</div>;
		}
	};

	if (!movie) {
		return <p>loading</p>;
	}

	if (!time) {
		return <p>loading</p>;
	}

	return (
		<Box
			margin="0 auto"
			maxWidth="1500px"
			width="100%"
			height="auto"
			backgroundColor="#fff"
		>
			<BreadcrumbList />
			<BookingCaption />
			<Box
				display="flex"
				gap="10px"
				margin="15px 0"
				padding="10px"
				borderRadius="2px"
				border="solid 1px #ddd"
			>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="space-between"
					maxW="400px"
					minW="400px"
					width="100%"
				>
					<BookingDetail movie={movie} time={time} />
					<Box
						alignItems="space-between"
						width="100%"
						height="40px"
						borderRadius="2px"
						backgroundColor="#111"
						_hover={{
							bg: '#08f',
							color: '#fff',
							transition: 'background-color 0.3s ease',
						}}
					>
						<Link href="/" passHref>
							<Text
								fontSize="20px"
								lineHeight="2.0"
								textAlign="center"
								color="#fff"
							>
								キャンセル
							</Text>
						</Link>
					</Box>
				</Box>
				<Box
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'space-between'}
					maxW="1070px"
					minW="1070px"
					width="100%"
				>
					{renderScreenComponent()}
					<Button
						w="100%"
						height="40px"
						rounded="2px"
						bgColor="#111"
						color="#fff"
						_hover={{
							bg: '#08f',
							color: '#fff',
							transition: 'background-color 0.3s ease',
						}}
						onClick={() =>
							handleReserveSeat(screen_number, movie_number, time_number)
						}
					>
						選択した座席を予約する
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Page;
