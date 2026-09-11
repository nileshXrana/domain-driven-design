import { Controller, Patch, Param } from '@nestjs/common';
import { ArriveStopCommand } from './arrive-stop.command';
import { CommandBus } from '@nestjs/cqrs';

@Controller('shipments')
export class ArriveStopController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(':shipmentId/stops/:stopId/arrive')
  arriveStop(
    @Param('shipmentId') shipmentId: string,
    @Param('stopId') stopId: string,
  ) {
    return this.commandBus.execute(
      new ArriveStopCommand({ shipmentId, stopId }),
    );
  }
}
