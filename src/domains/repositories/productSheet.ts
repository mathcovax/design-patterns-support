import { ProductSheet } from "../entities";

export interface ProductSheetRepository {
    save(productSheet: ProductSheet): Promise<ProductSheet>;
    sendCommand(productSheet: ProductSheet): Promise<void>;
    findOneBySku(sku: string): Promise<ProductSheet | null>;
}