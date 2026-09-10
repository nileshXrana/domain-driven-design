import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateShipmentValidator } from '../../../features/create-shipment/create-shipment.validator';
import { Stops } from './stops.entity';
import { ShipmentStatus } from '../../enums/shipments.enum';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  schema: 'shipments_schema',
  name: 'shipments',
})
export class Shipments {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
  })
  order_id: string;

  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: ShipmentStatus.IN_TRANSIT,
  })
  status: ShipmentStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // relations
  @OneToMany(() => Stops, (stop) => stop.shipment_id, {
    cascade: true,
  })
  stops: Stops[];

  // create shipment
  create(shipment: CreateShipmentValidator) {
    if (!shipment.orderId) {
      throw new Error('Order ID is required');
    }

    if (shipment.stops.length < 1) {
      throw new Error('At least one stop is required');
    }

    this.id = uuidv4();
    this.order_id = shipment.orderId;

    const sourceStop = new Stops();
    sourceStop.create({
      id: shipment.source.id,
      shipmentId: this.id,
      type: shipment.source.type,
      sequence: shipment.source.sequence,
      address: shipment.source.address,
    });

    const destinationStop = new Stops();
    destinationStop.create({
      id: shipment.destination.id,
      shipmentId: this.id,
      type: shipment.destination.type,
      sequence: shipment.destination.sequence,
      address: shipment.destination.address,
    });

    this.stops = [
      sourceStop,
      ...shipment.stops.map((stop) => {
        const newStop = new Stops();
        newStop.create({
          id: stop.id,
          shipmentId: this.id,
          type: stop.type,
          sequence: stop.sequence,
          address: stop.address,
        });
        return newStop;
      }),
      destinationStop,
    ];
  }
}
