"use client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./index.css";
import Providers from "@/components/Providers";
import MyProvider from "@/context/MyProvider";
import { WalletEntryPosition } from "@particle-network/auth";
import { Moonbeam } from "@particle-network/chains";
import { ModalProvider } from "@particle-network/connect-react-ui";

export function AppProviders({ children }: any) {
  return (
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
        <Providers>
          <BrowserRouter>
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
          </BrowserRouter>
        </Providers>
      </ModalProvider>
    </MyProvider>
  );
}
