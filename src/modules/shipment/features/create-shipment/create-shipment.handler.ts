import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateShipmentCommand } from './create-shipment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipments } from 'src/modules/shipment/infrastructure/database/entities/shipments.entity';
import { Repository } from 'typeorm';

@Injectable()
@CommandHandler(CreateShipmentCommand)
export class CreateShipmentHandler implements ICommandHandler<CreateShipmentCommand> {
  constructor(
    @InjectRepository(Shipments)
    private readonly shipmentRepository: Repository<Shipments>,
  ) {}

  async execute(command: CreateShipmentCommand) {
    // business/application logic

    return {
      shipmentId: '123',
    };
  }
}
