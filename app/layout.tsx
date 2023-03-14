"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "./utils/extendTheme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <CacheProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ChakraProvider theme={theme}>
            <Box mx={"9"} my={"5"}>
              {children}
            </Box>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
