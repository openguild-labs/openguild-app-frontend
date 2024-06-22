import { WagmiProvider } from "wagmi";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWagmiConfig } from "../../utils/wagmi";
import { createTheme, ThemeProvider } from "@mui/material";

interface IProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
      networkMode: "offlineFirst",
      refetchOnWindowFocus: true,
      retry: 0,
    },
    mutations: {
      networkMode: "offlineFirst",
    },
  },
});

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#6b3ffd",
    },
  },
  typography: {
    fontFamily: "Space Grotesk",
  },
});

const Providers = ({ children }: IProvidersProps) => {
  const wagmiConfig = useMemo(() => createWagmiConfig(), []);
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
