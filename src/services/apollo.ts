import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { SchemaLink } from '@apollo/client/link/schema';

import { MESSAGES } from '@/constants/messages';
import { schema } from '@/graphql/schema';
import { toast } from '@/services/toast';
import { getToken } from '@/utils/token';

// authLink — attach a Bearer token, mirroring the reference request interceptor.
const authLink = setContext((_operation, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

// network errors and GraphQL errors get distinct, user-friendly toasts. We never
// expose raw messages/stack traces to the user
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    toast.error(MESSAGES.dashboard.loadFailed);
    if (__DEV__) {
      console.warn('[Apollo] Network error:', networkError.message);
    }
    return;
  }

  if (graphQLErrors && graphQLErrors.length > 0) {
    toast.error(MESSAGES.dashboard.loadFailed);
    if (__DEV__) {
      graphQLErrors.forEach(err =>
        console.warn('[Apollo] GraphQL error:', err.message),
      );
    }
  }
});

const schemaLink = new SchemaLink({ schema });

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, schemaLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      // Serve cache first for snappy navigation; pull-to-refresh calls refetch.
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});
