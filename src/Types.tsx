export type DataType = {
  limit: number;
  products: ProductType[];
  skip: number;
  total: number;
};

export type ProductType = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: [image1: string, image2: string, image3: string, image4: string];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

type CartItem = {
  product: ProductType;
  amount: number;
};

export type Cart = {
  cartList: CartItem[];
  totalPrice: number;
  totalAmount: number;
};

export type CardUpdate = {
  product: ProductType;
  amount: number;
};
