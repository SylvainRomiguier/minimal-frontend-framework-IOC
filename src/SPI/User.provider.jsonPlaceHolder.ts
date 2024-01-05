import { User } from "../domain/User";
import { IUserProvider } from "../domain/interfaces/User.provider";

export class UserProviderJsonPlaceHolder implements IUserProvider {
    private url = "https://jsonplaceholder.typicode.com/users";
    async getUsers(): Promise<User[]> {
        const response = await fetch(this.url);
        const users = await response.json();
        return users.map((user: any) => new User(user));
    }
    async getUserById(id: number): Promise<User> {
        const response = await fetch(`${this.url}/${id}`);
        const user = await response.json();
        return new User(user);
    }
}