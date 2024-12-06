'use client';

import useFetchCategories from '@/app/hooks/useFetchCategories';
import { Box, Button } from '@yamada-ui/react';
import React from 'react';

export const AdminCategories = () => {
	const { categoryData } = useFetchCategories();

	return (
		<>
			<Box
				display="flex"
				gap="10px"
				overflowX="auto"
				whiteSpace="nowrap"
				pb="5px"
				mb="10px"
				sx={{
					'&::-webkit-scrollbar': {
						height: '6px',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#888',
						borderRadius: '3px',
					},
					'&::-webkit-scrollbar-thumb:hover': {
						backgroundColor: '#555',
					},
					'&::-webkit-scrollbar-track': {
						backgroundColor: '#f1f1f1',
					},
				}}
			>
				{categoryData.map((category) => (
					<Button
						key={category.category_id}
						flexShrink={0}
						padding="10px 20px"
						minWidth="auto"
					>
						{category.category_name}
					</Button>
				))}
			</Box>
		</>
	);
};
