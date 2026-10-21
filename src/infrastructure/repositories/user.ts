import type { Collection } from "mongodb";
import type { User } from "../../domains/entities";
import type { UserRepository } from "../../domains/repositories/user";
import type { MongoDbConnection } from "../mongodb";

type UserDocument = {
    name: User["name"];
};

export class MongoUserRepository implements UserRepository {
    public constructor(
        private readonly mongo: MongoDbConnection,
        private readonly collectionName = "users",
    ) {}

    private async getCollection(): Promise<Collection<UserDocument>> {
        const { db } = await this.mongo.connect();

        return db.collection<UserDocument>(this.collectionName);
    }

    public async save(user: User): Promise<User> {
        const collection = await this.getCollection();

        await collection.updateOne(
            { name: user.name },
            { $set: { name: user.name } },
            { upsert: true },
        );

        return user;
    }

    public async findByName(name: User["name"]): Promise<User | null> {
        const collection = await this.getCollection();
        const user = await collection.findOne({ name });

        if (user === null) {
            return null;
        }

        return { name: user.name };
    }
}
