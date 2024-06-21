'use client';
import { Box, Image, Link, useBreakpoint } from '@yamada-ui/react';
import { Icon } from '@yamada-ui/fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { HeaderButton, HeaderLogo, MenuButton, ScreenButton } from '../atom';

export const Header = () => {
	const breakpoint = useBreakpoint();

	return (
		<>
			<Box
				w="full"
				h="60px"
				p={['sm', 'md'].includes(breakpoint) ? ' 0 20px' : '0 60px'}
				bg="primary"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<HeaderLogo />

				{['sm', 'md'].includes(breakpoint) ? (
					<MenuButton />
				) : (
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap="10px"
					>
						<ScreenButton />
					</Box>
				)}
			</Box>
		</>
	);
};
