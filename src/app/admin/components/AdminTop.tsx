import { Box, Card, Text } from '@yamada-ui/react';
import Link from 'next/link';
import React from 'react';

export const AdminTop = () => {
	const style = {
		card: {
			display: 'flex',
			width: '400px',
			height: '200px',
			alignItems: 'center',
			justifyContent: 'center',
		},
		text: {
			fontSize: '1.5rem',
			fontWeight: 'bold',
			color: '#000',
		},
	};

	const adminPageList = [
		{
			id: 1,
			title: '映画管理',
			route: '/admin/movie_admin',
		},
		{
			id: 2,
			title: '上映時間管理',
			route: '/admin/schedule_admin',
		},
		{
			id: 3,
			title: 'お問い合わせ管理',
			route: '/admin/inquiry_admin',
		},
	];

	return (
		<>
			<Box>
				<Text fontSize={'3xl'} fontWeight={'bold'} pb={'40px'}>
					HALシネマ管理者画面へようこそ
				</Text>
				<Box display={'flex'} justifyContent={'center'} gap={'25px'}>
					{adminPageList.map((index) => (
						<Link href={index.route} key={index.id}>
							<Card style={style.card} border={'2px solid #000'}>
								<Box>
									<Text style={style.text}>{index.title}</Text>
									<Text style={style.text}>&gt;&gt;&gt;</Text>
								</Box>
							</Card>
						</Link>
					))}
				</Box>
			</Box>
		</>
	);
};
