import { createApp } from "./app";
import { loadConfig } from "./config";
import { MongoDbConnection } from "./mongodb";

const config = loadConfig();
const mongo = new MongoDbConnection(config.mongodbUri, config.mongodbDatabase);
const app = createApp(mongo);

const server = app.listen(config.port, () => {
    console.log(`HTTP server listening on port ${config.port}`);
});

async function shutdown(signal: string): Promise<void> {
    console.log(`${signal} received, shutting down`);

    server.close(async (error) => {
        if (error !== undefined) {
            console.error("Failed to close HTTP server", error);
            process.exitCode = 1;
        }

        await mongo.close();
    });
}

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));
