import { Text } from "@/components/Text";
import { ProductItem } from "@/types/products";
import { Box, Card, CardProps } from "@mui/material";
import { FC } from "react";

type ProductCardProps = CardProps & {
  product: ProductItem;
};

export const ProductCard: FC<ProductCardProps> = ({ product, ...rest }) => {
  const { id, available, category, categoryId, imgLink, price, title } =
    product;

  return (
    <Card
      variant="outlined"
      sx={{
        paddingX: "1rem",
        paddingY: "1rem",
      }}
      {...rest}
    >
      <Box>
        <Text>{id}</Text>
        <Text>{available}</Text>
        <Text>{category}</Text>
        <Text>{categoryId}</Text>
        <Text>{imgLink}</Text>
        <Text>{price}</Text>
        <Text>{title}</Text>
      </Box>
    </Card>
  );
};
