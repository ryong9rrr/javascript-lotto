const LOTTO_SPEC = Object.freeze({
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  LENGTH: 6,
  MONEY_UNIT: 1000,
});

const UI_MESSAGES = Object.freeze({
  PLEASE_MONEY: "구입금액을 입력해 주세요.\n",
  PLEASE_WINNING_NUMBERS: "\n당첨 번호를 입력해 주세요.\n",
  PLEASE_BONUS_NUMBER: "\n보너스 번호를 입력해 주세요.\n",
  BUY: "개를 구매했습니다.",
});

const ERROR_MESSAGES = Object.freeze({
  MONEY_RANGE: "[ERROR] 1000원 이상 입력해주세요.",
  MONEY_UNIT: "[ERROR] 1000원 단위로 입력해주세요.",
  MONEY_VALUE: "[ERROR] 금액은 숫자여야 합니다.",
  LOTTO_LENGTH: "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.",
  LOTTO_COUNT: "[ERROR] 로또 번호는 6개여야 합니다.",
  LOTTO_DUPLICATION: "[ERROR] 로또 번호는 중복되지 않아야 합니다.",
});

module.exports = {
  LOTTO_SPEC,
  UI_MESSAGES,
  ERROR_MESSAGES,
};
