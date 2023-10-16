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

export const renderOperatorsOptions = (type?: string) => {
  if (type === "string") {
    return operatorsOptions?.filter((operatorsOption) => {
      return operatorsOption?.value === "eq" || operatorsOption?.value === "ne";
    });
  }
  if (type === "boolean") {
    return operatorsOptions?.filter(
      (operatorsOption) => operatorsOption?.value === "eq",
    );
  }
  return operatorsOptions;
};
