import { Command } from '@nestjs/cqrs';

export class PickupStopCommand extends Command<{
  message: string;
  status: number;
}> {
  constructor(
    public readonly pickupStop: { shipmentId: string; stopId: string },
  ) {
    super();
  }
}
