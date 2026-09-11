import { Command } from '@nestjs/cqrs';
import { StopValidator } from './create-shipment.validator';

export class CreateShipmentCommand extends Command<{
  message: string;
  status: number;
  data: Object;
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
