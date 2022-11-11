const LOTTO = Object.freeze({
  RANGE_MIN: 1,
  RANGE_MAX: 45,
  LENGTH: 6,
});

const ERRORS = Object.freeze({
  LENGTH: "[ERROR] 로또 번호는 6개여야 합니다.",
  DUPLICATION: "[ERROR] 로또 번호는 중복되지 않아야 합니다.",
  RANGE: "[ERROR] 로또 번호는 1부터 45까지여야 합니다.",
});

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    this.checkLength(numbers);
    this.checkDuplication(numbers);
    this.checkRange(numbers);
  }

  checkLength(numbers) {
    if (numbers.length !== LOTTO.LENGTH) {
      throw new Error(ERRORS.LENGTH);
    }
  }

  checkDuplication(numbers) {
    const numberSet = new Set(numbers);
    if ([...numberSet].length !== LOTTO.LENGTH) {
      throw new Error(ERRORS.DUPLICATION);
    }
  }

  checkRange(numbers) {
    numbers.forEach((number) => {
      if (number < LOTTO.RANGE_MIN || number > LOTTO.RANGE_MAX) {
        throw new Error(ERRORS.DUPLICATION);
      }
    });
  }
}

module.exports = Lotto;
