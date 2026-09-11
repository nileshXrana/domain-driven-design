import { Command } from '@nestjs/cqrs';

export class ArriveStopCommand extends Command<{
  message: string;
  status: number;
}> {
  constructor(
    public readonly arriveStop: { shipmentId: string; stopId: string },
  ) {
    super();
  }
}
