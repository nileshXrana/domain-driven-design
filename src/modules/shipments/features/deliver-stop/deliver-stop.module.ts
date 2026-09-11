import { Module } from '@nestjs/common';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { DeliverStopController } from './deliver-stop.controller';
import { DeliverStopHandler } from './deliver-stop.handler';
import { Shipments } from '../../domain/shipments/shipments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipments])],
  controllers: [DeliverStopController],
  providers: [DeliverStopHandler],
})
export class DeliverStopModule {}
