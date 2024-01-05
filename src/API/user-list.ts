
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
    this.shadowRoot.innerHTML = `
            <style>
                .user-list {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 1rem;
                }
                .user-card {
                    padding: 1rem;
                    border: 1px solid black;
                    border-radius: 5px;
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
