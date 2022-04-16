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
    };
  },
  getters,
  mutations,
  actions,
});