// src/app/mypage/_components/block/TicketInfo.tsx
import React from 'react';
import { Box, Center, Text, Accordion, AccordionItem } from '@yamada-ui/react';

type Movie = {
	movie_id: number;
	movie_image: string;
	movie_name: string;
};

type MovieTime = {
	time_id: number;
	movie_start: string;
};

type Seat = {
	seat_id: number;
	seat_point: string;
};

type Schedule = {
	schedule_id: number;
	screen_id: number;
	movie_id: number;
	seat_id: number | null;
	time_id: number;
	movie: Movie | null;
	movie_time: MovieTime | null;
	seat: Seat | null;
};

type TicketInfoProps = {
	schedules: Schedule[] | null;
};

export const TicketInfo: React.FC<TicketInfoProps> = ({ schedules }) => {
	if (!schedules) {
		return null; // schedulesがnullの場合、何も表示しない
	}
	return (
		<Box bgColor="#fff" color="#000" py="20px">
			<Box
				w="80%"
				m="0 auto"
				bgColor="#111"
				lineHeight="1.5"
				color="#fff"
				p="10px"
			>
				<Text ml="1vw" fontSize="2rem">
					予約情報
				</Text>
			</Box>
			<Center>
				<Accordion defaultIndex={[1, 2]} isMultiple w="80%">
					{schedules.map((schedule) => (
						<AccordionItem
							key={schedule.schedule_id}
							label={
								schedule.movie ? schedule.movie.movie_name : 'Unknown Movie'
							}
						>
							<Box
								display="flex"
								flexWrap="wrap"
								w="80%"
								m="20px auto"
								gap="10px"
							>
								<Box
									display="flex"
									w="calc(50% - 10px)"
									bgColor="#f3f3f3"
									boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
									overflow="hidden"
								>
									<Box display="flex" flexDirection="column" p="10px" w="100%">
										<Box>
											<Text>劇場情報</Text>
											<Box display="flex">
												<Text>スクリーン{schedule.screen_id}</Text>
											</Box>
										</Box>
									</Box>
								</Box>
								<Box
									display="flex"
									w="calc(50% - 10px)"
									bgColor="#f3f3f3"
									boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
									overflow="hidden"
								>
									<Box display="flex" flexDirection="column" p="10px" w="100%">
										<Box>
											<Text>作品情報</Text>
											<Box display="flex" w="100%">
												<Text>
													{schedule.movie
														? schedule.movie.movie_name
														: 'Unknown Movie'}
												</Text>
											</Box>
										</Box>
									</Box>
								</Box>
							</Box>
							<Box
								display="flex"
								flexWrap="wrap"
								w="80%"
								m="20px auto"
								gap="10px"
							>
								<Box
									display="flex"
									w="calc(50% - 10px)"
									bgColor="#f3f3f3"
									boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
									overflow="hidden"
								>
									<Box display="flex" flexDirection="column" p="10px" w="100%">
										<Box>
											<Text>座席情報</Text>
											<Box display="flex" w="100%">
												<Text>{schedule.seat?.seat_point}</Text>
											</Box>
										</Box>
									</Box>
								</Box>
								<Box
									display="flex"
									w="calc(50% - 10px)"
									bgColor="#f3f3f3"
									boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
									overflow="hidden"
								>
									<Box display="flex" flexDirection="column" p="10px" w="100%">
										<Box display="flex">
											<Box>
												<Text>上映日時</Text>
												<Box display="flex">
													<Text>{schedule.movie_time?.movie_start}</Text>
												</Box>
											</Box>
										</Box>
									</Box>
								</Box>
							</Box>
						</AccordionItem>
					))}
				</Accordion>
			</Center>
		</Box>
	);
};
