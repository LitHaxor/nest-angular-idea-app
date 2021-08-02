import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/User.entity";
import { IdeaController } from "./controllers/idea.controller";
import { IdeaEntity } from "./entity/idea.entity";
import { IdeaServices } from "./services/idea.service";

@Module({
    imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity])],
    controllers: [IdeaController],
    providers: [IdeaServices],
})
export class IdeaModule { }
