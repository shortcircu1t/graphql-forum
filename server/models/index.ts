import { Sequelize } from "sequelize";
import keys from "../../config/keys";

const {
  database: { username, password, db_name, host },
} = keys;

let sequelize: Sequelize;

if (username && password && db_name && host) {
  sequelize = new Sequelize(db_name, username, password, {
    host,
    dialect: "mysql",
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
    },
  });
} else {
  throw new Error("Database variables missing.");
}

export default sequelize;
