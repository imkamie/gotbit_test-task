<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import TheWelcome from "./components/TheWelcome.vue";
import NavbarItem from "./components/NavbarItem.vue";
// import TokenCard from "./components/TokenCard.vue";
// import InfoItem from "./components/InfoItem.vue";
// import ButtonItem from "./components/ButtonItem.vue";
// import SelectPayment from "./components/SelectPayment.vue";
import StakingApp from "./components/StakingApp.vue";
// import StakeProgress from "./components/StakeProgress.vue";

// import Web3 from "web3";
// import { ABI, address } from "./utils/constants";
// import { ethers } from "ethers";
// function checkAndInstantiateWeb3() {
//   try {
//     if (window.web3 !== "undefined") {
//       console.log("Using Metamask's web3 provider");
//       return new Web3(window.web3.currentProvider);
//     } else {
//       console.warn("No web3 detected. Falling back to http://localhost:8545.");
//       return new Web3(
//         new this.Web3.providers.HttpProvider("http://localhost:8545")
//       );
//     }
//   } catch (e) {
//     console.error("Sorry, can't find any web3 provider:", e.message);
//   }
// }
// checkAndInstantiateWeb3();

// const provider = new ethers.providers.Web3Provider(window.ethereum);
// provider.send("eth_requestAccounts", []);
// const signer = provider.getSigner();
// const signerAddress = signer.getAddress(); // address who connected with metamask

// const provider = new Web3(window.web3.currentProvider);
// const web3 = new Web3(provider);
// web3.eth.net
//   .isListening()
//   .then(() => console.log("web3 is connected"))
//   .catch(() => console.log("Wow. Something went wrong"));
// const myContract = new provider.eth.Contract(ABI);
// console.log(myContract);
// const accounts = provider.eth.getAccounts();
// console.log(accounts);
// const myAddress = accounts[0];
// console.log(myAddress);
// let readOnlyContract

// const abi = [
//   {
//     constant: false,
//     inputs: [{ name: "_greeting", type: "string" }],
//     name: "greet",
//     outputs: [],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "getGreeting",
//     outputs: [{ name: "", type: "string" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
// ];
// const contract_Address = "0xcbe74e21b070a979b9d6426b11e876d4cb618daf";
// const contract = new web3.eth.Contract(abi, contract_Address);
// contract.methods.getGreeting().call().then(console.log);

export default {
  name: "App",
  components: {
    // StakeProgress,
    StakingApp,
    // SelectPayment,
    NavbarItem,
    // TokenCard,
    // InfoItem,
    // ButtonItem,
  },
  // data() {
  //   return {
  //     isVisible: false,
  //   };
  // },
  methods: {
    printYellow() {
      console.log("yellow");
    },
    printWhite() {
      console.log("white");
    },
    // showModal() {
    //   this.isVisible = true;
    // },
    // closeModal() {
    //   this.isVisible = false;
    // },
  },
};
</script>

<template>
  <header>
    <NavbarItem />
  </header>

  <main class="main">
    <!--    <token-card duration="30" apy="103,23" amount="100-299" />-->
    <!--    <info-item text="To perform actions on the page, connect your wallet" />-->

    <StakingApp />
<!--    <StakeProgress />-->



    <!--    <div class="wrapper">-->
    <!--      <button-item-->
    <!--        :yellow="true"-->
    <!--        @click="showModal"-->
    <!--        text="Connect wallet"-->
    <!--      ></button-item>-->
    <!--    </div>-->

    <!--    <SelectPayment v-if="isVisible" @closePopup="closeModal" />-->

    <!--    <div class="wrapper">-->
    <!--      <button-item :white="true" @click="printWhite" text="Press"></button-item>-->
    <!--    </div>-->

    <!--    <div class="wrapper">-->
    <!--      <button-item :loading="true" text="Press"></button-item>-->
    <!--    </div>-->

    <!--    <div class="wrapper-1">-->
    <!--      <button-item-->
    <!--        :white="true"-->
    <!--        :icon="true"-->
    <!--        :path="`/src/assets/metamask.svg`"-->
    <!--        @click="printYellow"-->
    <!--        text="MetaMask"-->
    <!--      ></button-item>-->
    <!--    </div>-->

    <!--    <div class="wrapper-1">-->
    <!--      <button-item-->
    <!--        :white="true"-->
    <!--        :icon="true"-->
    <!--        :path="`/src/assets/walletconnect.svg`"-->
    <!--        @click="printYellow"-->
    <!--        text="MetaMask"-->
    <!--      ></button-item>-->
    <!--    </div>-->
  </main>
</template>

<style>
@import "./assets/base.css";

.wrapper {
  width: 230px;
  height: 56px;
}

.wrapper-1 {
  width: 271px;
  height: 108px;
}

/*#app {*/
/*  !*max-width: 1170px;*!*/
/*  margin: 0 auto;*/
/*  !*padding: 2rem;*!*/

/*  font-weight: normal;*/
/*}*/

.main {
  max-width: 1170px;
  margin: 0 auto;
}

/*header {*/
/*  line-height: 1.5;*/
/*}*/

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

/*@media (min-width: 1024px) {*/
/*  body {*/
/*    display: flex;*/
/*    place-items: center;*/
/*  }*/

/*  #app {*/
/*    display: grid;*/
/*    grid-template-columns: 1fr 1fr;*/
/*    padding: 0 2rem;*/
/*  }*/

/*  header {*/
/*    display: flex;*/
/*    place-items: center;*/
/*    padding-right: calc(var(--section-gap) / 2);*/
/*  }*/

/*  header .wrapper {*/
/*    display: flex;*/
/*    place-items: flex-start;*/
/*    flex-wrap: wrap;*/
/*  }*/

/*  .logo {*/
/*    margin: 0 2rem 0 0;*/
/*  }*/
/*}*/
</style>
