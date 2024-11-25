'use client';

import useFetchSchedules from '@/app/hooks/useFetchSchedules';
import { Accordion, AccordionItem, Box, Button, Text } from '@yamada-ui/react';

export const AdminScheduleAccordion = () => {
	const { scheduleData, loading } = useFetchSchedules();

	if (loading) {
		return <Text>Loading...</Text>;
	}

	return (
		<Box>
			{scheduleData.map((data) => (
				<Accordion key={data.schedule_id} isToggle>
					<AccordionItem
						label={`作品名: ${data.movie?.movie_name}、劇場: ${data.screen_id}、スクリーン番号: ${data.screen_id}、上映日: ${data.movie_time?.movie_start}`}
						bgColor={'#000'}
						color={'#fff'}
					>
						<Box bgColor={'#222'} p={'20px'}>
							<Text p={'5px'}>
								座席番号: {data.seat?.seat_point}、上映時間 ID: {data.time_id}
							</Text>
							{/* 予約したユーザー情報を表示する場合、適切なデータが必要です */}
						</Box>
						<Box display={'flex'} py={'10px'} gap={'10px'}>
							<Button w={'100%'} bgColor={'#FF0000'} color={'#fff'}>
								削除
							</Button>
							<Button w={'100%'} bgColor={'#007BFF'} color={'#fff'}>
								編集
							</Button>
						</Box>
					</AccordionItem>
				</Accordion>
			))}
		</Box>
	);
};
