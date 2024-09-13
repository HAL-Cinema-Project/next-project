import type { Metadata } from 'next';

import {
	Box,
	colorModeManager,
	ColorModeScript,
	UIProvider,
} from '@yamada-ui/react';
import { Michroma } from 'next/font/google';

import theme from '@/theme';
import { customConfig } from '@/theme/config';
import { Footer, Header, HeaderDrawer, SubHeader } from './_layouts/block';
import { ContextProvider } from '@/provider/Provider';
import { Providers } from './recoil/atoms/providers';

const font = Michroma({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'HALシネマ',
	description: '映画予約サイト',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="jp">
			<body className={font.className}>
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
			</body>
		</html>
	);
}
