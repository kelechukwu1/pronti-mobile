import React from "react";
import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "@/theme";

export type IconName = React.ComponentProps<typeof Feather>["name"];

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: React.ComponentProps<typeof Feather>["style"];
}

export function Icon({ name, size = 20, color, style }: IconProps) {
  const { colors } = useTheme();
  return (
    <Feather name={name} size={size} color={color ?? colors.text1} style={style} />
  );
}
