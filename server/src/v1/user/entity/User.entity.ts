import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, } from "typeorm";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Logger } from "@nestjs/common";

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true })
    username: string;

    @Column('text')
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toReponseObject(showToken: boolean = true) {
        const { id, createdAt, username, token } = this;
        return showToken ?
            { id, createdAt, username, token }
            :
            { id, createdAt, username };
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);;
    }

    private get token() {
        const { id, username } = this;
        return jwt.sign({
            id, username
        }, process.env.SECRET, { expiresIn: '7d' });
    }
}