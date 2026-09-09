import { Module } from '@nestjs/common';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';
import { RabbitMQModule } from 'src/common/rabbitmq/rabbitmq.module';
import { CreateShipmentController } from './create-shipment.controller';
import { CreateShipmentHandler } from './create-shipment.handler';

@Module({
  imports: [TypeOrmModule.forFeature([]), RabbitMQModule],
  controllers: [CreateShipmentController],
  providers: [CreateShipmentHandler],
})
export class CreateShipmentModule {}
