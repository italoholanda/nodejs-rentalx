import { DataSource } from "typeorm";

import * as Migrations from "./migrations";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "rentalx_admin",
  password: "rentalx_admin",
  database: "rentalx",
  migrations: [Migrations.CreateCategories],
});

export default dataSource;
