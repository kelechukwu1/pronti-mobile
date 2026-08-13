import { makeExecutableSchema } from '@graphql-tools/schema';

import { MOCK_PRODUCTS } from '@/constants/products';
import { delay, randomLatency } from '@/services/mock';

import type { GraphQLSchema } from 'graphql';
import type { Product } from '@/types';

/**
 * The `products` resolver simulates network latency so the UI's loading and
 * pull-to-refresh states are exercised.
 */
export const typeDefs = /* GraphQL */ `
  type Product {
    id: ID!
    name: String!
    price: Float!
    image: String!
    description: String
    category: String
    inStock: Boolean!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }
`;

// In-memory catalogue backing the resolvers.
const catalogue: Product[] = [...MOCK_PRODUCTS];

interface ProductArgs {
  id: string;
}

const resolvers = {
  Query: {
    products: async (): Promise<Product[]> => {
      await delay(randomLatency());
      return catalogue;
    },
    product: async (
      _parent: unknown,
      args: ProductArgs,
    ): Promise<Product | null> => {
      await delay(Math.floor(randomLatency() / 2));
      return catalogue.find(p => p.id === args.id) ?? null;
    },
  },
};

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
