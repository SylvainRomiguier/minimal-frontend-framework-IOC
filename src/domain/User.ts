import { Address, AddressDto } from "./Address";
import { Company, CompanyDto } from "./Company";

export type UserDto = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressDto;
  phone: string;
  website: string;
  company: CompanyDto;
}

export class User {
  private id: number;
  private name: string;
  private username: string;
  private email: string;
  private address: Address;
  private phone: string;
  private website: string;
  private company: Company;
  constructor(dto: UserDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.username = dto.username;
    this.email = dto.email;
    this.address = new Address(dto.address);
    this.phone = dto.phone;
    this.website = dto.website;
    this.company = new Company(dto.company);
  }
  get value() {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      email: this.email,
      address: this.address.value,
      phone: this.phone,
      website: this.website,
      company: this.company.value,
    };
  }

    get toJSON() {
        return {
        ...this.value,
        address: this.address.toJSON,
        company: this.company.toJSON,
        };
    }
}
