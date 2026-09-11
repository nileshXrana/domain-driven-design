import { Controller, Patch, Param } from '@nestjs/common';
import { DeliverStopCommand } from './deliver-stop.command';
import { CommandBus } from '@nestjs/cqrs';

@Controller('shipments')
export class DeliverStopController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(':shipmentId/stops/:stopId/deliver')
  deliverStop(
    @Param('shipmentId') shipmentId: string,
    @Param('stopId') stopId: string,
  ) {
    return this.commandBus.execute(
      new DeliverStopCommand({ shipmentId, stopId }),
    );
  }
}
