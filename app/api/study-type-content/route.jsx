import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { chapters, courseId, type } = await req.json();
  const PROMPT =
    type === "Flashcard"
      ? "Generate the flashcard on topic: " +
        chapters +
        " in JSON format with front and back content, Maximum15"
      : type === "Quiz"
      ? "Generate Quiz on topic: " +
        chapters +
        " with questions and options along with the answer in JSON Format, (Max 10)"
      : type === "Question/Answer"
      ? "Generate a detailed Q&A on topic: " +
        chapters +
        " in JSON format with each question and a detailed answer, Maximum10"
      : "Unsupported type"; // Optional fallback to handle unsupported types

  //Insert record to db, update status to generating..
  const result = await db
    .insert(STUDY_TYPE_CONTENT_TABLE)
    .values({
      courseId: courseId,
      type: type,
    })
    .returning({
      id: STUDY_TYPE_CONTENT_TABLE.id,
    });

  //Trigger Inngest Function
  inngest.send({
    name: "studyType.content",
    data: {
      studyType: type,
      prompt: PROMPT,
      courseId: courseId,
      recordId: result[0].id,
    },
  });

  return NextResponse.json(result[0].id);
}
