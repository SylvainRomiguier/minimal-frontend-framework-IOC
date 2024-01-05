import { User } from "../User";

export interface IUserProvider {
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
}