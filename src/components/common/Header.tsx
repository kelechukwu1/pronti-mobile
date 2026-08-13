import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useTheme } from "@/theme";

import { Icon, type IconName } from "@/components/ui/Icon";

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 } as const;

export interface HeaderAction {
  icon: IconName;
  onPress: () => void;
  accessibilityLabel: string;
  /** Optional element rendered on top of the icon, e.g. a cart Badge. */
  overlay?: React.ReactNode;
}

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  right?: HeaderAction;
  style?: StyleProp<ViewStyle>;
}

export function Header({ title, subtitle, onBack, right, style }: HeaderProps) {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.side}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={HIT_SLOP}
            style={styles.iconButton}
          >
            <Icon name="chevron-left" size={24} color={colors.text1} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleWrap}>
        {!!title && (
          <Text
            style={[typography.h3, { color: colors.text1 }]}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}
        {!!subtitle && (
          <Text
            style={[styles.subtitle, { color: colors.text3 }]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <View style={[styles.side, styles.sideRight]}>
        {right && (
          <TouchableOpacity
            onPress={right.onPress}
            accessibilityRole="button"
            accessibilityLabel={right.accessibilityLabel}
            hitSlop={HIT_SLOP}
            style={styles.iconButton}
          >
            <Icon name={right.icon} size={24} color={colors.text1} />
            {right.overlay && <View style={styles.overlay}>{right.overlay}</View>}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
    paddingVertical: 8,
  },
  side: {
    width: 44,
    justifyContent: "center",
  },
  sideRight: {
    alignItems: "flex-end",
  },
  titleWrap: {
    flex: 1,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 2,
    right: 2,
  },
});
