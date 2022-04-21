import { ethers } from "ethers";
import { stakingAddress, stakingABI } from "../utils/constants";
import { tokenABI, tokenAddress } from "../utils/token";
import { toRaw } from "vue";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export default {
  async connectMetamask({ dispatch }) {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        return;
      }
      await dispatch("requestAccess");
    } catch (error) {
      console.log(error);
    }
  },
  async connectWalletConnect({ commit }) {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    if (!connector.connected) {
      await connector.createSession();
    }

    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      const { params } = payload;
      const { accounts } = params[0];

      commit("setAccount", accounts[0]);
      commit("setConnected");
    });
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
      const totalSupply = connectedContract.totalSupply();
      const isApproved = await connectedContract.approve(
        stakingAddress,
        totalSupply
      );
      await connectedContract.balanceOf(state.account).then((result) => {
        let tokenBalance = ethers.utils.formatEther(result._hex) / 1;
        commit("setTokenBalance", tokenBalance);
      });
      commit("setApproved", isApproved);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async stakeTokens({ commit, dispatch, state }) {
    const connectedContract = await dispatch("getStakingContract");
    const indexOfPickedStake = state.stakeInfo.findIndex(
      (picked) => toRaw(picked).periods === state.pickedStake.periods
    );
    await connectedContract.increaseRewardsPool(state.stakingTokens);
    await connectedContract.stake(indexOfPickedStake, state.stakingTokens);
    commit("setStaked");
  },
  async unStakeTokens({ commit, dispatch, state }) {
    const connectedContract = await dispatch("getStakingContract");
    await connectedContract.myStakes(state.account).then((result) => {
      const idOfLastStaking = result.indexes[result.indexes.length - 1]._hex;
      connectedContract.unstake(idOfLastStaking).then((log) => {
        commit("setTransactionHash", log.hash);
      });
      commit("setUnStaked");
    });
  },
};
