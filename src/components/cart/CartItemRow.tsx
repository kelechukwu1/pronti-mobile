import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Icon } from "../../components/ui/Icon";
import { useTheme } from "../../theme";
import { formatCurrency } from "../../utils/currency";

import { QuantityControl } from "./QuantityControl";

import type { CartItem } from "../../types";

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 } as const;

/** Image fill style, kept off StyleSheet.create to preserve ImageStyle typing. */
const imageFill = { width: "100%", height: "100%" } as const;

export interface CartItemRowProps {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

function CartItemRowComponent({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemRowProps) {
  const { colors, typography, radii } = useTheme();
  const [imageFailed, setImageFailed] = useState(false);
  const lineTotal = item.price * item.quantity;

  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <View
        style={[
          styles.imageWrap,
          { backgroundColor: colors.surfaceSunken, borderRadius: radii.md },
        ]}
      >
        {imageFailed ? (
          <Icon name="image" size={20} color={colors.text3} />
        ) : (
          <Image
            source={{ uri: item.image }}
            style={imageFill}
            resizeMode="cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </View>

      <View style={styles.details}>
        <Text
          style={[typography.h3, { color: colors.text1 }]}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text style={[styles.unitPrice, { color: colors.text3 }]}>
          {formatCurrency(item.price)} each
        </Text>

        <View style={styles.controlsRow}>
          <QuantityControl
            quantity={item.quantity}
            onIncrement={() => onIncrement(item.id)}
            onDecrement={() => onDecrement(item.id)}
            itemName={item.name}
          />
          <Text style={[typography.h3, { color: colors.text1 }]}>
            {formatCurrency(lineTotal)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onRemove(item.id)}
        accessibilityRole="button"
        accessibilityLabel={`Remove ${item.name} from cart`}
        hitSlop={HIT_SLOP}
        style={styles.removeButton}
      >
        <Icon name="x" size={18} color={colors.text3} />
      </TouchableOpacity>
    </View>
  );
}

export const CartItemRow = React.memo(CartItemRowComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  imageWrap: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginRight: 12,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  unitPrice: {
    fontSize: 13,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  removeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
});
