import React, { useCallback } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NetworkStatus, useQuery } from "@apollo/client";

import {
  Badge,
  EmptyState,
  ErrorState,
  Icon,
  LoadingState,
  ProductCard,
  Screen,
} from "@/components";
import { MESSAGES } from "@/constants/messages";
import { GET_PRODUCTS } from "@/graphql/queries/products";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartItemCount, selectCartItems } from "@/store/selectors";
import { logout } from "@/store/slices/authSlice";
import { addItem, incrementQty, decrementQty } from "@/store/slices/cartSlice";
import { clearToken } from "@/utils/token";
import { toast } from "@/services/toast";
import { useTheme } from "@/theme";

import type { AppStackScreenProps, Product } from "@/types";

export function DashboardScreen() {
  const navigation =
    useNavigation<AppStackScreenProps<"Dashboard">["navigation"]>();
  const { colors, typography } = useTheme();
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();

  const cartItems = useAppSelector(selectCartItems);
  const cartCount = useAppSelector(selectCartItemCount);

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_PRODUCTS,
    { notifyOnNetworkStatusChange: true },
  );

  const numColumns = width >= 700 ? 3 : 2;
  const products = data?.products ?? [];
  const isInitialLoading = loading && networkStatus === NetworkStatus.loading;
  const isRefetching = networkStatus === NetworkStatus.refetch;

  const quantityFor = useCallback(
    (id: string) => cartItems.find((i) => i.id === id)?.quantity ?? 0,
    [cartItems],
  );

  const handleAdd = useCallback(
    (product: Product) => {
      dispatch(addItem(product));
      toast.success(MESSAGES.dashboard.addedToCart, product.name);
    },
    [dispatch],
  );

  const handleIncrement = useCallback(
    (id: string) => {
      dispatch(incrementQty(id));
    },
    [dispatch],
  );

  const handleDecrement = useCallback(
    (id: string) => {
      dispatch(decrementQty(id));
    },
    [dispatch],
  );

  const handleLogout = useCallback(() => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            clearToken();
            dispatch(logout());
          },
        },
      ],
    );
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <View style={styles.cell}>
        <ProductCard
          product={item}
          onAddToCart={handleAdd}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          quantityInCart={quantityFor(item.id)}
        />
      </View>
    ),
    [handleAdd, handleIncrement, handleDecrement, quantityFor],
  );

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <Text style={[typography.eyebrow, { color: colors.text3 }]}>
        DISCOVER
      </Text>
      <Text style={[typography.h1, { color: colors.text1 }]}>Products</Text>
    </View>
  );

  let body: React.ReactNode;
  if (isInitialLoading) {
    body = (
      <View style={styles.stateWrap}>
        {renderHeader()}
        <LoadingState variant="grid" count={6} />
      </View>
    );
  } else if (error && products.length === 0) {
    body = <ErrorState onRetry={() => refetch()} />;
  } else if (products.length === 0) {
    body = (
      <EmptyState
        title={MESSAGES.dashboard.empty}
        subtitle="Check back soon — new items are on the way."
      />
    );
  } else {
    body = (
      <FlatList
        key={`grid-${numColumns}`}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={11}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetch();
            }}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      />
    );
  }

  return (
    <Screen edges={["top"]} padded={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Log out"
          hitSlop={HIT_SLOP}
          style={styles.headerButton}
        >
          <Icon name="log-out" size={22} color={colors.text2} />
        </TouchableOpacity>

        <Text style={[typography.h3, { color: colors.text1 }]}>Pronti</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          accessibilityRole="button"
          accessibilityLabel={`Cart, ${cartCount} items`}
          hitSlop={HIT_SLOP}
          style={styles.headerButton}
        >
          <Icon name="shopping-bag" size={22} color={colors.text1} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Badge count={cartCount} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.body}>{body}</View>
    </Screen>
  );
}

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 } as const;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 52,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
  },
  body: {
    flex: 1,
  },
  listHeader: {
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  cell: {
    flex: 1,
    marginBottom: 16,
  },
  stateWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  columnWrapper: {
    gap: 16
  }
});
