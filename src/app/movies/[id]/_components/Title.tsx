import React from 'react';
import { Box } from '@yamada-ui/react';

export const Title = () => {
	return (
		<div
			style={{
				height: '60px',
				borderRadius: '2px',
				backgroundColor: '#111',
				width: '100%',
				marginTop: '15px',
			}}
		>
			<p
				style={{
					paddingLeft: '10px',
					fontSize: '30px',
					lineHeight: '1.8',
					color: '#fff',
				}}
			>
				上映スケジュール
			</p>
		</div>
	);
};
