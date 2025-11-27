import { pgTable, serial, varchar, uuid, textArray,text, integer } from "drizzle-orm/pg-core";

//Users Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }),
  password: varchar("password", { length: 255 }),
});

// Questions Schema

// export const questions = pgTable("questions", {
//   id: serial("id").primaryKey(),
//   question: varchar("question", { length: 500 }).notNull(),
//   options: text("options").notNull(),         // JSON string
//   correctAnswers: text("correct_answers").notNull(), // JSON string
// });
