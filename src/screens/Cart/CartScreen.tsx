import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Button,
  CartItemRow,
  EmptyState,
  Header,
  Screen,
} from "@/components";
import { MESSAGES } from "@/constants/messages";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItems, selectCartTotals } from "@/store/selectors";
import {
  decrementQty,
  incrementQty,
  removeItem,
} from "@/store/slices/cartSlice";
import { placeOrder } from "@/store/slices/orderSlice";
import { useTheme } from "@/theme";
import { formatCurrency } from "@/utils/currency";

import type { AppStackScreenProps, CartItem } from "@/types";

export function CartScreen() {
  const navigation = useNavigation<AppStackScreenProps<"Cart">["navigation"]>();
  const { colors, typography, radii } = useTheme();
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);
  const totals = useAppSelector(selectCartTotals);
  const placing = useAppSelector((s) => s.order.placing);

  const handleIncrement = useCallback(
    (id: string) => dispatch(incrementQty(id)),
    [dispatch],
  );
  const handleDecrement = useCallback(
    (id: string) => dispatch(decrementQty(id)),
    [dispatch],
  );
  const handleRemove = useCallback(
    (id: string) => dispatch(removeItem(id)),
    [dispatch],
  );

  const handlePlaceOrder = useCallback(() => {
    if (items.length === 0 || placing) return;
    dispatch(placeOrder({ items }));
  }, [dispatch, items, placing]);

  const renderItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <CartItemRow
        item={item}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
      />
    ),
    [handleIncrement, handleDecrement, handleRemove],
  );

  return (
    <Screen edges={["top"]} padded={false}>
      <View style={styles.headerWrap}>
        <Header
          title="Your Cart"
          onBack={() => navigation.goBack()}
        />
      </View>

      {items.length === 0 ? (
        <EmptyState
          title={MESSAGES.cart.empty}
          subtitle={MESSAGES.cart.emptySubtitle}
          actionLabel="Browse products"
          onAction={() => navigation.goBack()}
        />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
          />

          <View
            style={[
              styles.summary,
              {
                backgroundColor: colors.surface,
                borderTopColor: colors.border,
                borderTopLeftRadius: radii.xl,
                borderTopRightRadius: radii.xl,
              },
            ]}
          >
            <SummaryRow
              label="Subtotal"
              value={formatCurrency(totals.subtotal)}
              color={colors.text2}
            />
            <SummaryRow
              label="Tax (10%)"
              value={formatCurrency(totals.tax)}
              color={colors.text2}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.totalRow}>
              <Text style={[typography.h3, { color: colors.text1 }]}>Total</Text>
              <Text style={[typography.h2, { color: colors.text1 }]}>
                {formatCurrency(totals.total)}
              </Text>
            </View>

            <Button
              onPress={handlePlaceOrder}
              loading={placing}
              disabled={placing || items.length === 0}
              style={styles.placeButton}
            >
              {placing ? "Placing order…" : "Place Order"}
            </Button>
          </View>
        </>
      )}
    </Screen>
  );
}

function SummaryRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, { color }]}>{label}</Text>
      <Text style={[styles.summaryValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  summary: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 15,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "500",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  placeButton: {
    marginTop: 4,
  },
});
