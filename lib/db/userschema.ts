import { pgTable, serial, varchar, uuid } from "drizzle-orm/pg-core";

// export const usersTable = pgTable("users", {
//   id: uuid().primaryKey().defaultRandom(),
//   username: varchar({ length: 255 }).notNull().unique(),
//   password: varchar({ length: 255 }).notNull()
// });

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }),
  password: varchar("password", { length: 255 }),
});
