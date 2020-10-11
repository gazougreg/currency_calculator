import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common'
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRate } from './exchange-rate';
import {CreateExchangeRateDto} from './dto/create-exchange-rate.dto'

//mapping of functions called for each operation and endpoint
//dto is used as input for post calls
@Controller('exchange-rate')
export class ExchangeRateController {
    constructor (private readonly exchangeRateService: ExchangeRateService) {

    }

    @Get('all')
    findAllRates(): Promise<ExchangeRate[]> {
        return this.exchangeRateService.findAll();
    }

    @Get(':currency_id')
    findOne(@Param('currency_id') currency_id: number): Promise<ExchangeRate> {
        return this.exchangeRateService.findOne(currency_id);
    }

    
    @Post('create')
    create(@Body() createExchangeRateDto: CreateExchangeRateDto) {
        return this.exchangeRateService.create(createExchangeRateDto);
    }

    @Put(':currency_id')
    update(@Param('currency_id') currency_id: number, @Body() updateExchangeRateDto: CreateExchangeRateDto) {
        return this.exchangeRateService.update(currency_id, updateExchangeRateDto)
    }
    
}
