'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@yamada-ui/react';
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

		// const data = {
		// 	price_sum: totalPrice,
		// 	ticket_id: [],
		// };

		router.push('/payment_method');

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
		<div>
			<>
				<Box maxW={'1500px'} m={'20px'}>
					<form onSubmit={handleSubmit}>
						<Box w={'80%'} m={'auto'}>
							<BreadcrumbList />
							<TicketCaption />

							<Box
								display={'flex'}
								justifyContent={'space-between'}
								gap={'10px'}
							>
								<Box
									display={'flex'}
									flexDirection={'column'}
									justifyContent={'space-between'}
									w={'100%'}
								>
									<TicketSelect />
									<Box alignItems={'space-between'}>
										<Button w={'100%'} rounded={'none'}>
											キャンセル
										</Button>
									</Box>
								</Box>

								<Box
									w={'100%'}
									display={'flex'}
									flexDirection={'column'}
									justifyContent={'space-between'}
								>
									{renderScreenComponent()}
									<Button
										w={'100%'}
										rounded={'none'}
										type="submit"
										onClick={() =>
											handleScheduleInfo
												? handleScheduleInfo(scheduleId)
												: undefined
										} // 修正: handleScheduleInfo の存在確認と呼び出し
									>
										次へ進む
									</Button>
								</Box>
							</Box>
						</Box>
					</form>
				</Box>
			</>
		</div>
	);
};

export default Page;
