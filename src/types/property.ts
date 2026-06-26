export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number | null;
  image: string;
  description: string;
  listingType: string;
  parkingSpaces: number;
  ownerId: string;
}
