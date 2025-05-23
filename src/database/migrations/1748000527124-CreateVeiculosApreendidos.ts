import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateVeiculosApreendidos1748000527124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "veiculos_apreendidos",
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
            length: "35",
            isNullable: false,
          },
          {
            name: "placa",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "modelo",
            type: "varchar",
            length: "30",
            isNullable: false,
          },
          {
            name: "cor",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "situacao",
            type: "varchar",
            length: "40",
            isNullable: false,
          },
          {
            name: "observacoes",
            type: "varchar",
            length: "200",
            isNullable: false,
          },
          {
            name: "ocorrencia_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "veiculos_apreendidos",
      new TableForeignKey({
        name: "FK_veiculos_ocorrencia_id",
        columnNames: ["ocorrencia_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "ocorrencias",
        onDelete: "SET NULL",
        onUpdate: "NO ACTION",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("veiculos_apreendidos", "FK_veiculos_ocorrencia_id");

    await queryRunner.dropTable("veiculos_apreendidos");
  }
}
