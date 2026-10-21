import { LessThan } from "../constraints"
import { GreaterThanOrEqual } from "../constraints/greaterThanOrEqual"
import { ProductSheet, User } from "../entities"
import { ProductSheetRepository, UserRepository } from "../repositories"

export function updateUserName(
    userRepository: UserRepository,
    user: User,
    name: User["name"]
) {
   return userRepository.save({
    ...user,
    name,
   })
}

export function takeOneProductInStock(
    productSheetRepository: ProductSheetRepository,
    productSheet: ProductSheet & {
        quantityInStock: number & GreaterThanOrEqual<10>
    }
) {
    return productSheetRepository.save({
        ...productSheet,
        quantityInStock: productSheet.quantityInStock - 1,
    })
}

export async function takeOneProductInStockAndSendCommand(
    productSheetRepository: ProductSheetRepository,
    productSheet: ProductSheet & {
        quantityInStock: number & LessThan<10>
    }
) {
    await productSheetRepository.sendCommand(productSheet)

    return productSheetRepository.save({
        ...productSheet,
        quantityInStock: productSheet.quantityInStock - 1,
    })
}
