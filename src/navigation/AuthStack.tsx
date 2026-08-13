import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "@/screens/Auth/LoginScreen";
import { OtpScreen } from "@/screens/Auth/OtpScreen";

import type { AuthStackParamList } from "@/types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * The unauthenticated flow: phone entry → OTP.
 * Headers are hidden because each screen renders its own themed header.
 */
export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
    </Stack.Navigator>
  );
}
