import { gql } from '@apollo/client';

import type { TypedDocumentNode } from '@apollo/client';
import type {
  ProductQueryData,
  ProductQueryVars,
  ProductsQueryData,
} from '@/types';

/**
 * These run against the in-memory executable schema via Apollo's SchemaLink — real GraphQL execution,
 * not a REST call faked through Apollo.
 *
 * Typing the documents as `TypedDocumentNode<Data, Vars>` gives `useQuery`
 * full inference for both the result shape and the variables, with no `any`.
 */

/** Fetch the full product catalogue for the Dashboard grid. */
export const GET_PRODUCTS: TypedDocumentNode<
  ProductsQueryData,
  Record<string, never>
> = gql`
  query GetProducts {
    products {
      id
      name
      price
      image
      description
      category
      inStock
    }
  }
`;

/** Fetch a single product by id (reserved for a future detail view). */
export const GET_PRODUCT: TypedDocumentNode<
  ProductQueryData,
  ProductQueryVars
> = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      image
      description
      category
      inStock
    }
  }
`;
