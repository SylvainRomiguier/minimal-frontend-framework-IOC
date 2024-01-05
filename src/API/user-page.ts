import { Store } from "../Store.service";
import { User } from "../domain/User";
import { UserUseCases } from "../domain/User.useCases";
import { publish, subscribe } from "./eventBus/eventBus";

export class UserPage extends HTMLElement {
  private users: User[] = [];
  private selectedUser?: User;
  private subscriptions: (() => void)[] = [];
  constructor() {
    super();
    this.fetchUsers();
    this.attachShadow({ mode: "open" });
  }

  fetchUsers() {
    Store.services()
      .inject<UserUseCases>("userUseCases")
      .getUsers()
      .then((users) => {
        this.users = users;
        publish("USERS_RECEIVED", users);
      });
  }

  connectedCallback() {
    this.subscriptions.push(
      subscribe("USERS_RECEIVED", this.render.bind(this))
    );
    this.subscriptions.push(
      subscribe("USER_SELECTED", (user) => {
        this.selectedUser = user;
        this.render();
      })
    );
    this.subscriptions.push(
      subscribe("PROVIDER_CHANGED", () => {
        this.selectedUser = undefined;
        this.fetchUsers();
      })
    );
  }

  disconnectedCallback() {
    this.subscriptions.forEach((unsubscribe) => unsubscribe());
  }

  render() {
    if (!this.shadowRoot) {
      return;
    }
    this.shadowRoot.innerHTML = `
        <style>
        .user-page {
            display: flex;
            flex-direction: row;
            gap: 1rem;
        }
        </style>
        <div class="user-page">
            <user-list users='${JSON.stringify(
              this.users.map((user) => user.toJSON)
            )}'></user-list>
            ${
              this.selectedUser
                ? `
                <user-details user='${JSON.stringify(
                  this.selectedUser.toJSON
                )}'></user-details>
            `
                : ""
            }
            </div>
        `;
  }
}

customElements.define("user-page", UserPage);
