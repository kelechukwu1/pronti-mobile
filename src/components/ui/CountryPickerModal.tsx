import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COUNTRIES, type Country } from "@/data/countries";
import { useTheme } from "@/theme";
import { filterCountries } from "@/utils/phone";

import { Icon } from "./Icon";

/** Image fill style, kept off StyleSheet.create to preserve ImageStyle typing. */
const imageFill = { width: "100%", height: "100%" } as const;

export interface CountryPickerModalProps {
  visible: boolean;
  selectedCountryCode?: string;
  onSelect: (country: Country) => void;
  onClose: () => void;
}

export function CountryPickerModal({
  visible,
  selectedCountryCode,
  onSelect,
  onClose,
}: CountryPickerModalProps) {
  const { colors, typography, radii } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(
    () => filterCountries(COUNTRIES, searchQuery),
    [searchQuery],
  );

  const handleSelect = (country: Country) => {
    onSelect(country);
    setSearchQuery("");
    onClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <TouchableOpacity
          style={styles.backdropTouch}
          activeOpacity={1}
          onPress={handleClose}
          accessibilityLabel="Close country picker"
        />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              paddingBottom: insets.bottom + 16,
              borderTopLeftRadius: radii.xl,
              borderTopRightRadius: radii.xl,
            },
          ]}
        >
          <View
            style={[styles.grabber, { backgroundColor: colors.border }]}
          />

          <View style={styles.headerRow}>
            <Text style={[typography.h2, { color: colors.text1 }]}>
              Select Country
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              accessibilityRole="button"
              accessibilityLabel="Close"
              style={[styles.closeButton, { backgroundColor: colors.surfaceSunken }]}
            >
              <Icon name="x" size={18} color={colors.text2} />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.searchRow,
              {
                backgroundColor: colors.canvas,
                borderColor: colors.border,
                borderRadius: radii.md,
              },
            ]}
          >
            <Icon name="search" size={18} color={colors.text3} />
            <TextInput
              placeholder="Search country or code..."
              placeholderTextColor={colors.text3}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={[styles.searchInput, { color: colors.text1 }]}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const isSelected = item.code === selectedCountryCode;
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  style={[styles.countryRow, { borderBottomColor: colors.border }]}
                >
                  <View style={styles.countryFlagFrame}>
                    <Image
                      source={{ uri: item.flagUrl }}
                      style={imageFill}
                      resizeMode="cover"
                    />
                  </View>
                  <Text
                    style={[
                      styles.countryName,
                      { color: isSelected ? colors.accent : colors.text1 },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={[styles.countryDial, { color: colors.text3 }]}>
                    {item.dialCode}
                  </Text>
                  {isSelected && (
                    <Icon name="check" size={18} color={colors.accent} />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  backdropTouch: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheet: {
    maxHeight: "88%",
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  grabber: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  countryFlagFrame: {
    width: 32,
    height: 22,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  countryDial: {
    fontSize: 14,
  },
});
