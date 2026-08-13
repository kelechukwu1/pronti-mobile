import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootProviders } from "@/app/RootProviders";
import { RootNavigator } from "@/navigation/RootNavigator";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <RootProviders>
          <RootNavigator />
        </RootProviders>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
