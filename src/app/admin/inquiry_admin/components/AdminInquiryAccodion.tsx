import { Accordion, AccordionItem, Box, Button, Text } from '@yamada-ui/react';
import React from 'react';

export function AdminInquiryAccordion(props: any) {
	const { data } = props;

	return (
		<Box>
			{data.map((item: any) => (
				<Accordion key={item.id} isToggle>
					<AccordionItem
						label={
							<Box>
								作品名: {item.movie_title} カテゴリー: {item.category} <br />
								対応状況: {item.Status} お問い合わせ登録時間:
								{item.inquirytime}
							</Box>
						}
						bgColor={'#000'}
						color={'#fff'}
					>
						<Box bgColor={'#222'} p={'20px'}>
							<Text p={'5px'}>
								時間 : {item.time} &nbsp;&nbsp;&nbsp; メイン画像 :
								{item.main_image} &nbsp;&nbsp;&nbsp; サブ画像 : {item.sub_image}
							</Text>
							<Text p={'5px'}>
								監督 : {item.director} &nbsp;&nbsp;&nbsp; キャスト :{item.cast}
							</Text>
							<Text p={'5px'}>説明 : {item.description}</Text>
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
}
