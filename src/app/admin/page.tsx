import { Box } from '@yamada-ui/react';
import React from 'react';
import { LoginModal } from './components/LoginModal';
import { AdminTop } from './components/AdminTop';

const page = () => {
	return (
		<>
			<Box>
				<LoginModal />
				<Box
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					textAlign={'center'}
					height="80vh"
				>
					<AdminTop />
				</Box>
			</Box>
		</>
	);
};

export default page;
