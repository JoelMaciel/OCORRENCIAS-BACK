import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ocorrencia } from "./Ocorrencia";
import { UnidadeMedida } from "../enums/UnidadeMedida";

@Entity("drogas")
export class Droga {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  tipo: string;

  @Column({ length: 25 })
  quantidade: string;

  @Column({ name: "unidade_medida", type: "enum", enum: UnidadeMedida })
  unidadeMedida: UnidadeMedida;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.drogas)
  @JoinColumn({ name: "ocorrencia_id" })
  ocorrencia: Ocorrencia;
}
