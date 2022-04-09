import Web3 from "web3";
import { ABI, address } from "./constants";

let getContract = new Promise(function (resolve) {
  let web3 = new Web3(window.web3.currentProvider);
  let contract = new web3.eth.Contract(ABI, address);
  // let casinoContractInstance = casinoContract.At(address);
  // console.log(casinoContract);
  // console.log(casinoContractInstance);
  resolve(contract);
});

export default getContract;
