import { Model, QueryContext } from "objection";
import { User } from "./User";
import { Symbol } from "./Symbol";

export class Order extends Model {
  id!: string;
  user_id!: number;
  action!: "SELL" | "BUY";
  amount!: number;
  price!: number;
  stopLoss!: number;
  takeProfit!: number;
  pair!: string;
  status!: "active" | "closed";

  static get tableName() {
    return "orders";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "orders.user_id",
          to: "users.id",
        },
      },
      pair: {
        relation: Model.HasOneRelation,
        modelClass: Symbol,
        join: {
          from: "symbols.name",
          to: "orders.pair",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "action", "amount", "price", "pair"],

      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        action: { type: "string", enum: ["SELL", "BUY"] },
        amount: { type: "decimal" },
        price: { type: "decimal" },
        stopLoss: { type: "decimal" },
        takeProfit: { type: "decimal" },
        pair: { type: "string" },
        status: {
          type: "string",
          enum: ["active", "closed"],
        },
      },
    };
  }

  /**
   * Ensures uniqueness for each order
   * @param {QueryContext} queryContext The query context
   */
  $beforeInsert(queryContext: QueryContext): Promise<any> | void {
    this.id = `O-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
}
