import { Store } from "../Store.service";
import { UserInMemoryProvider } from "../SPI/User.provider.InMemory";
import { UserProviderJsonPlaceHolder } from "../SPI/User.provider.jsonPlaceHolder";
import { publish } from "./eventBus/eventBus";

export class AppSwitch extends HTMLElement {
  private isOn = false;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["is-on"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }
    if (name === "is-on") {
      this.isOn = newValue === "true";
      if (this.isOn) {
        Store.services().provide("userProvider", new UserInMemoryProvider());
        publish("PROVIDER_CHANGED", "In Memory provider selected");
      } else {
        Store.services().provide(
          "userProvider",
          new UserProviderJsonPlaceHolder()
        );
        publish("PROVIDER_CHANGED", "JSON placeholder provider selected");
      }
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.handleSwitchClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleSwitchClick);
  }
  handleSwitchClick(e:Event) {
    e.preventDefault();
    if (this.getAttribute("is-on") === "false") {
      this.setAttribute("is-on", "true");
    } else {
      this.setAttribute("is-on", "false");
    }
    this.render();
  }

  render() {
    if (!this.shadowRoot) {
      return;
    }
    this.shadowRoot.innerHTML = `
            <style>
                .switch {
                  position: relative;
                  display: inline-block;
                  width: 60px;
                  height: 34px;
                }
                
                .switch input {
                  opacity: 0;
                  width: 0;
                  height: 0;
                }
                
                .slider {
                  position: absolute;
                  cursor: pointer;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background-color: #ccc;
                  -webkit-transition: .4s;
                  transition: .4s;
                }
                
                .slider:before {
                  position: absolute;
                  content: "";
                  height: 26px;
                  width: 26px;
                  left: 4px;
                  bottom: 4px;
                  background-color: white;
                  -webkit-transition: .4s;
                  transition: .4s;
                }
                
                input:checked + .slider {
                  background-color: #2196F3;
                }
                
                input:focus + .slider {
                  box-shadow: 0 0 1px #2196F3;
                }
                
                input:checked + .slider:before {
                  -webkit-transform: translateX(26px);
                  -ms-transform: translateX(26px);
                  transform: translateX(26px);
                }
                
                .slider.round {
                  border-radius: 34px;
                }
                
                .slider.round:before {
                  border-radius: 50%;
                }

                .container {
                    padding: 1rem;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 1rem;
                    }
            </style>
            <div class="container">
                <label class="switch">
                    <input type="checkbox" ${this.isOn ? "checked" : ""}>
                    <span class="slider round"></span>
                </label>
                <slot></slot>
            </div>
    `;
  }
}

customElements.define("app-switch", AppSwitch);
