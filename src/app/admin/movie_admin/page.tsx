import { AdminSort } from '@/app/_components/block/AdminSort';
import { AdminCaption } from '@/app/_layouts/block/AdminCaption';
import { Box } from '@yamada-ui/react';
import React from 'react';
import { AdminMovieAccordion } from './components/AdminMovieAccordion';
import { AdminCategories } from './components/AdminCategories';

const page = () => {
	const title = '映画管理';

	return (
		<>
			<Box w={'1200px'} m={'auto'}>
				<Box padding={'20px'}>
					<AdminCaption title={title} />
					<AdminSort />
					<AdminCategories />
					<AdminMovieAccordion />
				</Box>
			</Box>
		</>
	);
};

export default page;
