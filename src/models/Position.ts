import { Model, QueryContext } from "objection";
import { Order } from "./Order";
import { User } from "./User";

export class Position extends Model {
  id!: string;
  open_order_id!: string;
  user_id!: number;
  action!: "SELL" | "BUY";
  profit!: number;
  status!: "active" | "closed";
  close_order_id!: string | null;

  static get tableName() {
    return "positions";
  }

  static get relationMappings() {
    return {
      openOrder: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: "positions.open_order_id",
          to: "orders.id",
        },
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "positions.user_id",
          to: "users.id",
        },
      },

      closeOrder: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: "positions.close_order_id",
          to: "orders.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["open_order_id", "user_id", "action"],

      properties: {
        id: { type: "integer" },
        open_order_id: { type: "string" },
        user_id: { type: "integer" },
        action: { type: "string", enum: ["SELL", "BUY"] },
        profit: { type: "number" },
        status: {
          type: "string",
          enum: ["active", "closed"],
        },
        close_order_id: { type: "string", nullable: true },
      },
    };
  }

  $beforeInsert(queryContext: QueryContext): Promise<any> | void {
    this.id = `P-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
}
