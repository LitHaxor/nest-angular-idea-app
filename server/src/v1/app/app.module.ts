import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "src/ormConfig";

@Module({
    imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(config)],
})
export class V1AppModule {}
