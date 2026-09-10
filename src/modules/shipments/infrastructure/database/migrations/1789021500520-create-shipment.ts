import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateShipment1789021500520 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('shipments_schema', true);

    await queryRunner.createTable(
      new Table({
        schema: 'shipments_schema',
        name: 'shipments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['IN_TRANSIT', 'DELIVERED', 'CANCELLED'],
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
        name: 'shipments',
      }),
    );

    await queryRunner.dropSchema('shipments_schema', true);
  }
}
