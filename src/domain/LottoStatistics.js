const Lotto = require("../Lotto");
const Utils = require("../Utils");
const { LOTTO_SPEC } = require("../constants");

const MATCH_COUNT = Object({
  SIX: 6,
  FIVE: 5,
  FOUR: 4,
  THREE: 3,
});

const RANK = Object({
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  UN_RANK: -1,
});

const RANK_MAP = Object({
  [MATCH_COUNT.SIX]: RANK.ONE,
  [MATCH_COUNT.FOUR]: RANK.FOUR,
  [MATCH_COUNT.THREE]: RANK.FIVE,
});

const REWARD_MAP = Object({
  [RANK.ONE]: 2000000000,
  [RANK.TWO]: 30000000,
  [RANK.THREE]: 1500000,
  [RANK.FOUR]: 50000,
  [RANK.FIVE]: 5000,
});

class LottoStatistics {
  constructor(winningLotto) {
    if (!winningLotto instanceof Lotto) {
      throw new ReferenceError("param's instance must be Lotto.");
    }
    if (!winningLotto.bonusNumber) {
      throw new ReferenceError("Lotto must have bonus number.");
    }

    this.winningNumbers = winningLotto.numbers;
    this.bonusNumber = winningLotto.bonusNumber;
  }

  judgeRank(numbers) {
    const matchedCount = this.match(numbers);
    if (this.isNeedJudgement(matchedCount)) {
      return this.judgeSecondRank(numbers);
    }
    return RANK_MAP[matchedCount] || RANK.UN_RANK;
  }

  calculateTotalReward(buyingLottos) {
    const rankCounter = this.createRankCounter(buyingLottos);
    return Object.entries(rankCounter).reduce((total, [rank, count]) => {
      const reward = REWARD_MAP[rank] * count;
      return total + reward;
    }, 0);
  }

  calculateProfit(buyingLottos) {
    const cost = buyingLottos.length * LOTTO_SPEC.MONEY_UNIT;
    return 100 * (this.calculateTotalReward(buyingLottos) / cost);
  }

  match(numbers) {
    const numbersSet = new Set(numbers);
    const winningNumbersSet = new Set(this.winningNumbers);
    const matchedNumbersSet = Utils.intersect(numbersSet, winningNumbersSet);
    return [...matchedNumbersSet].length;
  }

  judgeSecondRank(numbers) {
    const isMatchBonusNumber = numbers.includes(this.bonusNumber);
    return isMatchBonusNumber ? RANK.TWO : RANK.THREE;
  }

  isNeedJudgement(matchedCount) {
    return matchedCount === MATCH_COUNT.FIVE;
  }

  createRankCounter(buyingLottos) {
    const filteredRanks = buyingLottos
      .map((buyingLotto) => this.judgeRank(buyingLotto))
      .filter((rank) => rank !== RANK.UN_RANK);
    return Utils.createCounter(filteredRanks);
  }
}

module.exports = LottoStatistics;
