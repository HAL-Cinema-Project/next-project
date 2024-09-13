import { Box, Text } from '@yamada-ui/react';
import React from 'react';

export const TicketCaption = () => {
	return (
		<Box
			height="60px"
			borderRadius="2px"
			backgroundColor="#111"
			width="100%"
			marginTop="15px"
		>
			<Text paddingLeft="10px" fontSize="30px" lineHeight="1.8" color="#fff">
				チケット選択
			</Text>
		</Box>
	);
};
