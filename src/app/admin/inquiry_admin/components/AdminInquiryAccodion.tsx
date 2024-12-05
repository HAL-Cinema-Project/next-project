'use client';

import { Inquiry } from '@/app/interfaces/movieDataInterface';
import { Accordion, AccordionItem, Box, Button, Text } from '@yamada-ui/react';
import React from 'react';

interface AdminInquirysAccordionProps {
	inquirys: Inquiry[]; // Inquiry の配列
}

export const AdminInquiryAccordion: React.FC<AdminInquirysAccordionProps> = ({
	inquirys,
}) => {
	return (
		<>
			<Box>
				{inquirys.map((data) => (
					<Accordion key={data.inquiry_id} isToggle>
						<AccordionItem
							label={
								<Box>
									タイトル: {data.inquiry_subject}
									&nbsp;&nbsp;&nbsp;&nbsp;カテゴリー: {
										data.inquiry_category
									}{' '}
									<br />
									対応状況: {data.inquiry_comp}&nbsp;&nbsp;&nbsp;&nbsp;
									お問い合わせ登録時間:
									{data.created_at}
								</Box>
							}
							bgColor={'#000'}
							color={'#fff'}
						>
							<Box bgColor={'#222'} p={'20px'}>
								<Text p={'5px'}>email : {data.inquiry_email}</Text>
								<Text p={'5px'}>詳細 : {data.inquiry_content}</Text>
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
