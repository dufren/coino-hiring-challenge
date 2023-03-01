export type ProductType = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: [];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

export type DataType = {
  limit: number;
  products: ProductType[];
  skip: number;
  total: number;
};
