import { pgTable, serial, int, textArray, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  answers: textArray("answers").notNull(),
  date: timestamp("date").notNull(),
});
