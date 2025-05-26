import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Ocorrencia } from "./Ocorrencia";

@Entity("objetos_apreendidos")
export class ObjetoApreendido {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  descricao: string;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.objetosApreendidos)
  @JoinColumn({ name: "ocorrencia_id" })
  ocorrencia: Ocorrencia;
}
