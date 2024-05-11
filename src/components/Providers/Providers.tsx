import { WagmiProvider } from "wagmi";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWagmiConfig } from "../../utils/wagmi";

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

const Providers = ({ children }: IProvidersProps) => {
  const wagmiConfig = useMemo(() => createWagmiConfig(), []);
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
