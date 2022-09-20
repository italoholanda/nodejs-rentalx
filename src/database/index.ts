import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "rentalx_admin",
  password: "rentalx_admin",
  database: "rentalx",
});

export default dataSource;
