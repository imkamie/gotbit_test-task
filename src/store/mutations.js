export default {
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
};
