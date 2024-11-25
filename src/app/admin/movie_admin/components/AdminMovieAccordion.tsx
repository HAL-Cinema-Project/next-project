'use client';

import useFetchMovies from '@/app/hooks/useFetchMovies';
import { Accordion, AccordionItem, Box, Button, Text } from '@yamada-ui/react';

export const AdminMovieAccordion = () => {
	const { movieData, filteredMovies, loading } = useFetchMovies();

	return (
		<>
			<Box>
				{movieData.map((data) => (
					<Accordion key={data.movie_id} isToggle>
						<AccordionItem
							label={`作品名:${data.movie_name}　　上映開始日:${data.movie_start_date}　　カテゴリー:${data.category_id}`}
							bgColor={'#000'}
							color={'#fff'}
						>
							<Box bgColor={'#222'} p={'20px'}>
								<Text p={'5px'}>
									時間 : {data.movie_time} &nbsp;&nbsp;&nbsp; メイン画像 :
									{data.movie_image1} &nbsp;&nbsp;&nbsp; サブ画像 :{' '}
									{data.movie_image2}
								</Text>
								<Text p={'5px'}>
									監督 : {data.movie_director} &nbsp;&nbsp;&nbsp; キャスト :
									{data.movie_cast}
								</Text>
								<Text p={'5px'}>説明 : {data.movie_detail}</Text>
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
		</>
	);
};
