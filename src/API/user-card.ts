import { User } from "../domain/User";
import { publish } from "./eventBus/eventBus";

export class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["user"];
  }

  get user() {
    const user: string = this.getAttribute("user") ?? "";
    return JSON.parse(user);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }
    if (name === "user") {
      this.render();
    }
  }

  connectedCallback() {
    this.addEventListener("click", this.handleUserDetailsClick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.handleUserDetailsClick);
  }
  handleUserDetailsClick() {
    publish("USER_SELECTED", new User(this.user));
  }
  render() {
    if (!this.shadowRoot) {
      return;
    }
    this.shadowRoot.innerHTML = `
            <style>
                .user-card {
                    padding: 1rem;
                    border: 1px solid #eee;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .user-card:hover {
                    color: #242424;
                    background-color: #eee;
                }
            </style>
            <div class="user-card">
                <h2>${this.user.name}</h2>
                <p>${this.user.email}</p>
                <p>${this.user.phone}</p>
                <p>${this.user.company.name}</p>
            </div>
        `;
  }
}

customElements.define("user-card", UserCard);
