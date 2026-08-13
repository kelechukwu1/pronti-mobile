import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/theme";
import { toast, type ToastMessage, type ToastVariant } from "@/services/toast";

import { Icon, type IconName } from "@/components/ui/Icon";

const VISIBLE_MS = 3500;
const FADE_MS = 260;

interface VariantStyle {
  tint: string;
  border: string;
  icon: string;
  iconName: IconName;
}

export function Toast() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState<ToastMessage | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-12)).current;
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: FADE_MS,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -12,
        duration: FADE_MS,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) setCurrent(null);
    });
  }, [opacity, translateY]);

  useEffect(() => {
    const unsubscribe = toast.subscribe((message) => {
      setCurrent(message);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      opacity.setValue(0);
      translateY.setValue(-12);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: FADE_MS,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: FADE_MS,
          useNativeDriver: true,
        }),
      ]).start();
      hideTimer.current = setTimeout(dismiss, VISIBLE_MS);
    });
    return () => {
      unsubscribe();
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [dismiss, opacity, translateY]);

  if (!current) return null;

  const variantStyles: Record<ToastVariant, VariantStyle> = {
    success: {
      tint: colors.sageSoft,
      border: colors.sage,
      icon: colors.sage,
      iconName: "check-circle",
    },
    error: {
      tint: colors.claySoft,
      border: colors.clay,
      icon: colors.clay,
      iconName: "x-circle",
    },
    warning: {
      tint: colors.ochreSoft,
      border: colors.ochre,
      icon: colors.ochre,
      iconName: "alert-circle",
    },
    info: {
      tint: colors.slateSoft,
      border: colors.slate,
      icon: colors.slate,
      iconName: "info",
    },
  };
  const v = variantStyles[current.variant];

  const containerStyle: ViewStyle = {
    top: insets.top + 8,
    backgroundColor: colors.surface,
    borderColor: v.border,
  };

  return (
    <Animated.View
      pointerEvents="box-none"
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      style={[
        styles.container,
        containerStyle,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: v.tint }]}
        pointerEvents="none"
      />
      <Icon name={v.iconName} size={22} color={v.icon} />
      <View style={styles.textWrap}>
        {!!current.title && (
          <Text style={[styles.title, { color: colors.text1 }]}>
            {current.title}
          </Text>
        )}
        {!!current.description && (
          <Text style={[styles.description, { color: colors.text2 }]}>
            {current.description}
          </Text>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  description: {
    fontSize: 13,
    marginTop: 2,
  },
});
