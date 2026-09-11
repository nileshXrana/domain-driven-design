import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateShipmentValidator } from '../../features/create-shipment/create-shipment.validator';
import { Stops } from './stops.entity';
import { ShipmentStatus } from './enums/shipments.enum';
import { v4 as uuidv4 } from 'uuid';
import { DuplicateStopIdException } from './exceptions/duplicate-stop-id.exception';
import { MissingStopSequenceException } from './exceptions/missing-stop-sequence.exception';
import { MinimumStopsException } from './exceptions/minimum-stops.exception';
import { NoSuchStopException } from './exceptions/no-such-stop.exception';
import { ArriveStopException } from './exceptions/arrive-stop.exception';

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
  @OneToMany(() => Stops, (stop) => stop.shipment, {
    cascade: true,
  })
  stops: Stops[];

  // create shipment
  create(shipment: CreateShipmentValidator) {
    this.id = uuidv4();
    this.order_id = shipment.orderId;
  }

  // validate stops
  validateStops(stops: CreateShipmentValidator['stops']) {
    const stopIds = new Set<string>();

    if (stops.length < 1) {
      throw new MinimumStopsException();
    }

    for (const stop of stops) {
      if (stop.sequence === undefined || stop.sequence === null) {
        throw new MissingStopSequenceException();
      }

      if (stopIds.has(stop.id)) {
        throw new DuplicateStopIdException();
      }

      stopIds.add(stop.id);
    }
  }

  // add stops
  addStops(stops: CreateShipmentValidator['stops']) {
    const newStops = stops.map((stop) => {
      const newStop = new Stops();
      newStop.create({
        id: stop.id,
        shipmentId: this.id,
        type: stop.type,
        sequence: stop.sequence,
        address: stop.address,
      });
      return newStop;
    });

    this.stops = newStops;
  }

  // update stop to arrived
  arriveToStop(stopId: string) {
    const stop = this.stops.find((s) => s.id === stopId);
    if (!stop) {
      throw new NoSuchStopException();
    }

    if (stop.sequence === 1) {
      stop.arriveStop();
    } else {
      const previousStop = this.stops.find(
        (s) => s.sequence === stop.sequence - 1,
      );

      if (!previousStop || previousStop.status !== 'DEPARTED') {
        throw new ArriveStopException();
      }

      stop.arriveStop();
    }
  }

  // update stop to departed
  pickupFromStop(stopId: string) {
    const stop = this.stops.find((s) => s.id === stopId);
    if (!stop) {
      throw new NoSuchStopException();
    }

    stop.pickupStop();
  }

  // update stop to departed
  deliverToStop(stopId: string) {
    const stop = this.stops.find((s) => s.id === stopId);
    if (!stop) {
      throw new NoSuchStopException();
    }

    stop.deliveryStop();
  }
}
