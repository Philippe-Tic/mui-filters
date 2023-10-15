export interface ProductItem {
  id: string;
  category: string;
  title: string;
  price: string;
  imgLink: string;
  available: boolean;
  categoryId: string;
}

export interface ProductItems extends Array<ProductItem> {}
