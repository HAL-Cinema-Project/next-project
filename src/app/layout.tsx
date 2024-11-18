import type { Metadata } from 'next';
import { Michroma } from 'next/font/google';
import { MainLayout } from './_components/block/mainLayout';

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
				<MainLayout>{children}</MainLayout>
			</body>
		</html>
	);
}
