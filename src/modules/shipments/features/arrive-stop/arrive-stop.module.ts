import { Module } from '@nestjs/common';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { ArriveStopController } from './arrive-stop.controller';
import { ArriveStopHandler } from './arrive-stop.handler';
import { Shipments } from '../../domain/shipments/shipments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Shipments])],
  controllers: [ArriveStopController],
  providers: [ArriveStopHandler],
})
export class ArriveStopModule {}
