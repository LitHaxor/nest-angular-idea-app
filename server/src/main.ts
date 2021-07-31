import { NestFactory } from "@nestjs/core";
import {
    FastifyAdapter,
    NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { V1AppModule } from "./v1/app/app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        V1AppModule,
        new FastifyAdapter({ logger: true }),
    );
    await app.listen(parseInt(process.env.PORT) || 5000);
}
bootstrap();
