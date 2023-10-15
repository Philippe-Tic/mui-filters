import { OptionProps } from "@/types/select";

const properties = {
  id: {
    label: "ID",
    value: "id",
  },
  available: {
    label: "Available",
    value: "available",
  },
  category: {
    label: "Category",
    value: "category",
  },
  categoryId: {
    label: "Category ID",
    value: "categoryId",
  },
  imgLink: {
    label: "Lien d'image",
    value: "imgLink",
  },
  price: {
    label: "Prix",
    value: "price",
  },
  title: {
    label: "Titre",
    value: "title",
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
}));

export const operatorsOptions: Array<OptionProps> = Object.values(
  operators,
).map((operator) => ({
  label: operator.label,
  value: operator.value,
}));
