import { Model, ModelOptions, QueryContext } from "objection";
import { hash_password } from "src/lib/security";
import { Balance } from "./Balance";

/**
 * Defines the model for users
 */
export class User extends Model {
  private id!: number;
  private name!: string;
  private email!: string;
  private password!: string;
  private passSalt!: string;

  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
      balance: {
        relation: Model.HasOneRelation,
        modelClass: Balance,
        join: {
          from: "users.id",
          to: "balances.user_id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password", "passSalt"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 6 },
        passSalt: { type: "string" },
      },
    };
  }

  //async $beforeInsert(queryContext: QueryContext): Promise<void> {
  //  const result = hash_password(this.password);
  //
  //  this.passSalt = result[0];
  //  this.password = result[1];
  //}
}
