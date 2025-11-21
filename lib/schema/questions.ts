import { pgTable, serial, varchar, textArray } from "drizzle-orm/pg-core";

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 500 }).notNull(),
  options: textArray("options").notNull(),
  correctAnswers: textArray("correct_answers").notNull(),
});
