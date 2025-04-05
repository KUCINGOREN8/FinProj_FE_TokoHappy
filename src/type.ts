export interface Product {
    id: number;
    title: string;
    price: number;
    images: string[];
    category: {
      name: string;
    };
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  