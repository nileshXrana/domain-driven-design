import { Controller, Patch, Param } from '@nestjs/common';
import { PickupStopCommand } from './pickup-stop.command';
import { CommandBus } from '@nestjs/cqrs';

@Controller('shipments')
export class PickupStopController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(':shipmentId/stops/:stopId/pickup')
  pickupStop(
    @Param('shipmentId') shipmentId: string,
    @Param('stopId') stopId: string,
  ) {
    return this.commandBus.execute(
      new PickupStopCommand({ shipmentId, stopId }),
    );
  }
}
