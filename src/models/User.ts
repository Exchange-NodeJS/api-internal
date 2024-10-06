import { Model, ModelOptions, QueryContext } from "objection";
import { hash_password } from "src/lib/security";
import { Balance } from "./Balance";

/**
 * Defines the model for users
 */
export class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  passSalt!: string;
  city!: string;
  zipcode!: number;
  country!: string;
  address!: string;
  address_number!: number;
  balance!: number;

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
      required: ["name", "email", "password"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 8 },
        passSalt: { type: "string" },
        city: { type: "string" },
        zipcode: { type: "integer" },
        country: { type: "string" },
        address: { type: "string" },
        address_number: { type: "integer" },
        balance: { type: "number" },
      },
    };
  }

  /**
   * Hashes the password provided and stores the hashed password and the hash salt
   * @param { QueryContext} queryContext The query context
   */
  $beforeInsert(queryContext: QueryContext): Promise<any> | void {
    const result = hash_password(this.password);

    this.passSalt = result[0];
    this.password = result[1];
  }
}
