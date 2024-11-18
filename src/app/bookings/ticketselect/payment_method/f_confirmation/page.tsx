import { Box, Button, Text, Link } from '@yamada-ui/react';
import React from 'react';
import ScreeningInfo from './_components/ScreeningInfo';
import PaymentInfo from './_components/PaymentInfo';
import StartOverBtn from './_components/StartOverBtn';
import Tabs from './_components/Tabs';

const page = () => {
	return (
		<Box maxW="1500px" m="0 auto">
			<Box
				style={{
					width: '1500px',
					height: '30px',
					margin: '10px auto',
					borderRadius: '2px',
					backgroundColor: '#111',
				}}
			>
				<p
					style={{
						paddingLeft: '10px',
						fontSize: '16px',
						lineHeight: '1.8',
						color: '#fff',
					}}
				>
					<a href="../">トップページ</a>
					{' > '}
					<a href="">最終確認</a>
				</p>
			</Box>

			{/* タブ */}
			<Tabs />

			<Box
				w="1500px"
				m="20px auto"
				bgColor="#111"
				lineHeight="1.5"
				color="#fff"
				p="10px"
			>
				<Text ml="1vw" fontSize="2rem">
					最終確認
				</Text>
			</Box>

			<Box
				display="flex"
				sx={{
					'@media screen and (max-width: 1000px)': {
						display: 'block',
					},
				}}
			>
				<ScreeningInfo />
				<PaymentInfo />
				<Box
					sx={{
						'@media screen and (min-width: 1000px)': {
							display: 'none',
						},
					}}
				>
					<StartOverBtn />
				</Box>
			</Box>

			<Box
				display="flex"
				maxW="1500px"
				m="20px auto"
				justifyContent="space-between"
			>
				<Box w="600px" p="10px 20px">
					<Link href="/">
						<Button w="100%" h="50px" p="20px 0" colorScheme="gray">
							キャンセル
						</Button>
					</Link>
				</Box>
				<Box w="900px" p="10px 20px">
					<Link href="/next-page">
						<Button w="100%" h="50px" p="20px 0" colorScheme="blue">
							次へ進む
						</Button>
					</Link>
				</Box>
			</Box>
		</Box>
	);
};

export default page;
