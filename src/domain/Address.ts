import { Geo, GeoDto } from "./Geo";

export type AddressDto = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoDto;
}

export class Address {
  private street: string;
  private suite: string;
  private city: string;
  private zipcode: string;
  private geo: Geo;
  constructor(
    {street,
    suite,
    city,
    zipcode,
    geo}:AddressDto
  ) {
    this.street = street;
    this.suite = suite;
    this.city = city;
    this.zipcode = zipcode;
    this.geo = new Geo(geo);
  }

  get value() {
    return {
      street: this.street,
      suite: this.suite,
      city: this.city,
      zipcode: this.zipcode,
      geo: this.geo.value,
    };
  }

  get toJSON() {
    return {
      ...this.value,
      geo: this.geo.toJSON,
    };
  }
}
