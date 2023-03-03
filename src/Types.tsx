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

  // constructor(brand:string){
  //   this.brand=brand;
  // }
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
  liste: CartItem[];

  add = (product: ProductType, amount: number = 1) => {
    const cartItem = this.liste.filter((p) => p.product.id == product.id);
    if (cartItem) {
      if (cartItem.length == 1) cartItem[0].amount += amount;
      else throw new Error("Unexpected number of products");
    } else {
      this.liste.push(new CartItem(product, amount));
    }
  };
}

export type PropDataType = {
  product: {
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
};

export type DataType = {
  limit: number;
  products: ProductType[];
  skip: number;
  total: number;
};
