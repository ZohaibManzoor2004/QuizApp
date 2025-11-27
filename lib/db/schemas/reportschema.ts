import { pgTable, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "../../schema/users";

export const reports = pgTable("reports", {
  id: integer("id").primaryKey(),  // use integer + autoincrement
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  answers: text("answers").notNull(),
  date: timestamp("date").notNull(),
});

