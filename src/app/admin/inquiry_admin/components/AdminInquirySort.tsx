// AdminInquirySort.tsx
import { Box, Button, Input } from '@yamada-ui/react';
import React from 'react';

export function AdminInquirySort(props: any) {
	const { onDateSort } = props;

	return (
		<Box display={'flex'} gap={'10px'} w={'100%'} py={'10px'}>
			<Input w={'25%'} placeholder="作品名を検索" />
			<Button
				w={'25%'}
				bgColor={'#000'}
				color={'#fff'}
				p={'10px'}
				rounded={'0'}
				onClick={() => {
					onDateSort();
				}}
			>
				日付ソート
			</Button>
			<Button
				w={'25%'}
				bgColor={'#000'}
				color={'#fff'}
				p={'10px'}
				rounded={'0'}
			>
				未対応ソート
			</Button>
			<Button
				w={'25%'}
				bgColor={'#000'}
				color={'#fff'}
				p={'10px'}
				rounded={'0'}
			>
				項目追加
			</Button>
		</Box>
	);
}
