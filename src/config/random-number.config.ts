interface Props {
  numberLength?: number;
}

export class RandomNumberAdapter {
  static getNumber(config: Props) {
    const { numberLength = 6 } = config;
    let randomNumber: string = '';

    for (let i = 0; i < numberLength; i++) {
      const generateNumber = Math.floor(Math.random() * 10); // Genera un número entre 0 y 9
      randomNumber += generateNumber.toString();
    }

    return randomNumber;
  }
}
