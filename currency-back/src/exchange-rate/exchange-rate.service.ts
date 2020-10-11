import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeRate } from './exchange-rate';
import { Repository, UpdateResult } from 'typeorm';

//database interactions for the exchange_rate entity
@Injectable()
export class ExchangeRateService {
  constructor(
      @InjectRepository(ExchangeRate)
          private exchangeRateRepository: Repository<ExchangeRate>,
  ) {}

  async findOne(id: number): Promise<ExchangeRate> {
      return await this.exchangeRateRepository.findOne({
        currency_id : id
      });
  }

  async create(exchangeRate: ExchangeRate): Promise<ExchangeRate> {
    return this.exchangeRateRepository.save(exchangeRate); 
  } 

  async findAll(): Promise<ExchangeRate[]> {
    return await this.exchangeRateRepository.find({
      order: {
        euro_rate: "ASC"
    }
    });
  }

  async update(id: number, exchangeRate: ExchangeRate): Promise<ExchangeRate> {
    await this.exchangeRateRepository.update({ currency_id: id} , exchangeRate);
    return await this.findOne(id);
}

}

