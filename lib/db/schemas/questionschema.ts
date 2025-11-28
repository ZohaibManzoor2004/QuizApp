import { pgTable, serial, varchar, integer, jsonb, text} from "drizzle-orm/pg-core";


export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),        // ← use serial for auto-increment
  question: varchar("question", { length: 500 }).notNull(),
  options: jsonb("options").notNull(),         // JSON string
  correctAnswers: jsonb("correct_answers").notNull(), // JSON string
});

// import { pgTable, serial, varchar, textArray, text } from "drizzle-orm/pg-core";

// export const questions = pgTable("questions", {
//   id: serial("id").primaryKey(),
//   question: varchar("question", { length: 500 }).notNull(),
//   options: textArray("options").notNull(),          // ← ARRAY ✅
//   correct_answers: textArray("correct_answers").notNull(),  // ← ARRAY ✅
// });

