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
  setPickedStake(state, picked) {
    state.pickedStake = picked;
  },
  setReward(state, reward) {
    state.reward = reward;
  },
  setStaked(state) {
    state.isStaked = true;
  },
  setUnStaked(state) {
    state.isUnStaked = true;
    state.isStaked = false;
  },
  setStakingTokens(state, tokens) {
    state.stakingTokens = tokens;
  },
  setTimerStart(state, date) {
    state.timerStart = date;
  },
  setTimerFinish(state, date) {
    state.timerFinish = date;
  },
  setTimerExpired(state) {
    state.timerExpired = true;
  },
};
