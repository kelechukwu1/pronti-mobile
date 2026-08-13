type Env = 'development' | 'production';

const APP_ENV: Env = __DEV__ ? 'development' : 'production';

interface Environment {
  URL: {
    /** Symbolic URI for the in-memory mock GraphQL transport. */
    GRAPHQL: string;
  };
  /** Simulated latency (ms) applied by the mock resolvers/flows. */
  MOCK: {
    MIN_LATENCY_MS: number;
    MAX_LATENCY_MS: number;
    ORDER_FAILURE_RATE: number;
  };
  ENV: Env;
  isDevelopment: boolean;
  isProduction: boolean;
}

export const ENVIRONMENT: Environment = {
  URL: {
    GRAPHQL: 'pronti://graphql/mock',
  },
  MOCK: {
    MIN_LATENCY_MS: 600,
    MAX_LATENCY_MS: 1400,
    ORDER_FAILURE_RATE: 0.1,
  },
  ENV: APP_ENV,
  isDevelopment: APP_ENV === 'development',
  isProduction: APP_ENV === 'production',
};
