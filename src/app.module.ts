import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './common/database/data-source';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateShipmentModule } from './modules/shipments/features/create-shipment/create-shipment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CqrsModule.forRoot(),
    CreateShipmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
