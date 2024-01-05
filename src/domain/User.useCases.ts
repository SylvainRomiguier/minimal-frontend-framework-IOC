import { Store } from "../Store.service";
import { IUserProvider } from "./interfaces/User.provider";
import { User } from "./User";

export class UserUseCases {

  async getUsers(): Promise<User[]> {
    return await Store.services().inject<IUserProvider>("userProvider").getUsers();
  }

  async getUserById(id: number): Promise<User> {
    return await Store.services().inject<IUserProvider>("userProvider").getUserById(id);
  }
}