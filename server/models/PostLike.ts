import { Model, DataTypes, HasManyCountAssociationsMixin } from "sequelize";
import { BelongsToGetAssociationMixin } from "sequelize";
import User from "./User";
import sequelize from "./index";

class PostLike extends Model {
  public id!: number;
  public userId!: number;
  public postId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostLike.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    modelName: "postLike",
    tableName: "post_likes",
    sequelize,
  }
);

export default PostLike;
