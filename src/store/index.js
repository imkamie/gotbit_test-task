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
      stakeInfo: [],
      tokenBalance: null,
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
    stakeInfo(state) {
      return state.stakeInfo;
    },
    tokenBalance(state) {
      return state.tokenBalance;
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
    setStakeInfo(state, stakeInfo) {
      state.stakeInfo = stakeInfo;
    },
    setTokenBalance(state, tokenBalance) {
      state.tokenBalance = tokenBalance;
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
    async requestAccess({ commit, dispatch }) {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.getBalance(accounts[0]).then((balance) => {
        let etherString = ethers.utils.formatEther(balance);
        commit("setBalance", etherString);
      });
      const connectedContract = await dispatch("getStakingContract");
      const ratesFromContract = [];
      for (let i = 0; i < 3; i++) {
        await connectedContract.rates(i).then((result) => {
          ratesFromContract.push(result);
        });
      }
      const periodsFromContract = [];
      for (let i = 0; i < 3; i++) {
        await connectedContract.periods(i).then((result) => {
          periodsFromContract.push(result / 86400);
        });
      }
      commit("setPeriods", periodsFromContract);
      commit("setRates", ratesFromContract);

      const stakeInfo = [];
      for (let i = 0; i < 3; i++) {
        stakeInfo.push({
          rates: ratesFromContract[i],
          periods: periodsFromContract[i],
        });
      }
      commit("setStakeInfo", stakeInfo);

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
    async approveWallet({ commit, dispatch, state }) {
      try {
        const connectedContract = await dispatch("getTokenContract");
        await connectedContract.approve(address, 0);
        await connectedContract.balanceOf(state.account).then((result) => {
          let tokenBalance = ethers.utils.formatEther(result._hex) / 1;
          commit("setTokenBalance", tokenBalance);
        });
        commit("setApproved");
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
});
