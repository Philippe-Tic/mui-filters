"use client";

import { Select } from "@/components/Select";
import { products } from "@/data/products";
import { ProductCard } from "@/pages/FilterPage/_partials/ProductCard";
import { operatorsOptions, propertiesOptions } from "@/utils/optionsEnum";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";

export const FilterPage = () => {
  const [property, setProperty] = useState<string>("");
  const [operator, setOperator] = useState<string>("");

  const handleChangeProperty = (event: SelectChangeEvent<string>) => {
    setProperty(event.target.value);
  };

  const handleChangeOperator = (event: SelectChangeEvent<string>) => {
    setOperator(event.target.value);
  };

  return (
    <Box px={8} py={4}>
      <Typography component="h1" variant="h4">
        Filter Products Page
      </Typography>
      <Box>
        <Select
          label="Propriété"
          options={propertiesOptions}
          value={property}
          handleChange={handleChangeProperty}
        />
        <Select
          label="Opérateur"
          options={operatorsOptions}
          value={operator}
          handleChange={handleChangeOperator}
        />
        {/* Render last select based on first */}
        {/* <Select
          label="Propriété"
          options={propertiesOptions}
          value={property}
          handleChange={handleChange}
        /> */}
      </Box>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};
