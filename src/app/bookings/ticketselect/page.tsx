'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from '@yamada-ui/react';
import { BreadcrumbList } from '../_components/BreadCrumbList';
import { TicketCaption } from './_components/TicketCaption';
import { TicketSelect } from './_components/TicketSelect';
import { BigSelectSeat } from './_components/BigSelectSeat';
import { SmallSelectSeat } from './_components/SmallSelectSeat';
import { MiddleSelectSeat } from './_components/MiddleSelectSeat';
import { useRecoilValue } from 'recoil';
import { totalPriceState } from '@/app/recoil/atoms/ticketAtoms';
import { getRandomInt } from '@/utils/randomInt';
import { useRouter, useSearchParams } from 'next/navigation';
import { userSchedule } from '@/app/hooks/userSchedule';
import Link from 'next/link';

const Page = () => {
	const [handleScheduleInfo, setHandleScheduleInfo] =
		useState<(scheduleId: number) => Promise<void> | null>();
	const params = useSearchParams();
	const router = useRouter();
	const totalPrice = useRecoilValue(totalPriceState);

	const screen_id = params.get('screen_id');
	const screen_number = Number(screen_id);

	const schedule_id = params.get('schedule_id');
	const scheduleId = Number(schedule_id);

	useEffect(() => {
		const fetchUserSchedule = async () => {
			const { handleScheduleInfo } = await userSchedule();
			setHandleScheduleInfo(() => handleScheduleInfo); // 状態をセット
		};
		fetchUserSchedule();
	}, []);

	const renderScreenComponent = () => {
		if (screen_number === 1) {
			return <BigSelectSeat />;
		} else if (screen_number === 2) {
			return <BigSelectSeat />;
		} else if (screen_number === 3) {
			return <BigSelectSeat />;
		} else if (screen_number === 4) {
			return <MiddleSelectSeat />;
		} else if (screen_number === 5) {
			return <MiddleSelectSeat />;
		} else if (screen_number === 6) {
			return <SmallSelectSeat />;
		} else if (screen_number === 7) {
			return <SmallSelectSeat />;
		} else if (screen_number === 8) {
			return <SmallSelectSeat />;
		} else {
			return <div>該当するスクリーンが見つかりません</div>;
		}
	};

	// ticketselect?seatCount=1&screen_id=3
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = {
			price_sum: totalPrice,
			ticket_id: [],
		};
		router.push('/payment_method?price_sum=' + data);

		// console.log(data);
		// try {
		// 	const res = await fetch('/server/route/price', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify(data),
		// 	});
		// 	if (res.ok) {
		// 		const json = await res.json();
		// 		console.log(json);
		// 		alert('購入が完了しました');
		// 		router.push('/');
		// 	} else {
		// 		console.error('HTTP-Error: ' + res.status);
		// 	}
		// } catch (e) {
		// 	console.error(e);
		// }
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
			<TicketCaption />

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
					<TicketSelect />
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
					<form onSubmit={handleSubmit}>
						<Button
							w="100%"
							height="40px"
							rounded="2px"
							bgColor="#111"
							color="#fff"
							type="submit"
							onClick={() =>
								handleScheduleInfo ? handleScheduleInfo(scheduleId) : undefined
							} // 修正: handleScheduleInfo の存在確認と呼び出し
							_hover={{
								bg: '#08f',
								color: '#fff',
								transition: 'background-color 0.3s ease',
							}}
						>
							次へ進む
						</Button>
					</form>
				</Box>
			</Box>
		</Box>
	);
};

export default Page;
