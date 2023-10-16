import { FixedLengthArray } from "@/types/array";

export type ProductItem = {
  id: string;
  category: string;
  title: string;
  price: string;
  imgLink: string;
  available: boolean;
  categoryId: string;
};

export type ProductItems = Array<ProductItem>;

export type OperatorType = "eq" | "ne" | "gt" | "it" | string;

export type PropertyType =
  | "id"
  | "available"
  | "category"
  | "categoryId"
  | "price"
  | "title"
  | "imgLink"
  | string;

export type ValueType = string | boolean;

export type FilterProps = {
  [operator in OperatorType]?: FixedLengthArray<
    [ValueType, { prop: Array<PropertyType> }]
  >;
};

export type FormatProductsType = (filter: FilterProps) => ProductItems;
