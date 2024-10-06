import { Model } from "objection";
import { Order } from "./Order";

export class Symbol extends Model {
  name!: string;

  static get tableName() {
    return "symbols";
  }

  static get relationMappings() {
    return {
      orders: {
        relation: Model.HasManyRelation,
        modelClass: Order,
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
      required: ["name"],

      properties: {
        name: { type: "string" },
      },
    };
  }
}
