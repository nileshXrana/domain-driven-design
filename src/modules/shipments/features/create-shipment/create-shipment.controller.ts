import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { CreateShipmentCommand } from './create-shipment.command';
import { CreateShipmentValidator } from './create-shipment.validator';
import { CommandBus } from '@nestjs/cqrs';

@Controller('shipments')
export class CreateShipmentController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  createShipment(@Body() CreateShipment: CreateShipmentValidator) {
    return this.commandBus.execute(new CreateShipmentCommand(CreateShipment));
  }
}