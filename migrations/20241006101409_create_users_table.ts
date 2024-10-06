import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary().unsigned();
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("passSalt").notNullable();
    table.string("city").defaultTo("").notNullable();
    table.integer("zipcode").defaultTo(0).notNullable();
    table.string("country").defaultTo("").notNullable();
    table.string("address").defaultTo("").notNullable();
    table.integer("address_number").defaultTo(0).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
