export class Store {
  private services: Array<{ name: string; service: any }> = [];

  private static instance: Store;
  private constructor() {}

  public static services(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  public provide(name: string, service: any): void {
    const foundIndex = this.services.findIndex((s) => s.name === name);
    if (foundIndex === -1) {
      this.services.push({ name, service });
    } else {
      this.services[foundIndex] = { name, service };
    }
  }

  public inject<T>(name: string): T {
    const service = this.services.find((s) => s.name === name);
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }
    return service.service;
  }
}
