import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Providers from "./components/Providers/Providers.tsx";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "@particle-network/connect-react-ui"; // @particle-network/connectkit to use Auth Core
import { WalletEntryPosition } from "@particle-network/auth";
import { Ethereum } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connect";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalProvider
      options={{
        projectId: "b42fbeec-9881-4b63-86a8-de1650963c50",
        clientKey: "c5IcLEHpE4G1svfhhf4DBtCS2pP4NqHCRDpwiO8h",
        appId: "78caefc9-2bba-4266-931a-3f4dbb76c1ad",
        chains: [Ethereum],
        particleWalletEntry: {
          //optional: particle wallet config
          displayWalletEntry: true, //display wallet button when connect particle success.
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          supportChains: [Ethereum],
          customStyle: {}, //optional: custom wallet style
        },
        securityAccount: {
          //optional: particle security account config
          //prompt set payment password. 0: None, 1: Once(default), 2: Always
          promptSettingWhenSign: 1,
          //prompt set master password. 0: None(default), 1: Once, 2: Always
          promptMasterPasswordSettingWhenLogin: 1,
        },
        wallets: evmWallets({
          projectId: "walletconnect projectId", //replace with walletconnect projectId
          showQrModal: false,
        }),
      }}
      theme={"auto"}
      language={"en"} //optional:localize, default en
      walletSort={["Particle Auth", "Wallet"]} //optional:walelt order
      particleAuthSort={[
        //optional:display particle auth items and order
        "email",
        "google",
      ]}
    >
      <Providers>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Providers>
    </ModalProvider>
  </React.StrictMode>,
);
