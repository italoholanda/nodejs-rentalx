import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "root",
  password: "toor",
  database: "rentalx",
});

export default dataSource;
