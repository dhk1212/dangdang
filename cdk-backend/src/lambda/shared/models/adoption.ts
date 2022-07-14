export type Adoption = {
  PK: string;
  SK: string;
  CreatedAt: string;
  Title: string;
  Text: string;
  Thumbnail: string;
  Price: number;
  Breed: string;
  Age: number;
  Gender: 'M' | 'F';
}