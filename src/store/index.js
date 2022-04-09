import { createStore } from "vuex";
import { getUserAddress } from "../utils/connectWallet";
// import getWeb3 from "../utils/getWeb3";
// import pollWeb3 from "../utils/pollWeb3";
// import getContract from "../utils/getContract";

export const store = createStore({
  state() {
    return {
      isConnected: false,
      contractInstance: null,
      userAddress: null,
      balance: null,
    };
  },
  getters: {
    IS_CONNECTED(state) {
      return state.isConnected;
    },
    USER_ADDRESS(state) {
      return state.userAddress;
    },
    USER_BALANCE(state) {
      return state.balance;
    },
  },
  mutations: {
    CONNECT(state) {
      state.isConnected = true;
    },
    SET_ADDRESS(state, payload) {
      // getUserAddress().then();
      state.userAddress = payload;
    },
    // registerWeb3Instance(state, payload) {
    //   console.log("registerWeb3instance Mutation being executed", payload);
    //   let result = payload;
    //   let web3Copy = state;
    //   web3Copy.userAddress = result.userAddress;
    //   web3Copy.balance = parseInt(result.balance, 10);
    //   state.web3 = web3Copy;
    //   pollWeb3();
    // },
    // pollWeb3Instance(state, payload) {
    //   console.log("pollWeb3Instance mutation being executed", payload);
    //   state.userAddress = payload.userAddress;
    //   state.balance = parseInt(payload.balance, 10);
    // },
    // registerContractInstance(state, payload) {
    //   console.log("Casino contract instance: ", payload);
    //   state.contractInstance = () => payload;
    // },
  },
  actions: {
    SET_CONNECT({ commit }) {
      commit("CONNECT");
    },
    SET_USER_ADDRESS({commit}) {
      getUserAddress().then((result) => {
        commit("SET_ADDRESS", result);
        console.log(result);
      });
    },




    // registerWeb3({ commit }) {
    //   console.log("registerWeb3 Action being executed");
    //   getWeb3
    //     .then((result) => {
    //       console.log("committing result to registerWeb3Instance mutation");
    //       commit("registerWeb3Instance", result);
    //     })
    //     .catch((e) => {
    //       console.log("error in action registerWeb3", e);
    //     });
    // },
    // pollWeb3({ commit }, payload) {
    //   console.log("pollWeb3 action being executed");
    //   commit("pollWeb3Instance", payload);
    // },
    // getContractInstance({ commit }) {
    //   getContract
    //     .then((result) => {
    //       commit("registerContractInstance", result);
    //     })
    //     .catch((e) => console.log(e));
    // },
  },
});
