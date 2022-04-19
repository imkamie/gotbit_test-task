import { ethers } from "ethers";
import { stakingAddress, stakingABI } from "../utils/constants";
import { tokenABI, tokenAddress } from "../utils/token";

export default {
  async connect({ dispatch }, connect) {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        return;
      }
      if (!(await dispatch("checkIfConnected")) && connect) {
        await dispatch("requestAccess");
      }
    } catch (error) {
      console.log(error);
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
        periodsFromContract.push(parseInt(result._hex, 16));
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
      await connectedContract.approve(stakingAddress, 0);
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
};
