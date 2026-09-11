import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { ArriveStopCommand } from './arrive-stop.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipments } from '../../domain/shipments/shipments.entity';
import { NoSuchShipmentException } from '../../domain/shipments/exceptions/no-such-shipment.exception';

@Injectable()
@CommandHandler(ArriveStopCommand)
export class ArriveStopHandler implements ICommandHandler<ArriveStopCommand> {
  constructor(
    @InjectRepository(Shipments)
    private readonly shipmentsRepository: Repository<Shipments>,
  ) {}

  async execute(command: ArriveStopCommand) {
    const shipment = await this.shipmentsRepository.findOne({
      where: { id: command.arriveStop.shipmentId },
      relations: { stops: true },
    });

    if (!shipment) {
      throw new NoSuchShipmentException();
    }

    shipment.arriveToStop(command.arriveStop.stopId);

    await this.shipmentsRepository.save(shipment);

    return {
      message: `Arrived at stop with ID ${command.arriveStop.stopId} for shipment with ID ${command.arriveStop.shipmentId}`,
      status: 200,
    };
  }
}
