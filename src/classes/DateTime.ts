class DateTime {
  private months: string[];
  private monthsThatCanBeSelected;
  constructor() {
    this.months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    this.monthsThatCanBeSelected = {
      CURRENT: 'current',
      PAST_MONTH: 'pastMonth',
      THREE_MONTHS_AGO: 'threeMonthsAgo',
      FOUR_MONTHS_AGO: 'fourMonthsAgo',
      FIVE_MONTHS_AGO: 'fiveMonthsAgo',
    };
  }

  public getMonths(): string[] {
    return this.months;
  }

  static getMonth(monthInNumber: number) {
    switch (monthInNumber) {
      case -2:
        return 'Outubro';
      case -1:
        return 'Novembro';
      case 0:
        return 'Dezembro';

      case 1:
        return 'Janeiro';
      case 2:
        return 'Fevereiro';
      case 3:
        return 'Março';
      case 4:
        return 'Abril';
      case 5:
        return 'Maio';
      case 6:
        return 'Junho';
      case 7:
        return 'Julho';
      case 8:
        return 'Agosto';
      case 9:
        return 'Setembro';
      case 10:
        return 'Outubro';
      case 11:
        return 'Novembro';
      case 12:
        return 'Dezembro';
    }
  }

  static getPastFourMonths() {
    const currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var lastMonth = currentDate.getMonth() + 0;
    var threeMonthsAgo = currentDate.getMonth() - 1;
    var fourMonthsAgo = currentDate.getMonth() - 2;

    var pastFourMonths = [
      this.getMonth(fourMonthsAgo),
      this.getMonth(threeMonthsAgo),
      this.getMonth(lastMonth),
      this.getMonth(currentMonth),
    ];

    return pastFourMonths;
  }

  getMonthAndYear(monthSelected = this.monthsThatCanBeSelected.CURRENT) {
    var month;
    var date = new Date();
    var ano = date.getFullYear();

    //resolvendo bug de estar em janeiro = 1
    //ao buscar o mes anterior dezembro = 0

    if (monthSelected == this.monthsThatCanBeSelected.CURRENT) {
      month = date.getMonth() + 1;
    } else if (monthSelected == this.monthsThatCanBeSelected.PAST_MONTH) {
      //checa se o mes anterior é dezembro
      if (date.getMonth() + 0 == 0) {
        month = 12;
        ano = 2023;
      } else {
        month = date.getMonth() + 0;
      }
    } else if (monthSelected == this.monthsThatCanBeSelected.THREE_MONTHS_AGO) {
      //checa se o mes anterior é dezembro
      if (date.getMonth() + 0 == 0) {
        month = 11;
        ano = 2023;
      } else {
        month = date.getMonth() - 1;
      }
    } else {
      //checa se o mes anterior é dezembro
      if (date.getMonth() + 0 == 0) {
        month = 10;
        ano = 2023;
      } else {
        month = date.getMonth() - 2;
      }
    }

    const mes = String(month).padStart(2, '0');

    return `${mes}/${ano}`;
  }
  static convertMilisecondsToMonthAndYear(
    milliseconds: string | number | Date,
  ) {
    var date = new Date(milliseconds);
    var options = {year: 'numeric', month: '2-digit'};
    var formattedDate = date
      .toLocaleDateString('pt-BR', options)
      .replace(/(\d{2})\/(\d{4})/, '$1/$2');
    return formattedDate;
  }

  public static getYesterday() {
    var today = new Date();

    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    return yesterday;
  }

  public getMonthAndYearFromGivenMonthWritten(
    monthName = 'Janeiro',
    year = new Date().getFullYear(),
  ) {
    const monthIndex = this.months.findIndex(
      name => name.toLowerCase() === monthName.toLowerCase(),
    );

    if (monthIndex === -1) {
      throw new Error('Nome do mês inválido.');
    }

    const mes = String(monthIndex + 1).padStart(2, '0');
    const ano = year;

    return `${mes}/${ano}`;
  }

  public getMonthName(date = new Date()) {
    const numberOfMonth = date.getMonth();
    return this.months[numberOfMonth];
  }

  public increaseMonth(date: string | number | Date) {
    const newDate = new Date(date);

    newDate.setMonth(newDate.getMonth() + 1);

    return newDate;
  }

  public decreaseMonth(date: string | number | Date) {
    const newDate = new Date(date);

    newDate.setMonth(newDate.getMonth() - 1);

    return newDate;
  }
}

export {DateTime};
