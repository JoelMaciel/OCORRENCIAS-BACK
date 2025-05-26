import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateObjetoApreendidoTable1748276314753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "objetos_apreendidos",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "descricao",
            type: "text",
            isNullable: true,
          },
          {
            name: "ocorrencia_id",
            type: "uuid",
            isNullable: false,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "objetos_apreendidos",
      new TableForeignKey({
        name: "FK_objetos_apreendidos_ocorrencia",
        columnNames: ["ocorrencia_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "ocorrencias",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("objetos_apreendidos", "FK_objetos_apreendidos_ocorrencia");
    await queryRunner.dropTable("objetos_apreendidos");
  }
}
