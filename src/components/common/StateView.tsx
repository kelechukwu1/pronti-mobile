import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useTheme } from "@/theme";

export interface StateViewProps {
  icon: IconName;
  title: string;
  subtitle?: string;
  tone?: "muted" | "accent" | "error";
  actionLabel?: string;
  onAction?: () => void;
}

export function StateView({
  icon,
  title,
  subtitle,
  tone = "muted",
  actionLabel,
  onAction,
}: StateViewProps) {
  const { colors, typography } = useTheme();

  const toneColor =
    tone === "accent"
      ? colors.accent
      : tone === "error"
        ? colors.clay
        : colors.text3;
  const toneSoft =
    tone === "accent"
      ? colors.accentSoft
      : tone === "error"
        ? colors.claySoft
        : colors.surfaceSunken;

  return (
    <View style={styles.container}>
      <View style={[styles.iconDisc, { backgroundColor: toneSoft }]}>
        <Icon name={icon} size={30} color={toneColor} />
      </View>
      <Text style={[typography.h2, styles.title, { color: colors.text1 }]}>
        {title}
      </Text>
      {!!subtitle && (
        <Text style={[typography.body, styles.subtitle, { color: colors.text3 }]}>
          {subtitle}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button
          variant="outline"
          size="sm"
          onPress={onAction}
          style={styles.action}
        >
          {actionLabel}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  iconDisc: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 8,
    maxWidth: 320,
  },
  action: {
    marginTop: 20,
    minWidth: 140,
  },
});
