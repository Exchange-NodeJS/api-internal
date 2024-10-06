import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("positions", (table) => {
    table.string("id").primary().notNullable().unique();
    table
      .string("open_order_id")
      .notNullable()
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.enu("action", ["SELL", "BUY"]).notNullable();
    table.decimal("profit", 18, 2).notNullable().defaultTo(0);
    table.enu("status", ["active", "closed"]).defaultTo("active");
    table
      .string("close_order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("positions");
}
