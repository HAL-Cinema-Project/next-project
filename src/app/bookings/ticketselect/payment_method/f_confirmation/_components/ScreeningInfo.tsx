import { Box, Text, Button, Link } from '@yamada-ui/react';
import React from 'react';

const ScreeningInfo = () => {
	//仮データ
	const theater = '新宿シネマ';
	const movieTitle = '君の名は。';
	const screeningTime = '2024年7月10日 18:00';

	return (
		<Box
			maxW="600px"
			w="600px"
			p="10px"
			sx={{
				'@media screen and (max-width: 1000px)': {
					maxW: '100%',
					w: '100%',
				},
			}}
		>
			<Box
				p="10px 20px"
				fontSize="1.5rem"
				mb="4px"
				color="#fff"
				bgColor="#333"
				boxShadow="md"
				sx={{
					'@media screen and (max-width: 1000px)': {
						w: '100%',
					},
				}}
			>
				<Text>上映情報</Text>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				p="10px 20px"
				fontSize="1.2rem"
				mb="4px"
				borderRadius="3px"
				boxShadow="0 4px 8px rgba(0, 0, 0, 0.5)"
				sx={{
					'@media screen and (max-width: 1000px)': {
						w: '100%',
					},
				}}
			>
				<Text>劇場 : </Text>
				<Box>{theater}</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				p="10px 20px"
				fontSize="1.2rem"
				mb="4px"
				borderRadius="3px"
				boxShadow="0 4px 8px rgba(0, 0, 0, 0.5)"
				sx={{
					'@media screen and (max-width: 1000px)': {
						w: '100%',
					},
				}}
			>
				<Text>作品 : </Text>
				<Box>{movieTitle}</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				p="10px 20px"
				fontSize="1.2rem"
				mb="4px"
				borderRadius="3px"
				boxShadow="0 4px 8px rgba(0, 0, 0, 0.5)"
				sx={{
					'@media screen and (max-width: 1000px)': {
						w: '100%',
					},
				}}
			>
				<Text>日時 : </Text>
				<Box>{screeningTime}</Box>
			</Box>
			<Box
				w="100%"
				p="10px 20px"
				sx={{
					'@media screen and (max-width: 1000px)': {
						display: 'none',
					},
				}}
			>
				<Link href="/">
					<Button w="100%" h="70px" p="20px 0" colorScheme="gray">
						決済情報を入力しなおす
					</Button>
				</Link>
			</Box>
		</Box>
	);
};

export default ScreeningInfo;
