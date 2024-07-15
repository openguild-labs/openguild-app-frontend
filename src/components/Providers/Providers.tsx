import { WagmiProvider } from "wagmi";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWagmiConfig } from "../../utils/wagmi";
import { createTheme, ThemeProvider } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import MyProvider from "@/context/MyProvider";
import { ModalProvider } from "@particle-network/connect-react-ui";
import { WalletEntryPosition } from "@particle-network/auth";
import { Moonbeam } from "@particle-network/chains";
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
    <HelmetProvider>
      <MyProvider>
        <ModalProvider
          options={{
            projectId: "cc895d73-0ca0-486a-bab3-ad3f944e2383",
            clientKey: "caVSZTfOj1F9NJzE0ZFnhfdZ2l2ZCvVngD3wZXsz",
            appId: "b5f13e23-7a8b-4660-a924-1d6af4e4b472",
            chains: [Moonbeam],
            particleWalletEntry: {
              //optional: particle wallet config
              displayWalletEntry: true, //display wallet button when connect particle success.
              defaultWalletEntryPosition: WalletEntryPosition.BR,
              supportChains: [Moonbeam],
              customStyle: {}, //optional: custom wallet style
            },
            securityAccount: {
              //optional: particle security account config
              //prompt set payment password. 0: None, 1: Once(default), 2: Always
              promptSettingWhenSign: 1,
              //prompt set master password. 0: None(default), 1: Once, 2: Always
              promptMasterPasswordSettingWhenLogin: 1,
            },
            wallets: [],
          }}
          theme={"auto"}
          language={"en"} //optional:localize, default en
          walletSort={["Particle Auth", "Wallet"]} //optional:walelt order
          particleAuthSort={["email", "google", "discord", "twitter"]}
        >
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ModalProvider>
      </MyProvider>
    </HelmetProvider>
  );
};

export default Providers;
