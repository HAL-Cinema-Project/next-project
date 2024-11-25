import { AdminInquirySort } from '@/app/_components/block/AdminInquirySort';
import { AdminCaption } from '@/app/_layouts/block/AdminCaption';
import { Box } from '@yamada-ui/react';
import React from 'react';
import { AdminInquiryAccordion } from './components/AdminInquiryAccodion';

const page = () => {
	const title = '問い合わせ管理';

	return (
		<>
			<Box w={'1200px'} m={'auto'}>
				<Box padding={'20px'}>
					<AdminCaption title={title} />
					<AdminInquirySort />
					<AdminInquiryAccordion />
				</Box>
			</Box>
		</>
	);
};

export default page;
