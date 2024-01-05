import { User } from "../../domain/User";

type EventsDefinition = {
    USERS_RECEIVED: User[];
    USER_SELECTED: User;
    PROVIDER_CHANGED: string;
}

type UserEvents = keyof EventsDefinition;

export type Unsubscribe = () => void;

const myEventBus = new Comment('my-event-bus');

export const publish = <T extends UserEvents>(eventName: T, payload?: EventsDefinition[T]) => {
    myEventBus.dispatchEvent(payload ? new CustomEvent(eventName, { detail: payload }) : new CustomEvent(eventName));
}

const isCustomEvent = (event: Event): event is CustomEvent => {
    return (event as CustomEvent).detail !== undefined;
}

export const subscribe = <T extends UserEvents>(eventName: T, callback: (payload?: EventsDefinition[T]) => void): Unsubscribe => {
    const handler = (event: Event) => {
        if (isCustomEvent(event)) {
            callback(event.detail);
        } else {
            callback();
        }
    }
    myEventBus.addEventListener(eventName, handler);
    return () => myEventBus.removeEventListener(eventName, handler);
}