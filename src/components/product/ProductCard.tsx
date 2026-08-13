import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Icon } from "@/components/ui/Icon";
import { MESSAGES } from "@/constants/messages";
import { useTheme } from "@/theme";
import { formatCurrency } from "@/utils/currency";

import type { Product } from "@/types";

/** Image fill style, kept off StyleSheet.create to preserve ImageStyle typing. */
const imageFill = { width: "100%", height: "100%" } as const;

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  quantityInCart?: number;
}

function ProductCardComponent({
  product,
  onAddToCart,
  onIncrement,
  onDecrement,
  quantityInCart = 0,
}: ProductCardProps) {
  const { colors, typography, radii, shadows } = useTheme();
  const [imageFailed, setImageFailed] = useState(false);

  const disabled = !product.inStock;

  return (
    <View
      style={[
        styles.card,
        shadows("elev1"),
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radii.lg,
        },
      ]}
    >
      <View
        style={[
          styles.imageWrap,
          { backgroundColor: colors.surfaceSunken, borderRadius: radii.md },
        ]}
      >
        {imageFailed ? (
          <Icon name="image" size={28} color={colors.text3} />
        ) : (
          <Image
            source={{ uri: product.image }}
            style={imageFill}
            resizeMode="cover"
            onError={() => setImageFailed(true)}
            accessibilityIgnoresInvertColors
          />
        )}
        {disabled && (
          <View style={[styles.outOfStockPill, { backgroundColor: colors.text1 }]}>
            <Text style={[styles.outOfStockText, { color: colors.canvas }]}>
              Out of stock
            </Text>
          </View>
        )}
      </View>

      <Text
        style={[typography.label, styles.name, { color: colors.text1 }]}
        numberOfLines={1}
      >
        {product.name}
      </Text>

      <View style={styles.footer}>
        <Text style={[typography.h3, { color: colors.text1 }]}>
          {formatCurrency(product.price)}
        </Text>

        {quantityInCart > 0 && !disabled ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => onDecrement?.(product.id)}
              accessibilityRole="button"
              accessibilityLabel={`Decrement ${product.name} quantity`}
            >
              <Icon name="minus" size={14} color={colors.text1} />
            </TouchableOpacity>

            <Text style={[styles.quantityText, { color: colors.text1 }]}>
              {quantityInCart}
            </Text>

            <TouchableOpacity
              onPress={() => onIncrement?.(product.id)}
              accessibilityRole="button"
              accessibilityLabel={`Increment ${product.name} quantity`}
            >
              <Icon name="plus" size={14} color={colors.text1} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => onAddToCart(product)}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={
              disabled
                ? MESSAGES.dashboard.outOfStock
                : `Add ${product.name} to cart`
            }
            style={[
              styles.addButton,
              {
                backgroundColor: disabled ? colors.surfaceSunken : colors.surface,
                borderRadius: radii.full,
                borderColor: colors.text2,
                borderWidth: 1,
              },
            ]}
          >
            <Icon
              name="shopping-cart"
              size={18}
              color={disabled ? colors.text3 : colors.text1}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export const ProductCard = React.memo(ProductCardComponent);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  imageWrap: {
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 12,
  },
  outOfStockPill: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    opacity: 0.85,
  },
  outOfStockText: {
    fontSize: 11,
    fontWeight: "600",
  },
  name: {
    minHeight: 42,
    // marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    minWidth: 40,
    height: 40,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  quantityText: {
    fontSize: 15,
    fontWeight: "600",
    minWidth: 16,
    textAlign: "center",
  },
});
