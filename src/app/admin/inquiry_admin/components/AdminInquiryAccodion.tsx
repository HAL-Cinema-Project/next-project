import { Accordion, AccordionItem, Box, Button, Text } from '@yamada-ui/react';
import React from 'react';

const adminInquiryList = [
	{
		id: 1,
		inquiry_title: 'テストと実装の狭間に',
		inquiry_category: 'トラブル',
		inquirytime: '2024/11/25(月)/10:25:30',
		Status: '未対応',
		name: 'ああああああ',
		status_message: 'いいいいいいいいいいいいいいい',
	},
	{
		id: 2,
		inquiry_title: 'テストと実装の狭間に',
		inquiry_category: 'トラブル',
		inquirytime: '2024/11/25(月)/10:25:30',
		Status: '未対応',
		name: 'ああああああ',
		status_message: 'いいいいいいいいいいいいいいい',
	},
	{
		id: 3,
		inquiry_title: 'テストと実装の狭間に',
		inquiry_category: 'トラブル',
		inquirytime: '2024/11/25(月)/10:25:30',
		Status: '未対応',
		name: 'ああああああ',
		status_message: 'いいいいいいいいいいいいいいい',
	},
];

export const AdminInquiryAccordion = () => {
	return (
		<>
			<Box>
				{adminInquiryList.map((data) => (
					<Accordion key={data.id} isToggle>
						<AccordionItem
							label={
								<Box>
									タイトル: {data.inquiry_title}
									&nbsp;&nbsp;&nbsp;&nbsp;カテゴリー: {data.inquiry_category}{' '}
									<br />
									対応状況: {data.Status}&nbsp;&nbsp;&nbsp;&nbsp;
									お問い合わせ登録時間:
									{data.inquirytime}
								</Box>
							}
							bgColor={'#000'}
							color={'#fff'}
						>
							<Box bgColor={'#222'} p={'20px'}>
								<Text p={'5px'}>名前 : {data.name}</Text>
								<Text p={'5px'}>詳細 : {data.status_message}</Text>
							</Box>
							<Box display={'flex'} py={'10px'} gap={'10px'}>
								<Button w={'100%'} bgColor={'#FF0000'} color={'#fff'}>
									詳細
								</Button>
								<Button w={'100%'} bgColor={'#007BFF'} color={'#fff'}>
									解決
								</Button>
							</Box>
						</AccordionItem>
					</Accordion>
				))}
			</Box>
		</>
	);
};
