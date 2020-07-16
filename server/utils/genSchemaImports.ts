import { makeExecutableSchema } from "graphql-tools";
import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import * as path from "path";
import * as fs from "fs";
import * as glob from "glob";

(function genSchema() {
  const pathToModules = path.join(__dirname, "../modules");
  const graphqlTypesImports = glob
    .sync(`${pathToModules}/**/schema.?s`)
    .map(
      (schema) =>
        `export {schema as ${
          schema.split("modules")[1].split("/")[2]
        }} from "${schema.slice(0, -3)}"`
    );
  const resolversImports = glob
    .sync(`${pathToModules}/**/resolvers.?s`)
    .map(
      (resolver) =>
        `export {resolvers as ${
          resolver.split("modules")[1].split("/")[2]
        }} from "${resolver.slice(0, -3)}"`
    );
  fs.writeFile(
    path.join(__dirname, "../../apollo/typeDefsImports.ts"),
    graphqlTypesImports.join(";"),
    (err) => {
      console.log("finished");
      // process.exit();
    }
  );
  fs.writeFile(
    path.join(__dirname, "../../apollo/resolversImports.ts"),
    resolversImports.join(";"),
    (err) => {
      console.log("finished");
      // process.exit();
    }
  );
})();
