import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StopType } from '../../domain/enums/stops.enum';

export class AddressValidator {
  @IsNotEmpty()
  @IsString()
  houseNumber: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsInt()
  postalCode: number;
}

export class StopValidator {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(StopType, { message: 'Stop type must be either PICKUP or DELIVERY' })
  @IsNotEmpty()
  type: StopType;

  @IsInt()
  @IsNotEmpty()
  sequence: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressValidator)
  address: AddressValidator;
}

export class CreateShipmentValidator {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => StopValidator)
  source: StopValidator;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => StopValidator)
  destination: StopValidator;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => StopValidator)
  stops: StopValidator[];
}


