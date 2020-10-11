//data transfer object structure for exchange rate
export class CreateExchangeRateDto {
    readonly id: number;
    readonly euro_rate: number;
    readonly currency_id: number;
  }