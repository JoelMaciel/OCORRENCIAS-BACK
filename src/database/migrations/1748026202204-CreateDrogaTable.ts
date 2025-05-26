import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDrogaTable1748026202204 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "drogas",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "tipo",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "quantidade",
            type: "varchar",
            length: "25",
            isNullable: false,
          },
          {
            name: "unidade_medida",
            type: "enum",
            enum: ["mg", "g", "kg", "t"],
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "ocorrencia_id",
            type: "uuid",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "drogas",
      new TableForeignKey({
        name: "FK_drogas_ocorrencia",
        columnNames: ["ocorrencia_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "ocorrencias",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("drogas", "IDX_DROGAS_OCORRENCIA");
    await queryRunner.dropForeignKey("drogas", "FK_drogas_ocorrencia");
    await queryRunner.dropTable("drogas");
  }
}
