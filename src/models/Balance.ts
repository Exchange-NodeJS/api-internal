import { Model } from "objection";
import { User } from "./User";

/**
 * Defines the model for balances
 */
export class Balance extends Model {
  private id!: number;
  private balance!: number;

  static get tableName() {
    return "balances";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "balances.user_id",
          to: "users.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "balance"],

      properties: {
        user_id: { type: "integer" },
        balance: { type: "decimal" },
      },
    };
  }
}
