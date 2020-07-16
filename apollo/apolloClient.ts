import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import createIsomorphicLink from "./link";

export default function createApolloClient(
  initialState: NormalizedCacheObject,
  ctx?: any
) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: createIsomorphicLink(ctx),
    cache: new InMemoryCache().restore(initialState),
  });
}
