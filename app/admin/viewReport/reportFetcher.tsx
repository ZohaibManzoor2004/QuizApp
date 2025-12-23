import React from 'react';
import { db } from "@/lib/db/index";
import { reports } from "@/lib/db/schemas/reportschema";


type Props = {}

export function reportFetcher() {
    const reportData = db.select().from(reports);
    console.log("The reportData fetched in reportFetcher.tsx is : ", reportData);
  return reportData;
}