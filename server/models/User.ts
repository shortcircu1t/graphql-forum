import { Model, DataTypes, Association } from "sequelize";
import sequelize from "./index";
import Post from "./Post";
import Comment from "./Comment";

class User extends Model {
  public id!: string;
  public username!: string;
  public password!: string;
  public email!: string;
  public confirmed!: boolean;
  public locked!: boolean;
  public avatarUrl!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly comments?: Comment[];
  public readonly posts?: Post[];

  public static associations: {
    posts: Association<User, Post>;
    comments: Association<User, Comment>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: new DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    locked: {
      type: DataTypes.BOOLEAN,
    },
    avatarUrl: {
      type: new DataTypes.STRING(1000),
      allowNull: true,
    },
  },
  {
    modelName: "user",
    tableName: "users",
    sequelize,
  }
);

export default User;
