import { Box, Text } from '@yamada-ui/react';
import React from 'react';

type AdminCaptionProps = {
	title: string;
};

export const AdminCaption = ({ title }: AdminCaptionProps) => {
	return (
		<>
			<Box w={'100%'} p={'10px'} bgColor={'#000'} color={'#fff'}>
				<Text fontSize={'1.6rem'}>{title}</Text>
			</Box>
		</>
	);
};
