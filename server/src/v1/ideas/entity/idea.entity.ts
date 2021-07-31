import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class IdeaEntity {
    @PrimaryGeneratedColumn() id: string;
    @CreateDateColumn() createdAt: Date;
    @Column("text") description: string;
    @Column("text") idea: string;
}
