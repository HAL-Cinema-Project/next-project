import { Box } from '@yamada-ui/react';
import FooterLogo from '../atom/FooterLogo';
import FooterNav from '../atom/FooterNav';
import FooterCopyright from '../atom/FooterCopyright';

export const Footer = () => {
	return (
		<Box w="100vw" p="12px" bgColor="footer.bg">
			<FooterLogo />

			<Box display="flex" justifyContent="center" m="40px">
				<FooterNav />
			</Box>

			<FooterCopyright />
		</Box>
	);
};
