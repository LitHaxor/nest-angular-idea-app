import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
const config: ConnectionOptions = {
    type: "postgres",
    url: process.env.DB_URL,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
    migrationsRun: true,
    logging: false,
    migrations: [__dirname + "/common/migrations/**/*{.ts,.js}"],
    cli: {
        migrationsDir: "src/common/migrations",
    },
};

export default config;
