import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CurrencyService } from './currency.service';
import { Currency } from './currency';

//mapping of functions called for each operation and endpoint
//dto is used as input for post calls
@Controller('currency')
export class CurrencyController {
  constructor (private readonly currencyService: CurrencyService) {

  }

  @Post('create')
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get('all')
  findAll(): Promise<Currency[]> {
    return this.currencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Currency> {
    return this.currencyService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() updatecurrencyDto: CreateCurrencyDto) {
    return this.currencyService.update(id, updatecurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.currencyService.remove(id);
  }
}
