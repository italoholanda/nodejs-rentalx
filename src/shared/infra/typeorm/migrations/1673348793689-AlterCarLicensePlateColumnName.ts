import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCarLicensePlateColumnName1673348793689
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "cars",
      "licence_plate",
      new TableColumn({
        name: "license_plate",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "cars",
      "license_plate",
      new TableColumn({
        name: "licence_plate",
        type: "varchar",
        isNullable: true,
      })
    );
  }
}
