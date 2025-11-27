import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { questions } from "@/lib/db/schemas/questionschema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Fetch all questions
      const allQuestions = await db.select().from(questions);
      return res.status(200).json(allQuestions);
    }

    if (req.method === "POST") {
      const { question, options, correctAnswers } = req.body;

      if (!question || !options || !correctAnswers) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Insert new question
      const inserted = await db
        .insert(questions)
        .values({ question, options, correctAnswers })
        .returning();

      return res.status(200).json(inserted[0]);
    }

    // Method not allowed
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
