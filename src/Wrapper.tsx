import "./index.css";
import App from "./App";
import Docs from "./pages/Docs";
import Home from "./pages/Home";
import Explorer from "./pages/Explorer";
import { Trade } from "pages/Trade";
import Navbar from "./components/navbar/Navbar";
import SeamFooter from "./components/footer/Footer";
import { BaseRouter } from "BaseRouter";
// import Nav from './components/navbar/Nav';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ModuleExplorer from "sections/modules/ModuleExplorer";
import UserExplorer from "sections/UserExplorer";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import NodePage from "pages/NodePage";

import { ReactNode, useState, useMemo } from "react";
import { GlobalStateProvider } from "GlobalState";

import WalletModal from "modals/walletModal";
import Staking from "./pages/Staking";
import { useClient } from "hooks/useAptos";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { SpikaWallet } from "@spika/aptos-plugin";
import { BloctoWallet } from "@blocto/aptos-wallet-adapter-plugin";

import { AptosWalletAdapterProvider, NetworkName } from "@aptos-labs/wallet-adapter-react";
import { FewchaWallet } from "fewcha-plugin-wallet-adapter";
import { MSafeWalletAdapter } from "msafe-plugin-wallet-adapter";
// import { SpacecyWallet } from "spacecy-plugin-wallet-adapter";
type WrapperProps = {
  children: NonNullable<ReactNode>;
};

export const APT_GQL = "https://indexer.mainnet.aptoslabs.com/v1/graphql";

const Aclient = new ApolloClient({
    uri: APT_GQL,
    cache: new InMemoryCache(),
  });


const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const [walletModalOpen, setWalletModal] = useState(false);
  const client = useClient();

  const wallets = [
    new PetraWallet(),
    new MartianWallet(),
    new RiseWallet(),
    new PontemWallet(),
    new TrustWallet(),
    new SpikaWallet(),
    new FewchaWallet(),
    new MSafeWalletAdapter(),
    // Blocto supports Testnet/Mainnet for now.
    new BloctoWallet({ network: NetworkName.Testnet, bloctoAppId: "6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46" }),
  ];

  return (
    <ApolloProvider client={Aclient}>
    <GlobalStateProvider>
      <AptosWalletAdapterProvider
        plugins={wallets}
        autoConnect={true}
      >
        <Navbar showConnectModal={setWalletModal} />
        {/* <MyWalletProvider> */}
        {/* <div > */}
        {/* <Nav/> */}
        {children}
        {walletModalOpen ? (
          <WalletModal isOpen={walletModalOpen} setIsOpen={setWalletModal} />
        ) : null}
        <div>
        <SeamFooter />
        </div>
      </AptosWalletAdapterProvider>
    </GlobalStateProvider>

    </ApolloProvider>
  );
};

export default Wrapper;
