import { OptionProps } from "@/types/select";

const properties = {
  id: {
    label: "ID",
    value: "id",
    type: "string",
  },
  available: {
    label: "Disponibilité",
    value: "available",
    type: "boolean",
  },
  category: {
    label: "Categorie",
    value: "category",
    type: "string",
  },
  categoryId: {
    label: "Identifiant Catégorie",
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
).map((prop) => prop);

export const operatorsOptions: Array<OptionProps> = Object.values(
  operators,
).map(({ label, value }) => ({
  label,
  value,
}));

const renderOperatorsOptionsMap = {
  string: ["eq", "ne"],
  boolean: ["eq"],
  number: ["eq", "ne", "gt", "it"],
};

export const renderOperatorsOptions = (
  type: "string" | "boolean" | "number",
) => {
  return operatorsOptions?.filter((operatorsOption) => {
    return renderOperatorsOptionsMap[type].some(
      (o) => o === operatorsOption.value,
    );
  });
};
