import 'dotenv/config';
import { DataSource, type DataSourceOptions } from 'typeorm';

const migrationModule = process.env.MIGRATION_MODULE;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',

  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: ['dist/modules/**/database/entities/*.{ts,js}'],

  migrations: migrationModule
    ? [`dist/modules/${migrationModule}/database/migrations/*.{ts,js}`]
    : ['dist/modules/**/database/migrations/*.{ts,js}'],

  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

dataSource.initialize();
