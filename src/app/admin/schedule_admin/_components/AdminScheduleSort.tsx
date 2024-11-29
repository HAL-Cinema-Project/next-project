import { Box, Button, Input, Text } from '@yamada-ui/react';
import React from 'react';

export const AdminScheduleSort = () => {
	return (
		<>
			<Box display={'flex'} gap={'10px'} w={'100%'} py={'10px'}>
				<Input w={'25%'} placeholder="作品名を検索" />
				<Button
					w={'25%'}
					bgColor={'#000'}
					color={'#fff'}
					p={'10px'}
					rounded={'0'}
				>
					作品名でソート
				</Button>
				<Button
					w={'25%'}
					bgColor={'#000'}
					color={'#fff'}
					p={'10px'}
					rounded={'0'}
				>
					上映日時でソート
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
		</>
	);
};
