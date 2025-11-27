import { pgTable, serial, varchar, integer, textArray, text} from "drizzle-orm/pg-core";


export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),        // ← use serial for auto-increment
  question: varchar("question", { length: 500 }).notNull(),
  options: text("options").notNull(),         // JSON string
  correctAnswers: text("correct_answers").notNull(), // JSON string
});
