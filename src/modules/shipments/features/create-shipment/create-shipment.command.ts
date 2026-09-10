import { Command } from '@nestjs/cqrs';
import { StopValidator } from './create-shipment.validator';
import { ShipmentStatus } from '../../domain/enums/shipments.enum';

export class CreateShipmentCommand extends Command<{
  shipmentId: string;
}> {
  constructor(
    public readonly createShipment: {
      orderId: string;
      source: StopValidator;
      destination: StopValidator;
      stops: StopValidator[];
    },
  ) {
    super();
  }
}
