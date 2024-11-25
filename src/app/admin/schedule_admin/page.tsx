import { AdminScheduleSort } from '@/app/admin/schedule_admin/_components/AdminScheduleSort';
import { AdminCaption } from '@/app/_layouts/block/AdminCaption';
import { Box } from '@yamada-ui/react';
import React from 'react';
import { AdminScheduleAccordion } from './_components/AdminSchedulesAccordion';

const page = () => {
	const title = '上映管理';

	return (
		<>
			<Box w={'1200px'} m={'auto'}>
				<Box padding={'20px'}>
					<AdminCaption title={title} />
					<AdminScheduleSort />
					<AdminScheduleAccordion />
				</Box>
			</Box>
		</>
	);
};

export default page;
