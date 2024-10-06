import { Model } from "objection";

export class Order extends Model {
  private id!: number;
  private name!: string;
  private email!: string;

  static get tableName() {
    return "orders";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        emnail: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}
