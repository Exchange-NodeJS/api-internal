import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("balances", (table) => {
    table
      .integer("user_id")
      .primary()
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.decimal("balance", 18, 2).notNullable().defaultTo(10000);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {}
