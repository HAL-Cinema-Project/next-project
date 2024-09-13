import { Box } from '@yamada-ui/react';
import React from 'react';

interface StepperProps {
	current_page: string;
}

export const Stepper = ({ current_page }: StepperProps) => {
	const styles = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '25%',
		height: '50px',
		fontWeight: 'bold',
		border: '3px solid #08f',
	};

	return (
		<>
			<Box display={'flex'} gap={'10px'} pt={'15px'} my={'auto'}>
				<Box
					color={current_page === 'booking' ? '#fff' : '#08f'}
					bgColor={current_page === 'booking' ? '#08f' : 'transparent'}
					style={styles}
				>
					座席選択
				</Box>
				<Box
					color={current_page === 'ticketselect' ? '#fff' : '#08f'}
					bgColor={current_page === 'ticketselect' ? '#08f' : 'transparent'}
					style={styles}
				>
					チケット選択
				</Box>
				<Box
					color={current_page === 'input' ? '#fff' : '#08f'}
					bgColor={current_page === 'input' ? '#08f' : 'transparent'}
					style={styles}
				>
					情報入力
				</Box>
				<Box
					color={current_page === 'check' ? '#fff' : '#08f'}
					bgColor={current_page === 'check' ? '#08f' : 'transparent'}
					style={styles}
				>
					支払い
				</Box>
			</Box>
		</>
	);
};
