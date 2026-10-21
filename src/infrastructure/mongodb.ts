import { Db, MongoClient } from "mongodb";

export interface MongoDatabase {
    readonly client: MongoClient;
    readonly db: Db;
}

export class MongoDbConnection {
    private readonly client: MongoClient;
    private database: Db | undefined;

    public constructor(
        private readonly uri: string,
        private readonly databaseName: string,
    ) {
        this.client = new MongoClient(uri);
    }

    public async connect(): Promise<MongoDatabase> {
        if (this.database !== undefined) {
            return { client: this.client, db: this.database };
        }

        await this.client.connect();
        this.database = this.client.db(this.databaseName);

        return { client: this.client, db: this.database };
    }

    public async ping(): Promise<void> {
        const { db } = await this.connect();
        await db.command({ ping: 1 });
    }

    public async close(): Promise<void> {
        await this.client.close();
        this.database = undefined;
    }
}
