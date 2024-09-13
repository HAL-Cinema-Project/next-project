import {
	Accordion,
	AccordionItem,
	Box,
	Grid,
	useBreakpointValue,
	SegmentedControl,
	SegmentedControlItem,
	AccordionLabel,
	AccordionPanel,
} from '@yamada-ui/react';
import React, { useState } from 'react';
import { ScheduleList } from './ScheduleList';
import { scheduleData } from '@/mock/schedule/mock';
import { fetchScheduleInterface } from '@/mock/schedule/scheduleInterface';
import { getNextWeekDates } from '@/utils/scheduleDate';

type MovieInformationProps = {
	movie: {
		movie_id: number;
		movie_name: string;
		movie_detail: string;
		movie_time: number;
		movie_image1: string;
		movie_image2: string;
		movie_cast: string;
		movie_director: string;
	};
};

export const ScheduleAccordion = ({ movie }: MovieInformationProps) => {
	const breakpoint = useBreakpointValue({
		base: 'base',
		lg: 'lg',
		sm: 'sm',
		md: 'md',
	});
	const isSmallScreen = ['sm', 'md'].includes(breakpoint);
	const isMiddleScreen = ['lg'].includes(breakpoint);

	const [selectedDate, setSelectedDate] = useState(0);

	const style = {
		bgColor: '#111',
		color: '#fff',
		borderRadius: '2px',
	};

	const style2 = {
		bgColor: '#fff',
		color: '#111',
		borderRadius: '2px',
	};

	const dateItems: SegmentedControlItem[] = getNextWeekDates().map(
		(item, index) => ({
			label: item.label,
			value: index.toString(),
		})
	);

	const handleDateChange = (value: string) => {
		console.log(`選択された日付: ${value}`);
		setSelectedDate(Number(value));
	};

	return (
		<>
			<Box margin="15px 0">
				<SegmentedControl
					colorScheme="primary"
					borderRadius="2px"
					w="100%"
					items={dateItems}
					value={selectedDate.toString()}
					onChange={handleDateChange}
					flexWrap="nowrap"
					overflowX="auto"
					sx={{
						display: 'grid',
						gridTemplateColumns: isSmallScreen
							? 'repeat(2, 1fr)'
							: isMiddleScreen
								? 'repeat(4, 1fr)'
								: 'repeat(auto-fit, minmax(100px, 1fr))',
						gap: 2,
					}}
				/>
				<Box
					marginTop="15px"
					padding="10px"
					border="solid 1px #ddd"
					borderRadius="2px"
				>
					<Accordion
						variant="card"
						borderRadius="2px"
						isMultiple
						isToggle
						icon={'+'}
					>
						{['東京', '名古屋', '大阪'].map((city) => (
							<AccordionItem
								key={city}
								label={city}
								sx={{ ...style }}
								border="none"
							>
								<AccordionLabel
									_expanded={{ bg: '#08f', color: '#fff' }}
									_hover={{ bg: '#08f', color: '#fff' }}
								>
									{city}
								</AccordionLabel>
								<AccordionPanel sx={{ p: '0' }}>
									<Grid
										templateColumns={
											isSmallScreen
												? 'repeat(2, 1fr)'
												: 'repeat(auto-fill, minmax(230px, 1fr))'
										}
										overflowX="hidden"
										sx={{ ...style2 }}
										gap="10px"
										marginTop="10px"
									>
										{scheduleData.map((data: fetchScheduleInterface) => (
											<ScheduleList
												key={data.id}
												screening_time={data.screening_time}
												screen_number={data.screen_number}
												reservation={data.reservation}
												movie_id={movie.movie_id}
											/>
										))}
									</Grid>
								</AccordionPanel>
							</AccordionItem>
						))}
					</Accordion>
				</Box>
			</Box>
		</>
	);
};
