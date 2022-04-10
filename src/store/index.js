import { createStore } from "vuex";
import { ABI, address } from "../utils/constants";
import { ethers } from "ethers";

export const store = createStore({
  state() {
    return {
      isConnected: false,
      account: null,
      balance: null,
      contractAddress: address,
    };
  },
  getters: {
    isConnected(state) {
      return state.isConnected;
    },
    account(state) {
      return state.account;
    },
    balance(state) {
      return state.balance;
    },
  },
  mutations: {
    setConnected(state) {
      state.isConnected = true;
    },
    setAccount(state, account) {
      state.account = account;
    },
    setBalance(state, balance) {
      state.balance = balance;
    },
  },
  actions: {
    async connect({ commit, dispatch }, connect) {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          commit("setError", "Metamask not installed!");
          return;
        }
        if (!(await dispatch("checkIfConnected")) && connect) {
          await dispatch("requestAccess");
        }
      } catch (error) {
        console.log(error);
        commit("setError", "Account request refused.");
      }
    },
    async checkIfConnected({ commit }) {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        commit("setAccount", accounts[0]);
        return 1;
      } else {
        return 0;
      }
    },
    async requestAccess({ commit }) {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.getBalance(accounts[0]).then((balance) => {
        let etherString = ethers.utils.formatEther(balance);
        commit("setBalance", etherString);
      });
      commit("setAccount", accounts[0]);
      commit("setConnected");
    },
    async getContract({ state }) {
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(state.contractAddress, ABI, signer);
      } catch (error) {
        console.log(error);
        console.log("connected contract not found");
        return null;
      }
    },
  },
});
