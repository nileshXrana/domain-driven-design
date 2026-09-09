import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  schema: 'shipments_schema',
  name: 'shipments',
})
export class Shipments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
  })
  order_id: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  amount: number;

  @CreateDateColumn()
  created_at: Date;
}
