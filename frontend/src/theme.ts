import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#0f172a",
        color: "#e2e8f0",
      },
    },
  },
  colors: {
    neon: {
      cyan: "#22d3ee",
      purple: "#a78bfa",
    },
  },
});

export default theme;