import { FixedLengthArray } from "@/types/array";

export type RawProductItem = {
  id: string;
  category: string;
  title: string;
  price: string;
  imgLink: string;
  available: boolean;
  categoryId: string;
};

export type ProductItem = {
  id: string;
  category: string;
  title: string;
  price: number;
  imgLink: string;
  available: boolean;
  categoryId: string;
};

export type RawProductItems = Array<RawProductItem>;

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

export type ValueType = string | number;

export type TypeString = "string" | "boolean" | "number";

export type FilterProps = {
  [operator in OperatorType]?: FixedLengthArray<
    [ValueType, { prop: Array<PropertyType> }]
  >;
};

export type FilterProductsType = (filter: FilterProps) => ProductItems;

export type FormatPriceType = (price: string) => number;
