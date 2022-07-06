import Metamask from "./wallet-icons/metamask.svg";
import Coin98 from "./wallet-icons//Coin98.png";
import WalletConnect from "./wallet-icons/walletconnect.svg";
import TrustWallet from "./wallet-icons/trustwallet.svg";

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "Mobile Wallets",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "Coin98",
    icon: Coin98,
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    connectorId: "injected",
    priority: 3,
  },
];

export const getWallets = [
  {
    title: "Metamask",
    icon: Metamask,
    type: "Browser Extension & Mobile Wallet",
    link: "https://metamask.io/download/",
  },
  {
    title: "Coin98",
    icon: Coin98,
    type: "Mobile Wallet",
    link: "https://coin98.com/",
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    type: "Mobile Wallet",
    link: "https://trustwallet.com/",
  },
];
