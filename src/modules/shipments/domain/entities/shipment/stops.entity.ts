import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressValidator } from '../../../features/create-shipment/create-shipment.validator';
import { StopStatus, StopType } from '../../enums/stops.enum';
import { Shipments } from './shipments.entity';

@Entity({
  schema: 'shipments_schema',
  name: 'stops',
})
export class Stops {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({
    type: 'uuid',
  })
  shipment_id: string;

  @Column({
    type: 'enum',
    enum: StopType,
  })
  type: StopType;

  @Column({
    type: 'int',
  })
  sequence: number;

  @Column({
    type: 'jsonb',
  })
  address: AddressValidator;

  @Column({
    type: 'enum',
    enum: StopStatus,
    default: StopStatus.IN_TRANSIT,
  })
  status: StopStatus;

  // relations
  @ManyToOne(() => Shipments, (shipment) => shipment.stops)
  @JoinColumn({ name: 'shipment_id' })
  shipment: Shipments;

  // create stop
  create(params: {
    id: string;
    shipmentId: string;
    type: StopType;
    sequence: number;
    address: AddressValidator;
  }) {
    this.id = params.id;
    this.address = params.address;
    this.shipment_id = params.shipmentId;
    this.type = params.type;
    this.sequence = params.sequence;
  }
}
