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

@Entity("veiculos_apreendidos")
export class VeiculoApreendido {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tipo: string;

  @Column()
  placa: string;

  @Column()
  modelo: string;

  @Column()
  cor: string;

  @Column()
  situacao: string;

  @Column()
  observacoes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.veiculos)
  @JoinColumn({ name: "ocorrencia_id" })
  ocorrencia: Ocorrencia;
}
