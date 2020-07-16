import prodKeys from "./keys.prod";
import devKeys from "./keys.dev";

let keys = devKeys;

if (process.env.NODE_ENV === "production") {
  keys = prodKeys;
}

export default keys;
