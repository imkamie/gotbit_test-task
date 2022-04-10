import { ethers } from "ethers";
import { ABI, address } from "./constants";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
// import web3 from "web3";

export async function clickConnectMetamask() {
  // try {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  // let readOnlyContract = new ethers.Contract(address, ABI, provider);
  // const signer = provider.getSigner();
  // const signerAddress = await signer.getAddress(); // address who connected with metamask

  // НАХОЖДЕНИЕ БАЛАНСА на будущее
  // const web3 = new Web3(window.web3.currentProvider);
  // const balance = web3.eth.getBalance(signerAddress).then(console.log);
  // const balance = await provider.getBalance(signerAddress);
  // console.log(balance);
  // const userBalance = parseInt(balance.result, 10);
}

export let connector;
export function clickConnectWalletConnect() {
  connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal,
  });
}

export async function getUserAddress() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  // address who connected with metamask
  return await signer.getAddress();
}
