export default {
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
  pickedStake(state) {
    return state.pickedStake;
  },
  reward(state) {
    return state.reward;
  },
  isStaked(state) {
    return state.isStaked;
  },
  isUnStaked(state) {
    return state.isUnStaked;
  },
  stakingTokens(state) {
    return state.stakingTokens;
  },
  timerStart(state) {
    return state.timerStart;
  },
  timerFinish(state) {
    return state.timerFinish;
  },
  timerExpired(state) {
    return state.timerExpired;
  },
  transactionHash(state) {
    return state.transactionHash;
  },
};
