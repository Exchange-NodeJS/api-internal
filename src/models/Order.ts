import { Model, QueryContext } from "objection";
import { User } from "./User";
import { Symbol } from "./Symbol";

export class Order extends Model {
  id!: string;
  user_id!: number;
  action!: "SELL" | "BUY";
  amount!: number;
  price!: number;
  stopPrice!: number;
  takePrice!: number;
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
        relation: Model.BelongsToOneRelation,
        modelClass: Symbol,
        join: {
          from: "orders.pair",
          to: "symbols.name",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "action", "amount", "price", "pair"],

      properties: {
        id: { type: "string" },
        user_id: { type: "integer" },
        action: { type: "string", enum: ["SELL", "BUY"] },
        amount: { type: "number" },
        price: { type: "number" },
        stopLoss: { type: "number" },
        takeProfit: { type: "number" },
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
    const status = this.status == "active" ? "0" : "C";
    this.id = `${status}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
}
