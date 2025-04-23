import { UserProviderJsonPlaceHolder } from "./SPI/User.provider.jsonPlaceHolder";
import { Store } from "./Store.service";
import { UserUseCases } from "./domain/User.useCases";
import "./style.css";

// Register the providers and use cases
Store.services().provide("userProvider", new UserProviderJsonPlaceHolder());
Store.services().provide("userUseCases", new UserUseCases());

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="app-container">
    <div class="top-bar">
    <h1>Back to Basics : a minimal frontend framework</h1>
    <h2>Dependency Injection and reactive Web Components in Typescript</h2>
    <app-switch>In Memory Provider</app-switch>
    </div>
    <div class="content">
      <user-page></user-page>
    </div>
  </div>
`;
