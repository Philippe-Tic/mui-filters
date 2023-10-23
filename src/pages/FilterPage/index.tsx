"use client";

import { Select } from "@/components/Select";
import { Text } from "@/components/Text";
import { products } from "@/data/products";
import { ProductCard } from "@/pages/FilterPage/_partials";
import { FilterProps, ProductItem } from "@/types/products";
import { propertiesOptions, renderOperatorsOptions } from "@/utils/options";
import { filterProducts } from "@/utils/products";
import {
  Box,
  Button,
  Container,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";

export const FilterPage = () => {
  const [filter, setFilter] = useState<FilterProps>({
    "": ["", { prop: [""] }],
  });

  const fields = {
    operator: Object.keys(filter)[0],
    property: filter[Object.keys(filter)[0]]![1].prop[0],
    value: filter[Object.keys(filter)[0]]![0],
  };

  const { operator, property, value } = fields;

  // Memoized Lists Options
  const memoizedOperatorsOptions = useMemo(() => {
    return renderOperatorsOptions(
      propertiesOptions?.find((prop) => prop.value === property)?.type,
    );
  }, [propertiesOptions, property]);

  const memoizedFilteredProducts = useMemo(
    () => filterProducts(filter),
    [filter],
  );

  const memoizedValueOptions = useMemo(() => {
    return [
      ...new Set(
        products
          .filter((product) =>
            products.some(
              (pr) =>
                pr[property as keyof typeof pr] ===
                product[property as keyof typeof product],
            ),
          )
          .map((product) => product[property as keyof typeof product]),
      ),
    ].map((product) => ({
      label: product?.toString(),
      value: product?.toString(),
    }));
  }, [products, property]);

  const availableOptions = [
    { label: "Disponible", value: "true" },
    { label: "Indisponible", value: "false" },
  ];

  // Handle change for inputs
  const handleChange =
    (field: "property" | "operator" | "value") =>
    (
      event:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>,
    ) => {
      const fieldOptions = {
        property: () => setFilter({ "": ["", { prop: [event.target.value] }] }),
        operator: () =>
          setFilter({
            [event.target.value]: ["", { prop: [fields.property] }],
          }),
        value: () =>
          setFilter({
            [fields.operator]: [
              event.target.value,
              { prop: [fields.property] },
            ],
          }),
      };

      return fieldOptions[field]();
    };

  // Render value input
  const valueComponentKeys = {
    available: "available",
    price: "price",
    title: "title",
    id: "other",
    category: "other",
    categoryId: "other",
    imgLink: "other",
  };

  const renderValueComponent = {
    available: (
      <Select
        label="Valeur"
        options={availableOptions}
        value={value}
        handleChange={handleChange("value")}
        width="100%"
      />
    ),
    price: (
      <TextField
        id="value-input"
        type="number"
        label={propertiesOptions.find((prop) => prop.value === property)?.label}
        value={value}
        onChange={handleChange("value")}
        fullWidth
      />
    ),
    title: (
      <TextField
        id="value-input"
        type="text"
        label={propertiesOptions.find((prop) => prop.value === property)?.label}
        value={value}
        onChange={handleChange("value")}
        fullWidth
      />
    ),
    other: (
      <Select
        label={propertiesOptions.find((prop) => prop.value === property)?.label}
        options={memoizedValueOptions}
        value={value}
        handleChange={handleChange("value")}
        width="100%"
      />
    ),
  };

  return (
    <Container maxWidth="lg">
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography my={2} component="h1" variant="h5">
          Filter Products Page
        </Typography>
        <Button
          onClick={() =>
            setFilter({
              "": ["", { prop: [""] }],
            })
          }
        >
          Reset Filter
        </Button>
      </Box>

      {/* Filters */}
      <Grid container spacing={2}>
        {/* Property */}
        <Grid item xs={12} md={4}>
          <Select
            label="Propriété"
            options={propertiesOptions}
            value={property}
            handleChange={handleChange("property")}
            width="100%"
          />
        </Grid>

        {/* Operator */}
        {property && (
          <Grid item xs={12} md={4}>
            <Select
              label="Opérateur"
              options={memoizedOperatorsOptions}
              value={operator}
              handleChange={handleChange("operator")}
              width="100%"
            />
          </Grid>
        )}

        {/* Value */}
        {property && operator && (
          <Grid item xs={12} md={4}>
            {
              renderValueComponent[
                valueComponentKeys[
                  property as keyof typeof valueComponentKeys
                ] as keyof typeof renderValueComponent
              ]
            }
          </Grid>
        )}
      </Grid>

      {/* Empty State */}
      <Box my={2}>
        {!memoizedFilteredProducts?.length && (
          <Box>
            <Text textAlign="center">Pas de résultat pour ce filtre</Text>
            <Text textAlign="center">¯|_(ツ)_/¯</Text>
          </Box>
        )}

        {/* Render products */}
        {!!memoizedFilteredProducts?.length &&
          memoizedFilteredProducts?.length && (
            <Grid spacing={2} container>
              {memoizedFilteredProducts?.map((product: ProductItem) => (
                <Grid key={product.id} item xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
      </Box>
    </Container>
  );
};
