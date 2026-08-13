/**
 * Local type declaration for `react-native-vector-icons/Feather`.
 *
 * react-native-vector-icons@10 ships Flow types (`.js.flow`), not `.d.ts`, and the
 * community `@types/react-native-vector-icons` package is deprecated — worse, it
 * transitively pins the obsolete `@types/react-native@0.70`, whose `FlexStyle`
 * lacks `gap` and shadows RN 0.87's own bundled types. We declare the small
 * surface we actually use here instead, so the app relies solely on React
 * Native's first-party types (resolved via the package `exports` map under
 * `moduleResolution: "bundler"`).
 */
declare module "react-native-vector-icons/Feather" {
  import type * as React from "react";
  import type { TextProps } from "react-native";

  export interface FeatherIconProps extends TextProps {
    /** Glyph name from the Feather set (e.g. "shopping-bag", "chevron-left"). */
    name: string;
    size?: number;
    color?: string;
  }

  export default class FeatherIcon extends React.Component<FeatherIconProps> {
    static getImageSource(
      name: string,
      size?: number,
      color?: string,
    ): Promise<{ uri: string; scale: number }>;
    static getImageSourceSync(
      name: string,
      size?: number,
      color?: string,
    ): { uri: string; scale: number };
    static loadFont(file?: string): Promise<void>;
    static hasIcon(name: string): boolean;
  }
}
