import { Module } from '@nestjs/common';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { PickupStopController } from './pickup-stop.controller';
import { PickupStopHandler } from './pickup-stop.handler';
import { Shipments } from '../../domain/shipments/shipments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipments])],
  controllers: [PickupStopController],
  providers: [PickupStopHandler],
})
export class PickupStopModule {}
