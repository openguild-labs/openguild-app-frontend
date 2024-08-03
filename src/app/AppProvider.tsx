"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./index.css";
import Providers from "@/components/Providers";
import MyProvider from "@/context/MyProvider";
import { WalletEntryPosition } from "@particle-network/auth";
import { Moonbeam } from "@particle-network/chains";
import { ModalProvider } from "@particle-network/connect-react-ui";
import { SessionProvider } from "next-auth/react";

export function AppProviders({ children }: any) {
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
          particleAuthSort={["email", "google", "discord", "twitter"]}
        >
          <Providers>
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
            {children}
            <ToastContainer />
          </Providers>
        </ModalProvider>
      </MyProvider>
    </SessionProvider>
  );
}
