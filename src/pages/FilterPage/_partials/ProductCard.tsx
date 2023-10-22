import { Text } from "@/components/Text";
import { ProductItem } from "@/types/products";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardProps,
  Chip,
} from "@mui/material";
import { FC } from "react";

type ProductCardProps = CardProps & {
  product: ProductItem;
};

export const ProductCard: FC<ProductCardProps> = ({ product, ...rest }) => {
  const { id, available, category, imgLink, price, title } = product;

  const eurPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
      variant="outlined"
      {...rest}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={{
            objectFit: "contain",
          }}
          component="img"
          height="194"
          image={imgLink}
          alt={title}
        />

        <Chip
          sx={{
            position: "absolute",
            bottom: 5,
            right: 15,
            fontWeight: "bold",
          }}
          size="medium"
          color="primary"
          label={eurPrice.format(price)}
        />
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          pb: 0,
        }}
      >
        <Text variant="h6" component="h1" fontWeight="bold">
          {title} <Chip size="small" label={id} variant="outlined" />{" "}
          <Chip size="small" label={category} />
        </Text>
      </CardContent>
      <CardActions>
        <Button disabled={!available} fullWidth variant="contained">
          {available ? `Acheter` : "Non disponible :("}
        </Button>
      </CardActions>
    </Card>
  );
};
