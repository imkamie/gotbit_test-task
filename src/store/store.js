import { createStore } from "vuex";
import { stakingAddress } from "../utils/constants";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export const store = createStore({
  state() {
    return {
      isConnected: false,
      isApproved: false,
      account: null,
      balance: null,
      contractAddress: stakingAddress,
      periods: [],
      rates: [],
      stakeInfo: [],
      tokenBalance: null,
      pickedStake: null,
      reward: null,
      isStaked: false,
      isUnStaked: false,
      stakingTokens: null,
      timerStart: null,
      timerFinish: null,
      timerExpired: false,
      transactionHash: null,
    };
  },
  getters,
  mutations,
  actions,
});
