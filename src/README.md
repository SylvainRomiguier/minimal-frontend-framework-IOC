# Back to Basics: A minimal frontend framework with Inversion Of Control in TS
A frontend framework should allow writing new HTML components and make them reactive to be re-rendered on some properties changes.

**The only dependencies are typescript and vite.**

## TLDR
1. download the code
2. yarn install
3. yarn dev

## Web Components in API folder
I have used pure Web Components to create HTML components.

## Reactiveness
You will find a custom typed Event bus based on the Observer Pattern in the `API/eventBus` folder.
The events and their payload are strongly typed.

There are 2 main exposed functions :
1. `subscribe(eventName, callbackFunction)` which returns an unsubscribe function;
2. `publish(eventName, payload)` which fires the event.

## Domain Driven Design
The structure is based on Hexagonal Architecture with all the components in API folder, domain entities and use cases in domain folder and the providers in SPI folder.

You will find 2 implementations of the User Provider Interface.

I have broken an architecture rule in the `app-switch` component to demonstrate the live change of an injected provider with the IUOC feature.

The other components only depends on use cases from the domain.

## Inversion Of Control, dependency injection
Ine the src root folder you will find a Singleton Class named `Store.service.ts` allowing to register services/providers and to inject them wherever they are needed thanks to `provide` and `inject` methods.

## structure
```
src
├── API
│   ├── app-switch.ts
│   ├── eventBus
│   │   └── eventBus.ts
│   ├── user-card.ts
│   ├── user-details.ts
│   ├── user-list.ts
│   └── user-page.ts
├── domain
│   ├── Address.ts
│   ├── Company.ts
│   ├── Geo.ts
│   ├── interfaces
│   │   └── User.provider.ts
│   ├── User.ts
│   └── User.useCases.ts
├── main.ts
├── README.md
├── SPI
│   ├── User.provider.InMemory.ts
│   └── User.provider.jsonPlaceHolder.ts
├── Store.service.ts
├── style.css
└── vite-env.d.ts
```