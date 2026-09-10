import { Module } from '@nestjs/common';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { RabbitMQModule } from 'src/common/rabbitmq/rabbitmq.module';
import { CreateShipmentController } from './create-shipment.controller';
import { CreateShipmentHandler } from './create-shipment.handler';
import { Shipments } from '../../domain/entities/shipment/shipments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipments]), RabbitMQModule],
  controllers: [CreateShipmentController],
  providers: [CreateShipmentHandler],
})
export class CreateShipmentModule {}
