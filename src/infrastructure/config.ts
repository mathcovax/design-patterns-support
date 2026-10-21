export interface AppConfig {
    readonly port: number;
    readonly mongodbUri: string;
    readonly mongodbDatabase: string;
    readonly nodeEnv: string;
}

function readPort(value: string | undefined): number {
    const port = Number(value ?? 3000);

    if (!Number.isInteger(port) || port < 1 || port > 65_535) {
        throw new Error("PORT must be an integer between 1 and 65535");
    }

    return port;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
    return {
        port: readPort(env.PORT),
        mongodbUri: env.MONGODB_URI ?? "mongodb://127.0.0.1:27017",
        mongodbDatabase: env.MONGODB_DATABASE ?? "design_pattern_support",
        nodeEnv: env.NODE_ENV ?? "development",
    };
}
