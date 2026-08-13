import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MESSAGES } from "@/constants/messages";
import { useTheme } from "@/theme";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    if (__DEV__) {
      // Surface details in dev only; users never see stack traces
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback onReset={this.handleReset} />;
    }
    return this.props.children;
  }
}

function ErrorFallback({ onReset }: { onReset: () => void }) {
  const { colors, typography } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.canvas }]}>
      <View style={[styles.iconDisc, { backgroundColor: colors.claySoft }]}>
        <Icon name="alert-triangle" size={30} color={colors.clay} />
      </View>
      <Text style={[typography.h2, styles.title, { color: colors.text1 }]}>
        {MESSAGES.common.somethingWrong}
      </Text>
      <Text style={[typography.body, styles.subtitle, { color: colors.text3 }]}>
        {MESSAGES.common.somethingWrongSubtitle}
      </Text>
      <Button variant="default" onPress={onReset} style={styles.action}>
        {MESSAGES.common.retry}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
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
    marginTop: 24,
    minWidth: 160,
  },
});
