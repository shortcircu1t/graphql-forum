import { Model, DataTypes } from "sequelize";
import sequelize from "./index";

class Category extends Model {
  public id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    modelName: "category",
    tableName: "categories",
    sequelize,
  }
);

export default Category;
