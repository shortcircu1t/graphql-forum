import { makeExecutableSchema } from "graphql-tools";
import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import * as path from "path";
import * as fs from "fs";
import * as glob from "glob";

export const genSchema = () => {
  const pathToModules = path.join(__dirname, "../modules");
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/schema.?s`)
    .map((schema) => require(schema).schema);
  // .map((x) => fs.readFileSync(x, { encoding: "utf8" }));
  const typeDefs = mergeTypes(graphqlTypes);
  const resolversArr = glob.sync(`${pathToModules}/**/resolvers.?s`);
  const resolvers = resolversArr.map((resolver) => require(resolver).resolvers);
  const mergedResolvers = mergeResolvers(resolvers);
  const schema = makeExecutableSchema({
    resolvers: mergedResolvers,
    typeDefs,
  });
  // console.log(schema);
  // const schema = mergeSchemas({
  //   schemas: graphqlTypes,
  //   resolvers,
  // });

  return schema;
};
