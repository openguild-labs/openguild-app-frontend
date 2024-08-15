import { WalletContext } from '@/components/ui/PolkadotWalletProvider/WalletContext';
import { useContext } from 'react';

export const useWalletContext = () => {
  return useContext(WalletContext);
};
