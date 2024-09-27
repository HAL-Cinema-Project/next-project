import { Center } from '@yamada-ui/react';
import React from 'react';
import { InquiryForm } from './_components/InquiryForm';

const page = () => {
	return (
		<>
			<Center w={'95%'} maxW={'1500px'} m={'auto'}>
				<InquiryForm />
			</Center>
		</>
	);
};

export default page;
