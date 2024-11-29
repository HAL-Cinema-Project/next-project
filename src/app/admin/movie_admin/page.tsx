import { AdminCaption } from '@/app/_layouts/block/AdminCaption';
import { Box } from '@yamada-ui/react';
import React from 'react';
import { AdminMovieManager } from './components/AdminMovieManager';

const page = async () => {
	const title = '映画管理';

	return (
		<Box w={'1200px'} m={'auto'}>
			<Box padding={'20px'}>
				<AdminCaption title={title} />
				<AdminMovieManager /> {/* クライアントコンポーネント */}
			</Box>
		</Box>
	);
};

export default page;
