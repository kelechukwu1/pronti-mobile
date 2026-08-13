import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/ui/Icon";
import { useTheme } from "@/theme";

const HIT_SLOP = { top: 6, bottom: 6, left: 6, right: 6 } as const;

export interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  itemName?: string;
}

export function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  itemName,
}: QuantityControlProps) {
  const { colors, radii } = useTheme();
  const atMin = quantity <= min;
  const atMax = quantity >= max;
  const suffix = itemName ? ` for ${itemName}` : "";

  return (
    <View
      style={[
        styles.container,
        { borderColor: colors.border, borderRadius: radii.md },
      ]}
    >
      <TouchableOpacity
        onPress={onDecrement}
        accessibilityRole="button"
        accessibilityLabel={
          atMin ? `Remove${suffix}` : `Decrease quantity${suffix}`
        }
        hitSlop={HIT_SLOP}
        style={styles.button}
      >
        <Icon
          name={atMin ? "trash-2" : "minus"}
          size={16}
          color={atMin ? colors.clay : colors.text1}
        />
      </TouchableOpacity>

      <Text
        style={[styles.count, { color: colors.text1 }]}
        accessibilityLabel={`Quantity ${quantity}${suffix}`}
      >
        {quantity}
      </Text>

      <TouchableOpacity
        onPress={onIncrement}
        disabled={atMax}
        accessibilityRole="button"
        accessibilityLabel={`Increase quantity${suffix}`}
        hitSlop={HIT_SLOP}
        style={styles.button}
      >
        <Icon
          name="plus"
          size={16}
          color={atMax ? colors.text3 : colors.text1}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  button: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    minWidth: 28,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
});
