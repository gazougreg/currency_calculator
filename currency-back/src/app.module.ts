import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeRateController } from './exchange-rate/exchange-rate.controller';
import { CurrencyController } from './currency/currency.controller';
import { CurrencyService } from './currency/currency.service';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';
import { CurrencyModule } from './currency/currency.module';
import {ExchangeRateModule} from './exchange-rate/exchange-rate.module';
import { TypeOrmModule } from '@nestjs/typeorm';

//database configuration
@Module({
  imports: [CurrencyModule, ExchangeRateModule, TypeOrmModule.forRoot({
    "type":"sqlite",
    "database": "./currency.db",
    "autoLoadEntities": true,
    
})],
  controllers: [AppController,CurrencyController, ExchangeRateController],
  providers: [AppService, CurrencyService, ExchangeRateService],
})
export class AppModule {}
