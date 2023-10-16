import { products } from "@/data/products";
import {
  FormatProductsType,
  OperatorType,
  ProductItem,
  ProductItems,
} from "@/types/products";

export const formatProducts: FormatProductsType = (filter) => {
  if (Object.keys(filter).length === 0) return products;

  const formatValue = (value: string | boolean) => {
    if (value === true) return "available";
    if (value === false) return "unavailable";
    return value as string;
  };

  const filtered = products.reduce((acc, cur: ProductItem) => {
    const operator = Object.keys(filter)[0];
    const property: string = filter[operator as OperatorType]![1].prop[0];
    const value: string = formatValue(filter[operator]![0]);

    const curProp: string = cur[property as keyof typeof cur].toString();

    if (property === "price") {
      if (operator === "eq") {
        return parseFloat(cur[property]) === parseFloat(value)
          ? [...acc, cur]
          : acc;
      }
      if (operator === "ne") {
        return parseFloat(cur[property]) !== parseFloat(value)
          ? [...acc, cur]
          : acc;
      }
      if (operator === "gt") {
        return parseFloat(cur[property]) >= parseFloat(value)
          ? [...acc, cur]
          : acc;
      }
      if (operator === "it") {
        return parseFloat(cur[property]) <= parseFloat(value)
          ? [...acc, cur]
          : acc;
      }
    }

    if (property === "available") {
      const valueFormat = value === "available" ? true : false;
      const curPropToBoolean =
        curProp === "true" ? true : curProp === "false" ? false : curProp;
      return curPropToBoolean === valueFormat ? [...acc, cur] : acc;
    }

    if (operator === "eq") {
      // rest
      return curProp.includes(value) ? [...acc, cur] : acc;
    }

    if (operator === "ne") {
      return !curProp.includes(value) ? [...acc, cur] : acc;
    }

    return acc;
  }, [] as ProductItems);
  return filtered;
};
