"use client";

import { Select } from "@/components/Select";
import { Text } from "@/components/Text";
import { products } from "@/data/products";
import { ProductCard } from "@/pages/FilterPage/_partials";
import {
  FilterProps,
  OperatorType,
  ProductItem,
  PropertyType,
} from "@/types/products";
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
import { useEffect, useState } from "react";

export const FilterPage = () => {
  const [filter, setFilter] = useState<FilterProps>({});

  // Delete this states, base the filters on the object
  const [property, setProperty] = useState<PropertyType>("");
  const [operator, setOperator] = useState<OperatorType>("");
  const [value, setValue] = useState<string>("");

  // This should be a memo
  const formatedProducts = filterProducts(filter);

  // This will be deleted
  useEffect(() => {
    if (property === "available") setOperator("eq");
    if (property && operator && value) {
      const buildFilters: FilterProps = {
        [operator]: [value, { prop: [property] }],
      };
      setFilter(buildFilters);
    } else {
      setFilter({});
    }
  }, [property, operator, value]);

  // this is an arrow func that return an arrow func
  const handleChange = (
    event: SelectChangeEvent<string>,
    propToAdjust: string,
  ) => {
    if (propToAdjust === "property") {
      setOperator("");
      setValue("");
      setProperty(event.target.value as PropertyType);
    }
    if (propToAdjust === "operator") {
      setOperator(event.target.value);
    }
    if (propToAdjust === "value") {
      console.log(event.target.value);
      setValue(event.target.value);
    }
  };

  const resetFilter = () => {
    setFilter({});
    setProperty("");
    setOperator("");
    setValue("");
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
        <Button onClick={resetFilter}>Reset Filter</Button>
      </Box>

      {/* Filters */}
      <Grid container spacing={2}>
        {/* Property */}
        <Grid item xs={12} md={4}>
          <Select
            label="Propriété"
            options={propertiesOptions}
            value={property}
            handleChange={(event) => handleChange(event, "property")}
            width="100%"
          />
        </Grid>

        {/* Operator */}
        {property && (
          <Grid item xs={12} md={4}>
            <Select
              label="Opérateur"
              options={renderOperatorsOptions(
                propertiesOptions?.find((prop) => prop?.value === property)
                  ?.type,
              )}
              value={operator}
              handleChange={(event) => handleChange(event, "operator")}
              width="100%"
            />
          </Grid>
        )}

        {/* Value */}
        {property && operator && (
          <Grid item xs={12} md={4}>
            {property === "available" ? (
              <Select
                label="Valeur"
                options={[
                  { label: "Disponible", value: "true" },
                  { label: "Indisponible", value: "false" },
                ]}
                value={value}
                handleChange={(event) => handleChange(event, "value")}
                width="100%"
              />
            ) : (
              <>
                {property === "price" || property === "title" ? (
                  <TextField
                    id="value-input"
                    type={property === "price" ? "number" : "text"}
                    label={
                      propertiesOptions.find((prop) => prop.value === property)
                        ?.label
                    }
                    value={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setValue(event.target.value);
                    }}
                    fullWidth
                  />
                ) : (
                  <Select
                    label={
                      propertiesOptions.find((prop) => prop.value === property)
                        ?.label
                    }
                    options={products
                      ?.reduce(
                        (
                          acc: Array<
                            Omit<ProductItem, "available" | "price" | "title">
                          >,
                          cur: ProductItem,
                        ) => {
                          if (
                            acc?.some(
                              (p) =>
                                p[property as keyof typeof p] ===
                                cur[property as keyof typeof p],
                            )
                          ) {
                            return acc;
                          }
                          return [...acc, cur];
                        },
                        [],
                      )
                      ?.map((product) => ({
                        label: product[property as keyof typeof product],
                        value: product[property as keyof typeof product],
                      }))}
                    value={value}
                    handleChange={(event) => handleChange(event, "value")}
                    width="100%"
                  />
                )}
              </>
            )}
          </Grid>
        )}
      </Grid>

      {/* Empty State */}
      <Box my={2}>
        {!formatedProducts?.length && (
          <Box>
            <Text textAlign="center">Pas de résultat pour ce filtre</Text>
            <Text textAlign="center">¯|_(ツ)_/¯</Text>
          </Box>
        )}

        {/* Render products */}
        {!!formatedProducts?.length && formatedProducts?.length && (
          <Grid spacing={2} container>
            {formatedProducts?.map((product: ProductItem) => (
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
