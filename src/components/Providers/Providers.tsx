"use client";
import MyProvider from "@/context/MyProvider";
import { ThemeProvider, createTheme } from "@mui/material";
import { WalletEntryPosition } from "@particle-network/auth";
import { Moonbeam } from "@particle-network/chains";
import { ModalProvider } from "@particle-network/connect-react-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
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
});

const Providers = ({ children }: IProvidersProps) => {
  return (
    <SessionProvider>
      <MyProvider>
        <ModalProvider
          options={{
            projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
            clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY as string,
            appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID as string,
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
          particleAuthSort={["google"]}
        >
          <QueryClientProvider client={queryClient}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
            <ToastContainer />
          </QueryClientProvider>
        </ModalProvider>
      </MyProvider>
    </SessionProvider>
  );
};

export default Providers;
