import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Currency } from './currency';

//database interactions for the currency entity
@Injectable()
export class CurrencyService {
    constructor(
        @InjectRepository(Currency)
            private currencyRepository: Repository<Currency>,
      ) {}

    async create(currency: Currency): Promise<Currency> {
        return this.currencyRepository.save(currency); 
    }

    async update(id: number,currency: Currency): Promise<UpdateResult> {
        return await this.currencyRepository.update(id,currency);
    }

    async findAll(): Promise<Currency[]> {
        return await this.currencyRepository.find({
            order: { //order by name - ascending
                name: "ASC"
            }
        });
    }

    async findOne(id: number): Promise<Currency> {
        return await this.currencyRepository.findOne(id);
      }
    
    async remove(id: number): Promise<Currency> {
        const deletedId = await this.findOne(id);
        this.currencyRepository.delete(id);
        return deletedId;
    }
}
