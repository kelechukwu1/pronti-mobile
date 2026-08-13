import {
  createNavigationContainerRef,
  type StackActionHelpers,
} from '@react-navigation/native';

import type { AppStackParamList } from '@/types';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function navigate<RouteName extends keyof AppStackParamList>(
  ...args: RouteName extends unknown
    ? undefined extends AppStackParamList[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: AppStackParamList[RouteName]]
      : [screen: RouteName, params: AppStackParamList[RouteName]]
    : never
): void {
  if (navigationRef.isReady()) {
    // The overload signatures line up with navigationRef.navigate.
    (navigationRef.navigate as (...a: unknown[]) => void)(...args);
  }
}

export function goBack(): void {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export type AppNavigation = StackActionHelpers<AppStackParamList>;
