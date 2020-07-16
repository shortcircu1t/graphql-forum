import { SchemaLink } from "apollo-link-schema";
import { makeExecutableSchema } from "graphql-tools";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import cookie from "cookie";
import {
  IS_PRODUCTION,
  PROD_ENDPOINT,
  DEV_ENDPOINT,
} from "../config/constants";

function parseCookies(req?: any, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
}

export default function createIsomorphLink(ctx) {
  if (typeof window === "undefined") {
    const resolversObj = require("./resolversImports");
    const typeDefsObj = require("./typeDefsImports");
    const { mergeTypes, mergeResolvers } = require("merge-graphql-schemas");
    const { associateModels } = require("../server/utils/associateModels");
    associateModels();
    let resolversArr: any[] = [];
    for (let i = 0; i < Object.keys(resolversObj).length; i++) {
      const key = Object.keys(resolversObj)[i];
      resolversArr.push(resolversObj[key]);
    }
    return new SchemaLink({
      schema: makeExecutableSchema({
        typeDefs: mergeTypes(Object.values(typeDefsObj)),
        resolvers: mergeResolvers(resolversArr),
      }),
      context: { session: ctx.req.session },
    });
  } else {
    const authLink = setContext((_, { headers }) => {
      const token = parseCookies(ctx?.req).sid;
      return {
        headers: {
          ...headers,
          cookie: token ? `sid=${token}` : "",
        },
      };
    });
    const httpLink = authLink.concat(
      new HttpLink({
        credentials: "include",
        uri: IS_PRODUCTION
          ? `${PROD_ENDPOINT}/graphql`
          : `${DEV_ENDPOINT}/graphql`,
      })
    );
    return httpLink;
  }
}
