import { injected } from "wagmi/connectors";
import { createConfig, http } from "wagmi";
import { moonbeam } from "wagmi/chains";

export function createWagmiConfig() {
  return createConfig({
    chains: [moonbeam],
    ssr: true,
    syncConnectedChain: true,
    transports: {
      [moonbeam.id]: http(),
    },
    connectors: [injected()],
  });
}
