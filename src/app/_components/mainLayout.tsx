'use client';

import {
	Box,
	colorModeManager,
	ColorModeScript,
	UIProvider,
} from '@yamada-ui/react';
import { usePathname } from 'next/navigation';

import theme from '@/theme';
import { customConfig } from '@/theme/config';
import { Footer, Header, HeaderDrawer, SubHeader } from '../_layouts/block';
import { ContextProvider } from '@/provider/Provider';
import { Providers } from '../recoil/atoms/providers';
import { AdminHeader } from '../_layouts/block/AdminHeader';

type MainLayoutProps = {
	children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
	const pathname = usePathname();

	if (pathname === '/admin') {
		return (
			<Providers>
				<ColorModeScript type="cookie" nonce="testing" />
				<UIProvider
					colorModeManager={{ ...colorModeManager }.cookieStorage}
					theme={theme}
					config={customConfig}
				>
					<ContextProvider>
						<Box>
							<AdminHeader />
						</Box>
						<Box w="100%" margin="0 auto">
							{children}
						</Box>
					</ContextProvider>
				</UIProvider>
			</Providers>
		);
	}

	return (
		<Providers>
			<ColorModeScript type="cookie" nonce="testing" />
			<UIProvider
				colorModeManager={{ ...colorModeManager }.cookieStorage}
				theme={theme}
				config={customConfig}
			>
				<ContextProvider>
					<Box>
						<Header />
					</Box>

					<Box>
						<SubHeader />
					</Box>

					<Box w="100%" margin="0 auto">
						{children}
					</Box>

					<Footer />

					<HeaderDrawer />
				</ContextProvider>
			</UIProvider>
		</Providers>
	);
}
