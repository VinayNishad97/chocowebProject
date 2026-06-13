import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fname: varchar("fname", { length: 100 }).notNull(),
    lname: varchar("lname", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).unique().notNull(),
    provider: varchar("provider", { length: 20 }),
    external_id: varchar("external_id", { length: 100 }).notNull(),
    image: text("image"),
    role: varchar("role", { length: 12 }).notNull().default("customer"),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
});
