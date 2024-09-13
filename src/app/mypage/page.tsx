'use client';

import { Box, Center } from '@yamada-ui/react';
import React, { useState, useEffect } from 'react';
import UserInfo from './_components/block/UserInfo';
import { TicketInfo } from './_components/block/TicketInfo';
import useUserId from '../hooks/useUserId';
import { useRouter } from 'next/navigation';

const Page = () => {
	const { user, schedules, loading, error } = useUserId();

	if (loading) {
		return <p>Loading...</p>; // ローディング中
	}

	if (error) {
		return <p>Error: {error}</p>; // エラーが発生した場合
	}

	if (!user) {
		return <p>No user or schedules found</p>; // ユーザまたはスケジュールが見つからない場合
	}

	return (
		<Box m="0 auto">
			<Center
				style={{
					width: '100%',
					height: '30px',
					margin: '0 auto',
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
					<a href="shop">売店案内</a>
				</p>
			</Center>

			<UserInfo user={user} />
			<TicketInfo schedules={schedules} />
		</Box>
	);
};

export default Page;
