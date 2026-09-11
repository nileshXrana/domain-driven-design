import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateShipmentCommand } from './create-shipment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipments } from '../../domain/shipments/shipments.entity';
import { Repository } from 'typeorm';

@Injectable()
@CommandHandler(CreateShipmentCommand)
export class CreateShipmentHandler implements ICommandHandler<CreateShipmentCommand> {
  constructor(
    @InjectRepository(Shipments)
    private readonly shipmentRepository: Repository<Shipments>,
  ) {}

  async execute(command: CreateShipmentCommand) {
    const shipment = new Shipments();

    shipment.create(command.createShipment);

    const stops = [
      command.createShipment.source,
      command.createShipment.destination,
      ...command.createShipment.stops,
    ];

    shipment.validateStops(stops);

    shipment.addStops(stops);

    await this.shipmentRepository.save(shipment);

    return {
      message: 'Shipment created successfully',
      status: 201,
      data: {
        shipmentId: shipment.id,
      },
    };
  }
}
