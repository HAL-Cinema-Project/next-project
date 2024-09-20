//page.tsx
'use client';
import { Box, Button, Center, Text } from '@yamada-ui/react';
import React from 'react';
import Tickets from './_components/Tickets';
import PaymentMethod from './_components/PaymentMethod';
import { BreadcrumbList } from './_components/BreadcrumbList';
import { Title } from './_components/Title';
import Link from 'next/link';
import { useRouter } from 'next/router';

const page = () => {
	const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		alert('予約が完了しました');
	};
	return (
		<Box
			margin="0 auto"
			maxWidth="1500px"
			width="100%"
			height="auto"
			backgroundColor="#fff"
		>
			<BreadcrumbList />
			<Title />

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
					<Tickets />
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
					<PaymentMethod />
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
						onClick={handleSubmit}
					>
						予約する
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default page;
