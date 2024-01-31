
type DisplayedUser = {
     id: number;
     name: string;
     username: string;
     email: string;
     address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
     }
     phone: string;
     website: string;
     company: {
        name: string;
        catchPhrase: string;
        bs: string;
     };
    };
export class UserList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["users"];
  }

  get users(): DisplayedUser[] {
    return JSON.parse(this.getAttribute("users") ?? "[]");
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }
    if (name === "users") {
      this.render();
    }
  }

  render() {
    if(!this.shadowRoot) { return }
    let width = this.users.length === 1 ? "100%" : "calc(33.333% - 20px)";
    width = this.users.length === 2 ? "calc(50% - 20px)" : width;

    this.shadowRoot.innerHTML = `
            <style>
                .user-list {
                  width: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  gap: 20px;
                }
                user-card {
                  width: ${width};
                }
                @media (max-width: 1400px) {
                  user-card {
                      width: calc(50% - 20px); /* 50% accounts for two cards in a row on smaller screens */
                  }
                }
                @media (max-width: 1000px) {
                  user-card {
                      width: calc(100% - 20px); /* 50% accounts for two cards in a row on smaller screens */
                  }
                }
            </style>
            <div class="user-list">
                ${this.users
                  .map(
                    (user) => `
                    <user-card user='${JSON.stringify(user)}'></user-card>
                `
                  )
                  .join("")}
            </div>
        `;
  }
}

customElements.define("user-list", UserList);
