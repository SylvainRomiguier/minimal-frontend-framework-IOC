export class UserDetails extends HTMLElement {
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

  render() {
    if (!this.shadowRoot) {
      return;
    }
    this.shadowRoot.innerHTML = `
                <style>
                    .user-details {
                        padding: 1rem;
                        border: 1px solid black;
                        border-radius: 5px;
                        background-color: #eee;
                        color: black;
                        width: 300px;
                    }
                </style>
                <div class="user-details">
                    <h1>${this.user.name}</h1>
                    <p>${this.user.username}</p>
                    <p>${this.user.email}</p>
                    <p>${this.user.phone}</p>
                    <p>${this.user.website}</p>
                    <address>
                        <p>${this.user.address.street}</p>
                        <p>${this.user.address.suite}</p>
                        <p>${this.user.address.city}</p>
                        <p>${this.user.address.zipcode}</p>
                    </address>
                    <company-details company='${JSON.stringify(
                      this.user.company
                    )}'></company-details>
                </div>
            `;
  }
}

customElements.define("user-details", UserDetails);
