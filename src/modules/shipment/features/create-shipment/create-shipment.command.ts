import { Command } from '@nestjs/cqrs';
import { AddressValidator } from './create-shipment.validator';
import { CreateShipmentValidator } from './create-shipment.validator';

export class CreateShipmentCommand extends Command<{
  shipmentId: string; // This type represents the command execution result
}> {
  constructor(public readonly createShipment: CreateShipmentValidator) {
    super();
  }
}
