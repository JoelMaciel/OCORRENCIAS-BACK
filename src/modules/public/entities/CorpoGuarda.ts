import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Policial } from "./Policial";
import { Ocorrencia } from "./Ocorrencia";
import { Batalhao } from "./Batalhao";

@Entity("corpo_guarda")
export class CorpoGuarda {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "data_criacao" })
  dataCriacao: Date;

  @UpdateDateColumn({ name: "data_atualizacao" })
  dataAtualizacao: Date;

  @ManyToOne(() => Batalhao, (batalhao) => batalhao.corposGuarda)
  @JoinColumn({ name: "batalhao_id" })
  batalhao: Batalhao;

  @ManyToOne(() => Policial, (policial) => policial.comandanteDeGuarda)
  @JoinColumn({ name: "comandante_id" })
  comandante: Policial;

  @ManyToMany(() => Policial, (policial) => policial.guardas)
  @JoinTable({
    name: "corpo_guarda_policiais",
    joinColumn: { name: "corpo_guarda_id" },
    inverseJoinColumn: { name: "policial_id" },
  })
  policiais: Policial[];

  @OneToMany(() => Ocorrencia, (ocorrencia) => ocorrencia.corpoGuarda)
  ocorrenciasRegistradas: Ocorrencia[];
}
