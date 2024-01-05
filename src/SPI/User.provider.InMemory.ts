import { User } from "../domain/User";
import { IUserProvider } from "../domain/interfaces/User.provider";

export class UserInMemoryProvider implements IUserProvider {
  private users: User[];
  constructor() {
    this.users = [
      new User({
        id: 1,
        name: "In Memory : Sylvain Romiguier",
        username: "Sylvain",
        email: "sylvain.romiguier@gmail.com",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {lat: "-37.3159", lng: "81.1496"}}
        ,
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets"
      },
      })
    ];
  }
  getUsers(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
  getUserById(id: number): Promise<User> {
    const userFound = this.users.find((user) => user.value.id === id);
    if (!userFound) {
      return Promise.reject(new Error("User not found"));
    }
    return Promise.resolve(userFound);
  }
}
