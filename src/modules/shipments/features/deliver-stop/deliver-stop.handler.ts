import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { DeliverStopCommand } from './deliver-stop.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipments } from '../../domain/shipments/shipments.entity';
import { NoSuchShipmentException } from '../../domain/shipments/exceptions/no-such-shipment.exception';

@Injectable()
@CommandHandler(DeliverStopCommand)
export class DeliverStopHandler implements ICommandHandler<DeliverStopCommand> {
  constructor(
    @InjectRepository(Shipments)
    private readonly shipmentsRepository: Repository<Shipments>,
  ) {}

  async execute(command: DeliverStopCommand) {
    const shipment = await this.shipmentsRepository.findOne({
      where: { id: command.deliverStop.shipmentId },
      relations: { stops: true },
    });

    if (!shipment) {
      throw new NoSuchShipmentException();
    }

    shipment.deliverToStop(command.deliverStop.stopId);

    await this.shipmentsRepository.save(shipment);

    return {
      message: `Delivered to stop with ID ${command.deliverStop.stopId} for shipment with ID ${command.deliverStop.shipmentId}`,
      status: 200,
    };
  }
}
