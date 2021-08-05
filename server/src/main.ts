import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
    FastifyAdapter,
    NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { V1AppModule } from "./v1/app/app.module";
const port = parseInt(process.env.PORT) || 5000;
async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        V1AppModule,
        new FastifyAdapter(),
    );
    await app.listen(port);
    Logger.warn(`Server running on http://localhost:${port}`, "Server Started");
}
bootstrap();
