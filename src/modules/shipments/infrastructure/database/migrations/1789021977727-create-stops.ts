import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStops1789021977727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        schema: 'shipments_schema',
        name: 'stops',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'shipment_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['PICKUP', 'DELIVERY'],
            isNullable: false,
          },
          {
            name: 'sequence',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['IN_TRANSIT', 'ARRIVED', 'DEPARTED'],
            default: `'IN_TRANSIT'`,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(
      new Table({
        schema: 'shipments_schema',
        name: 'stops',
      }),
    );
  }
}
