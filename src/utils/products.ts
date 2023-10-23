import { products } from "@/data/products";
import {
  FilterProductsType,
  ProductItem,
  ProductItems,
  TypeString,
} from "@/types/products";

const shouldAdd = (obj: keyof ProductItem, value: string) => ({
  number: {
    eq: parseFloat(obj) === parseFloat(value),
    ne: parseFloat(obj) !== parseFloat(value),
    gt: parseFloat(obj) >= parseFloat(value),
    it: parseFloat(obj) <= parseFloat(value),
  },
  boolean: {
    eq: obj.toString() === value,
    ne: false,
    gt: false,
    it: false,
  },
  string: {
    eq: obj.toString().toLowerCase().includes(value.toLowerCase()),
    ne: !obj.toString().toLowerCase().includes(value.toLowerCase()),
    gt: false,
    it: false,
  },
});

export const filterProducts: FilterProductsType = (filter) => {
  const operator = Object.keys(filter)[0];
  const property = filter[operator]![1].prop[0];
  const value = filter[operator]![0];
  if (Object.keys(filter).length === 0 || !operator || !property || !value)
    return products;

  const filtered = products.reduce((acc, cur: ProductItem) => {
    const current = cur[property as keyof ProductItem];
    const type = typeof current as TypeString;

    const rule = shouldAdd(current as keyof ProductItem, value as string)[type];

    return rule[operator as keyof typeof rule] ? [...acc, cur] : acc;
  }, [] as ProductItems);
  return filtered;
};
