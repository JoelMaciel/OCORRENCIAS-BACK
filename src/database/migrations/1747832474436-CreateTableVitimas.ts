import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableVitimas1747832474436 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vitimas",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "nome",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "cpf",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "data_nascimento",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "nome_mae",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "nome_pai",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "naturalidade",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "nacionalidade",
            type: "varchar",
            length: "30",
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
          {
            name: "endereco_id",
            type: "uuid",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "vitimas",
      new TableForeignKey({
        columnNames: ["ocorrencia_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "ocorrencias",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "vitimas",
      new TableForeignKey({
        columnNames: ["endereco_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "enderecos",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("vitimas", "FK_vitimas_ocorrencia_id");
    await queryRunner.dropForeignKey("vitimas", "FK_vitimas_endereco_id");
    await queryRunner.dropTable("vitimas");
  }
}
