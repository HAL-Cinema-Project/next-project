import { Accordion, AccordionItem, Box } from '@yamada-ui/react';
import React from 'react';

const adminMovieList = [
	{
		id: 1,
		movie_title: 'テストと実装の狭間に',
		start_day: '2024-04-17',
		category: 'アニメ',
	},
	{
		id: 2,
		movie_title: 'いつかテストする君と',
		start_day: '2024-04-17',
		category: '恋愛',
	},
	{
		id: 3,
		movie_title: 'TEST~それをしたら開発終わり~',
		start_day: '2024-04-17',
		category: 'ホラー',
	},
	{
		id: 4,
		movie_title: 'THE TEST',
		start_day: '2024-04-17',
		category: 'アニメ',
	},
	{
		id: 5,
		movie_title: 'テストをやめるな',
		start_day: '2024-04-17',
		category: 'アニメ',
	},
];

export const AdminMovieAccordion = () => {
	return (
		<>
			<Box>
				{adminMovieList.map((data) => (
					<Accordion key={data.id} isToggle>
						<AccordionItem
							label={`作品名:${data.movie_title} 上映開始日:${data.start_day} カテゴリー:${data.category}`}
						></AccordionItem>
					</Accordion>
				))}
			</Box>
		</>
	);
};
