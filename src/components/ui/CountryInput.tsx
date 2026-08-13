import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { COUNTRIES } from "@/data/countries";
import { useTheme } from "@/theme";

import { Icon } from "./Icon";

/** Image fill style, kept off StyleSheet.create to preserve ImageStyle typing. */
const imageFill = { width: "100%", height: "100%" } as const;

export interface CountryInputProps {
  label?: string;
  error?: string;
  isRequired?: boolean;
  /** 2-letter country code, e.g. "US". */
  value?: string;
  onPress: () => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function CountryInput({
  label,
  error,
  isRequired = false,
  value,
  onPress,
  placeholder = "Select your country",
  containerStyle,
}: CountryInputProps) {
  const { colors, typography, radii } = useTheme();
  const selectedCountry = COUNTRIES.find((c) => c.code === value);

  return (
    <View style={[styles.container, containerStyle]}>
      {!!label && (
        <View style={styles.labelRow}>
          <Text style={[styles.label, { color: colors.text2 }]}>{label}</Text>
          {isRequired && (
            <Text style={[styles.label, { color: colors.clay }]}> *</Text>
          )}
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={
          selectedCountry ? `Country: ${selectedCountry.name}` : placeholder
        }
        style={[
          styles.selector,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.clay : colors.border,
            borderRadius: radii.lg,
          },
        ]}
      >
        <View style={styles.selectorLeft}>
          {selectedCountry ? (
            <>
              <View style={styles.flagFrame}>
                <Image
                  source={{ uri: selectedCountry.flagUrl }}
                  style={imageFill}
                  resizeMode="cover"
                />
              </View>
              <Text
                style={[styles.countryName, { color: colors.text1 }]}
                numberOfLines={1}
              >
                {selectedCountry.name}
              </Text>
            </>
          ) : (
            <Text style={[typography.body, { color: colors.text3 }]}>
              {placeholder}
            </Text>
          )}
        </View>
        <Icon name="chevron-down" size={18} color={colors.text3} />
      </TouchableOpacity>

      {!!error && (
        <View style={styles.errorRow}>
          <Icon name="alert-circle" size={13} color={colors.clay} />
          <Text style={[styles.errorText, { color: colors.clay }]}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 54,
    paddingHorizontal: 16,
    borderWidth: 2,
  },
  selectorLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  flagFrame: {
    width: 28,
    height: 18,
    borderRadius: 3,
    overflow: "hidden",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
    marginTop: 2,
  },
  errorText: {
    fontSize: 13,
    marginLeft: 4,
  },
});
