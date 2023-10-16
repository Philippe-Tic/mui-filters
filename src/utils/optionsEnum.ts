import { OptionProps } from "@/types/select";

const properties = {
  id: {
    label: "ID",
    value: "id",
    type: "string",
  },
  available: {
    label: "Available",
    value: "available",
    type: "boolean",
  },
  category: {
    label: "Category",
    value: "category",
    type: "string",
  },
  categoryId: {
    label: "Category ID",
    value: "categoryId",
    type: "string",
  },
  imgLink: {
    label: "Lien d'image",
    value: "imgLink",
    type: "string",
  },
  price: {
    label: "Prix",
    value: "price",
    type: "number",
  },
  title: {
    label: "Titre",
    value: "title",
    type: "string",
  },
};

const operators = {
  ne: {
    label: "Différent de",
    value: "ne",
  },
  eq: {
    label: "Egal à",
    value: "eq",
  },
  gt: {
    label: "Supérieur à",
    value: "gt",
  },
  it: {
    label: "Inférieur à",
    value: "it",
  },
};

export const propertiesOptions: Array<OptionProps> = Object.values(
  properties,
).map((prop) => ({
  label: prop.label,
  value: prop.value,
  type: prop.type,
}));

export const operatorsOptions: Array<Omit<OptionProps, "type">> = Object.values(
  operators,
).map((operator) => ({
  label: operator.label,
  value: operator.value,
}));
