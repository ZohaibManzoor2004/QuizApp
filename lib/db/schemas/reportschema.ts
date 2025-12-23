import { pgTable, integer, varchar, text, timestamp , serial} from "drizzle-orm/pg-core";
import { users } from "../../schema/users";
// import { serial } from "drizzle-orm/mysql-core";

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),  // use integer + autoincrement
  answers: text("answers").notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  score: integer("score").notNull(),
  date: timestamp("date").notNull(),
});



// export const reports = pgTable("reports", {
//   id: integer("id").primaryKey(),  // use integer + autoincrement
//   userId: integer("user_id")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   answers: text("answers").notNull(),
//   date: timestamp("date").notNull(),
// });