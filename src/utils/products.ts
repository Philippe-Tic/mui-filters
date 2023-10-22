import { products } from "@/data/products";
import {
  FilterProductsType,
  OperatorType,
  ProductItem,
  ProductItems,
} from "@/types/products";

const shouldAdd = (obj, value) => ({
  number: {
    eq: obj === parseFloat(value),
    ne: obj !== parseFloat(value),
    gt: obj >= parseFloat(value),
    it: obj <= parseFloat(value),
  },
  boolean: {
    eq: obj.toString() === value,
  },
  string: {
    eq: obj.toString().toLowerCase().includes(value.toLowerCase()),
    ne: !obj.toString().toLowerCase().includes(value.toLowerCase()),
  },
});

export const filterProducts: FilterProductsType = (filter) => {
  if (Object.keys(filter).length === 0) return products;

  const filtered = products.reduce((acc, cur: ProductItem) => {
    const operator = Object.keys(filter)[0];
    const property = filter[operator as OperatorType]![1].prop[0];
    const value = filter[operator]![0];
    const type: string | boolean | number = typeof cur[property];

    return shouldAdd(cur[property], value)[type][operator]
      ? [...acc, cur]
      : acc;
  }, [] as ProductItems);
  return filtered;
};
