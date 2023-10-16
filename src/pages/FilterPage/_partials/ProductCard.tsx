import { Text } from "@/components/Text";
import { ProductItem } from "@/types/products";
import { Box, Card, CardMedia, CardProps } from "@mui/material";
import { FC } from "react";

type ProductCardProps = CardProps & {
  product: ProductItem;
};

export const ProductCard: FC<ProductCardProps> = ({ product, ...rest }) => {
  const { id, available, category, categoryId, imgLink, price, title } =
    product;

  return (
    <Card variant="outlined" {...rest}>
      <CardMedia
        sx={{ objectFit: "contain" }}
        component="img"
        height="194"
        image={imgLink}
        alt={title}
      />
      <Box px={4}>
        <Text>{id}</Text>
        <Text>{available}</Text>
        <Text>{category}</Text>
        <Text>{categoryId}</Text>
        <Text>{price}</Text>
        <Text>{title}</Text>
      </Box>
    </Card>
  );
};
