import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShipmentValidator {
  @IsInt()
  orderId: number;

  @ValidateNested()
  @Type(() => AddressValidator)
  source: AddressValidator;

  @ValidateNested()
  @Type(() => AddressValidator)
  destination: AddressValidator;

  @ValidateNested({ each: true })
  @Type(() => AddressValidator)
  stops: AddressValidator[];
}

export class AddressValidator {
  @IsString()
  houseNumber: string;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsInt()
  postalCode: number;
}
