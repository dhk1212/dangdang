import { Address } from './address';

export type Meetup = {
  PK: string;
  SK: string;
  CreatedAt: string;
  Title: string;
  Text: string;
  Address: Address;
  Time: string;
  Type: string;
}