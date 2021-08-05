import { UserEntity } from "src/v1/user/entity/User.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("idea")
export class IdeaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column("text")
    description: string;

    @Column("text")
    idea: string;

    @ManyToMany((type) => UserEntity, { cascade: true })
    @JoinTable()
    upvotes: UserEntity[];

    @ManyToMany((type) => UserEntity, { cascade: true })
    @JoinTable()
    downvotes: UserEntity[];

    @ManyToOne((type) => UserEntity, (author) => author.ideas)
    author: UserEntity;
}
