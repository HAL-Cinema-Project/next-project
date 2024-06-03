import type { Metadata } from "next";

import {
  Box,
  colorModeManager,
  ColorModeScript,
  UIProvider,
} from "@yamada-ui/react";
import { Michroma } from "next/font/google";

import theme from "@/theme";
import { customConfig } from "@/theme/config";
import { Footer, Header, HeaderDrawer, SubHeader } from "./_layouts/block";
import { ContextProvider } from "@/provider/Provider";

const font = Michroma({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HALシネマ",
  description: "映画予約サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={font.className}>
        <ColorModeScript type="cookie" nonce="testing" />

        <UIProvider
          colorModeManager={{ ...colorModeManager }.cookieStorage}
          theme={theme}
          config={customConfig}
        >
          <ContextProvider>
            <Box maxW="2100px" m="0 auto">
              <Header />
            </Box>

            <Box maxW="2100px" m="0 auto">
              <SubHeader />
            </Box>

            <Box maxW="2100px" margin="0 auto">
              {children}
            </Box>

            <Footer />

            <HeaderDrawer />
          </ContextProvider>
        </UIProvider>
      </body>
    </html>
  );
}
