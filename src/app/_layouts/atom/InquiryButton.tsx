import { Icon } from '@yamada-ui/fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Link } from '@yamada-ui/react';
import React from 'react';

export const InquiryButton = () => {
	return (
		<>
			<Link href="/Inquiry">
				<Button p={'0 40px'}>
					<Icon icon={faEnvelope} />
					お問い合わせ
				</Button>
			</Link>
		</>
	);
};
