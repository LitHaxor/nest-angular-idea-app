import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Logger } from "@nestjs/common";
import { IdeaEntity } from "src/v1/ideas/entity/idea.entity";

@Entity("Users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", unique: true })
    username: string;

    @Column("text")
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany((type) => IdeaEntity, { cascade: true })
    @JoinTable()
    bookmarks: IdeaEntity[];

    @OneToMany((type) => IdeaEntity, (idea) => idea.author)
    ideas: IdeaEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toReponseObject(showToken: boolean = true) {
        const { id, createdAt, username, token } = this;
        const responseObject: any = { id, createdAt, username };
        if (showToken) {
            responseObject.token = token;
        }
        if (this.bookmarks) {
            responseObject.bookmarks = this.bookmarks;
        }
        return responseObject;
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token() {
        const { id, username } = this;
        return jwt.sign(
            {
                id,
                username,
            },
            process.env.SECRET,
            { expiresIn: "7d" },
        );
    }
}
