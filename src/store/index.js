import { createStore } from "vuex";
import { stakingABI, address } from "../utils/constants";
import { tokenABI, tokenAddress } from "../utils/token";
import { ethers } from "ethers";

export const store = createStore({
  state() {
    return {
      isConnected: false,
      isApproved: false,
      account: null,
      balance: null,
      contractAddress: address,
      periods: [],
      rates: [],
    };
  },
  getters: {
    isConnected(state) {
      return state.isConnected;
    },
    isApproved(state) {
      return state.isApproved;
    },
    account(state) {
      return state.account;
    },
    balance(state) {
      return state.balance;
    },
    periods(state) {
      return state.periods;
    },
    rates(state) {
      return state.rates;
    },
  },
  mutations: {
    setConnected(state) {
      state.isConnected = true;
    },
    setApproved(state) {
      state.isApproved = true;
    },
    setAccount(state, account) {
      state.account = account;
    },
    setBalance(state, balance) {
      state.balance = balance;
    },
    setPeriods(state, periods) {
      state.periods = periods;
    },
    setRates(state, rates) {
      state.rates = rates;
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
    async getStakingContract({ state }) {
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(state.contractAddress, stakingABI, signer);
      } catch (error) {
        console.log(error);
        console.log("connected staking contract not found");
        return null;
      }
    },
    async getTokenContract() {
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(tokenAddress, tokenABI, signer);
      } catch (error) {
        console.log(error);
        console.log("connected token contract not found");
        return null;
      }
    },
    async approveWallet({ commit, dispatch }) {
      try {
        const connectedContract = await dispatch("getTokenContract");
        await connectedContract.approve(address, 0);
        commit("setApproved");
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async getPeriods({ commit, dispatch }) {
      try {
        const connectedContract = await dispatch("getStakingContract");
        const periodsFromContract = [];
        for (let i = 0; i < 3; i++) {
          await connectedContract.periods(i).then((result) => {
            periodsFromContract.push(result / 86400);
          });
        }
        commit("setPeriods", periodsFromContract);
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async getRates({ commit, dispatch }) {
      try {
        const connectedContract = await dispatch("getStakingContract");
        const ratesFromContract = [];
        for (let i = 0; i < 3; i++) {
          await connectedContract.rates(i).then((result) => {
            ratesFromContract.push(result / 100 + "%");
          });
        }
        commit("setRates", ratesFromContract);
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
});
