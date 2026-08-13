import React, { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

import { ErrorBoundary, Toast } from "../components";
import { apolloClient } from "../services/apollo";
import { store } from "../store";
import { ThemeProvider } from "../theme";
import { hydrateToken, getToken } from "../utils/token";
import { restoreSession, completeRestoreSession } from "../store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hydrateCart } from "../store/slices/cartSlice";

interface RootProvidersProps {
  children: React.ReactNode;
}

export function RootProviders({ children }: RootProvidersProps) {
  // Load any persisted auth token into memory on boot so the Apollo auth link
  // can attach it synchronously.
  useEffect(() => {
    hydrateToken().then(() => {
      const token = getToken();
      if (token) {
        store.dispatch(restoreSession());
      } else {
        store.dispatch(completeRestoreSession());
      }
    });

    AsyncStorage.getItem("@pronti/cart-items").then((storedCart) => {
      try {
        const items = storedCart ? JSON.parse(storedCart) : [];
        store.dispatch(hydrateCart(Array.isArray(items) ? items : []));
      } catch {
        store.dispatch(hydrateCart([]));
      }
    });
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <ApolloProvider client={apolloClient}>
            {children}
            <Toast />
          </ApolloProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
