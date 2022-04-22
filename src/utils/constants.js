const redirectContractAddress =
  "https://testnet.bscscan.com/address/0x3514E8A6Ca64B6861B7054bbFb5A5ea75392eb9C";
const redirectTransactionAddress = "https://testnet.bscscan.com/tx/";
const timeOptions = {
  day: "numeric",
  month: "short",
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
};
const toMonth = 86400;
const toHours = 3600;
const toMinutes = 60;
const toSeconds = 60;
const year = 360;
const apyDivider = 10000;
const rewardRounding = 10000;
const toPercents = 100;

export {
  redirectContractAddress,
  redirectTransactionAddress,
  timeOptions,
  toMonth,
  toHours,
  toMinutes,
  toSeconds,
  year,
  apyDivider,
  rewardRounding,
  toPercents,
};
