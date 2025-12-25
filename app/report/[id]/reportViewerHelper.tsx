import { db } from "@/lib/db/index";
import { reports } from "@/lib/db/schemas/reportschema";
import { questions } from "@/lib/db/schemas/questionschema";
import { eq } from 'drizzle-orm';

// import { ReportRead } from "../admin/ReportReader";

export async function ReportRead(id: string){
  const ReportID = Number(id);
  const reportData = await db
  .select()
  .from(reports)
  .where(eq(reports.id, ReportID));

  // const reportData = await db.select().from(reports);
  // console.log("The reportData fetched in reportFetcher.tsx is from DB : ", reportData);
  return reportData;
}

export async function QuestionsData(){
    const QuestData = await db.select().from(questions);
    // console.log("The QuestData fetched in QuestionsData.tsx is from DB : ", QuestData);
  return QuestData;
}

