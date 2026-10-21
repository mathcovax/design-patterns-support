import { User } from "../entities";

export interface UserRepository {
    save(user: User): Promise<User>
    findByName(user: User["name"]): Promise<User | null>
}
