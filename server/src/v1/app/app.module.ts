import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { HttpErrorFilter } from "../../utils/filters/http-error.filter";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "../../ormConfig";
import { IdeaModule } from "../ideas/idea.module";
import { LoggingInterceptor } from "../../utils/loggin.interceptor";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(config),
        IdeaModule,
        UserModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
})
export class V1AppModule {}
