import { Command } from '@nestjs/cqrs';

export class DeliverStopCommand extends Command<{
  message: string;
  status: number;
}> {
  constructor(
    public readonly deliverStop: { shipmentId: string; stopId: string },
  ) {
    super();
  }
}
