import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { PickupStopCommand } from './pickup-stop.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipments } from '../../domain/shipments/shipments.entity';
import { NoSuchShipmentException } from '../../domain/shipments/exceptions/no-such-shipment.exception';

@Injectable()
@CommandHandler(PickupStopCommand)
export class PickupStopHandler implements ICommandHandler<PickupStopCommand> {
  constructor(
    @InjectRepository(Shipments)
    private readonly shipmentsRepository: Repository<Shipments>,
  ) {}

  async execute(command: PickupStopCommand) {
    const shipment = await this.shipmentsRepository.findOne({
      where: { id: command.pickupStop.shipmentId },
      relations: { stops: true },
    });

    if (!shipment) {
      throw new NoSuchShipmentException();
    }

    shipment.pickupFromStop(command.pickupStop.stopId);

    await this.shipmentsRepository.save(shipment);

    return {
      message: `Picked up at stop with ID ${command.pickupStop.stopId} for shipment with ID ${command.pickupStop.shipmentId}`,
      status: 200,
    };
  }
}
