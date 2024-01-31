import { User } from "../domain/User";
import { publish } from "./eventBus/eventBus";

export class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static styles = String.raw`
      <style>
        .user-card {
            background-color: #3498db;
            color: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            cursor: pointer;
            overflow: hidden;
        }

        .user-card .content {
          white-space: nowrap;
            overflow: ellipsis;
        }

        .user-card:hover {
            background-color: #2980b9;
            color: orange;
        }

        .user-card h2 {
            margin-top: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .user-card p {
            margin: 8px 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .user-card .company {
            font-style: italic;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    </style>
  `;

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
    this.shadowRoot.innerHTML = String.raw`
            ${UserCard.styles}
            <div class="user-card">
              <div class="content">
                <h2>${this.user.name}</h2>
                <p>${this.user.email}</p>
                <p>${this.user.phone}</p>
                <p class="company">${this.user.company.name}</p>
                </div>
            </div>
        `;
  }
}

customElements.define("user-card", UserCard);
