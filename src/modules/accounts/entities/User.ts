import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export default class User {
  @PrimaryColumn()
  private id: string;

  @Column()
  private name: string;

  @Column()
  private username: string;

  @Column()
  private password: string;

  @Column()
  private email: string;

  @Column("driver_license")
  private driverLicense: string;

  @Column()
  private isAdmin: boolean;

  @CreateDateColumn()
  private created_at: Date;

  constructor() {
    if (!this.id) this.id = uuidv4();
  }
}
