"use client";

import { Select } from "@/components/Select";
import { Text } from "@/components/Text";
import { products } from "@/data/products";
import { ProductCard } from "@/pages/FilterPage/_partials/ProductCard";
import {
  FilterProps,
  OperatorType,
  ProductItem,
  ProductItems,
  PropertyType,
} from "@/types/products";
import { operatorsOptions, propertiesOptions } from "@/utils/optionsEnum";
import {
  Box,
  Container,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export const FilterPage = () => {
  const [filter, setFilter] = useState<FilterProps>({});
  const [property, setProperty] = useState<PropertyType>("");
  const [operator, setOperator] = useState<OperatorType>("");
  const [value, setValue] = useState<string | undefined>("");

  const renderOperatorsOptions = (type?: string) => {
    if (type === "string") {
      return operatorsOptions?.filter((operatorsOption) => {
        return (
          operatorsOption?.value === "eq" || operatorsOption?.value === "ne"
        );
      });
    }
    if (type === "boolean") {
      return operatorsOptions?.filter(
        (operatorsOption) => operatorsOption?.value === "eq",
      );
    }
    return operatorsOptions;
  };

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
    if (propToAdjust === "value") setValue(event.target.value);
  };

  const formatProducts = () => {
    if (Object.keys(filter).length === 0) return products;

    const formatValue = (value: string | boolean) => {
      if (value === true) return "available";
      if (value === false) return "unavailable";
      return value as string;
    };

    const filtered = products?.reduce((acc, cur: ProductItem) => {
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

  return (
    <Container maxWidth="lg">
      <Typography my={2} component="h1" variant="h5">
        Filter Products Page
      </Typography>
      {/* Export that */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Select
            label="Propriété"
            options={propertiesOptions}
            value={property}
            handleChange={(event) => handleChange(event, "property")}
            width="100%"
          />
        </Grid>
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
        {property && operator && (
          <Grid item xs={12} md={4}>
            {property === "available" ? (
              <Select
                label="Valeur"
                options={[
                  { label: "Disponible", value: "available" },
                  { label: "Indisponible", value: "unavailable" },
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
      <Text mt={2}>
        <code>{JSON.stringify(filter)}</code>
      </Text>
      <Box my={2}>
        <Grid spacing={2} container>
          {formatProducts()?.map((product: ProductItem) => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
