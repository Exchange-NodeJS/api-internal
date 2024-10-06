import { Model } from "objection";
import { Order } from "./Order";

export class Symbol extends Model {
  name!: string;

  static get tableName() {
    return "symbols";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: "symbols.name",
          to: "orders.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        name: { type: "string" },
      },
    };
  }
}
