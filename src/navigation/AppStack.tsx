import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DashboardScreen } from "@/screens/Dashboard/DashboardScreen";
import { CartScreen } from "@/screens/Cart/CartScreen";

import type { AppStackParamList } from "@/types";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
