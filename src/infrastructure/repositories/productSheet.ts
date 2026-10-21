import type { Collection } from "mongodb";
import type { ProductSheet } from "../../domains/entities";
import type { ProductSheetRepository } from "../../domains/repositories";
import type { MongoDbConnection } from "../mongodb";

type ProductRestockCommand = {
    type: "restock";
    sku: string;
    name: string;
    quantityInStock: number;
    createdAt: Date;
};

export class MongoProductSheetRepository implements ProductSheetRepository {
    public constructor(
        private readonly mongo: MongoDbConnection,
        private readonly collectionName = "product_sheets",
    ) {}

    private async getCollection(): Promise<Collection<ProductSheet>> {
        const { db } = await this.mongo.connect();

        return db.collection<ProductSheet>(this.collectionName);
    }

    public async findOneBySku(sku: string): Promise<ProductSheet | null> {
        const productSheet = await (await this.getCollection()).findOne({ sku });

        return productSheet === null
            ? null
            : {
                sku: productSheet.sku,
                name: productSheet.name,
                quantityInStock: productSheet.quantityInStock,
            };
    }

    public async save(productSheet: ProductSheet): Promise<ProductSheet> {
        await (await this.getCollection()).replaceOne(
            { sku: productSheet.sku },
            productSheet,
            { upsert: true },
        );

        return productSheet;
    }

    public async sendCommand(productSheet: ProductSheet): Promise<void> {
        const { db } = await this.mongo.connect();
        const command: ProductRestockCommand = {
            type: "restock",
            sku: productSheet.sku,
            name: productSheet.name,
            quantityInStock: productSheet.quantityInStock,
            createdAt: new Date(),
        };

        await db.collection<ProductRestockCommand>("product_commands").insertOne(command);
    }
}
