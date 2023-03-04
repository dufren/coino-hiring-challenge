import { BiCaretDownCircle } from "react-icons/bi";

export type DataType = {
  limit: number;
  products: ProductType[];
  skip: number;
  total: number;
};

export type ProductTypeX = {
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

export class ProductType {
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
}

export class CartItem {
  product: ProductType;
  amount: number;

  constructor(product: ProductType, amount: number) {
    this.product = product;
    this.amount = amount;
  }
}

export class Cart {
  cartList: CartItem[];
  totalPrice: number;

  // add = (product: ProductType, amount: number = 1) => {
  //   let cartItem = this.cartList.find((p) => p.product.id == product.id);
  //   if (!cartItem) {
  //     cartItem = new CartItem(product, 0);
  //     this.cartList.push();
  //   }

  //   cartItem.amount += amount;
  // };
}
