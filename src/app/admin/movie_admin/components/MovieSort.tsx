// import { Box, Button, Input } from '@yamada-ui/react';
// import React from 'react';

// export const MovieSort = () => {
// 	return (
// 		<>
// 			<Box display={'flex'} gap={'10px'} w={'100%'} py={'10px'}>
// 				<Input w={'25%'} placeholder="作品名を検索" />
// 				<Button
// 					w={'25%'}
// 					bgColor={'#000'}
// 					color={'#fff'}
// 					p={'10px'}
// 					rounded={'0'}
// 				>
// 					作品名でソート
// 				</Button>
// 				<Button
// 					w={'25%'}
// 					bgColor={'#000'}
// 					color={'#fff'}
// 					p={'10px'}
// 					rounded={'0'}
// 				>
// 					上映開始日でソート
// 				</Button>
// 				<Button
// 					w={'25%'}
// 					bgColor={'#000'}
// 					color={'#fff'}
// 					p={'10px'}
// 					rounded={'0'}
// 				>
// 					項目追加
// 				</Button>
// 			</Box>
// 		</>
// 	);
// };

import { Box, Button, Input } from '@yamada-ui/react';
import React from 'react';

interface MovieSortProps {
	onSearch: (term: string) => void; // 検索処理のコールバック
}

export const MovieSort: React.FC<MovieSortProps> = ({ onSearch }) => {
	// 入力イベントハンドラ
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onSearch(e.target.value); // 親コンポーネントに検索キーワードを渡す
	};

	return (
		<Box display={'flex'} gap={'10px'} w={'100%'} py={'10px'}>
			<Input
				w={'25%'}
				placeholder="作品名を検索"
				onChange={handleInputChange} // 入力イベントを登録
			/>
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
				上映開始日でソート
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
};
