import { Address } from './address';

export type Health = {
  PK: string;
  SK: string;
  CreatedAt: string;
  Title: string;
  Text: string;
  Rating: number;
  Address: Address;
  Type: string;
}