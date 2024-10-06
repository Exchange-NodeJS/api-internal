import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orders", (table) => {
    table.string("id").primary().notNullable().unique();
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.enu("action", ["SELL", "BUY"]).notNullable();
    table.decimal("amount", 18, 2).notNullable();
    table.decimal("price", 18, 2).notNullable();
    table.decimal("stopPrice", 18, 2);
    table.decimal("takePrice", 18, 2);
    table
      .string("pair")
      .notNullable()
      .references("name")
      .inTable("symbols")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.enu("status", ["active", "closed"]).defaultTo("active");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders");
}
