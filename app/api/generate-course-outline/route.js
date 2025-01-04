// import { courseOutlineAIModel } from "@/configs/AiModel";
// import { db } from "@/configs/db";
// import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
// import { inngest } from "@/inngest/client";
// import { NextResponse } from "next/server";
// // export async function POST(req) {
// //   try {
// //     const { courseId, topic, courseType, difficultyLevel, createdBy } =
// //       await req.json();
// //     const PROMPT = `
// //         generate a study material for '${topic}' for '${courseType}'
// //         and level of Difficulty will be '${difficultyLevel}'
// //         with course title, summary of course, List of chapters along with the summary and Emoji icon for each chapter,
// //         Topic list in each chapter in JSON format
// //       `;
// //     // Generate course layout using AI
// //     const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
// //     const aiResult = JSON.parse(aiResp.response.text());
// //     // Save result along with user input
// //     const dbResult = await db
// //       .insert(STUDY_MATERIAL_TABLE)
// //       .values({
// //         courseId: courseId,
// //         courseType: courseType,
// //         difficultyLevel: difficultyLevel,
// //         topic: topic,
// //         createdBy: createdBy,
// //         courseLayout: aiResult,
// //       })
// //       .returning({ resp: STUDY_MATERIAL_TABLE });

// //     //Trriger Inngest function to generate chapter notes
// //     const result = await inngest.send({
// //       name: "notes.generate",
// //       data: {
// //         course: dbResult[0].resp,
// //       },
// //     });
// //     console.log(result);

// //     return NextResponse.json({ result: dbResult[0] });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json(
// //       { error: "Internal Server Error" },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function POST(req) {
//   try {
//     const { courseId, topic, courseType, difficultyLevel, createdBy } =
//       await req.json();

//     if (!courseId || !topic || !courseType || !difficultyLevel || !createdBy) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const PROMPT = `
//         generate a study material for '${topic}' for '${courseType}' 
//         and level of Difficulty will be '${difficultyLevel}' 
//         with course title, summary of course, List of chapters along with the summary and Emoji icon for each chapter, 
//         Topic list in each chapter in JSON format
//       `;

//     // Generate course layout using AI
//     const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
//     const aiResult = JSON.parse(aiResp.response.text());

//     // Save result along with user input
//     const dbResult = await db
//       .insert(STUDY_MATERIAL_TABLE)
//       .values({
//         courseId: courseId,
//         courseType: courseType,
//         difficultyLevel: difficultyLevel,
//         topic: topic,
//         createdBy: createdBy,
//         courseLayout: aiResult,
//       })
//       .returning({ resp: STUDY_MATERIAL_TABLE });

//     console.log("Course created:", dbResult[0].resp);

//     //Trigger Inngest function to generate chapter notes
//     const result = await inngest.send({
//       name: "notes.generate",
//       data: {
//         course: dbResult[0].resp,
//       },
//     });

//     console.log("Inngest function triggered:", result);

//     return NextResponse.json({ result: dbResult[0] });
//   } catch (error) {
//     console.error("Error in generate-course-outline:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: error.message },
//       { status: 500 }
//     );
//   }
// }


import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse request body
    const { courseId, topic, courseType, difficultyLevel, createdBy } =
      await req.json();

    // Validate required fields
    if (!courseId || !topic || !courseType || !difficultyLevel || !createdBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate AI prompt
    const PROMPT = `
        generate a study material for '${topic}' for '${courseType}' 
        and level of Difficulty will be '${difficultyLevel}' 
        with course title, summary of course, List of chapters along with the summary and Emoji icon for each chapter, 
        Topic list in each chapter in JSON format
      `;

    // Generate course layout using AI
    const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
    let aiResult;
    try {
      aiResult = JSON.parse(aiResp.response.text());
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      return NextResponse.json(
        { error: "Failed to generate course layout" },
        { status: 500 }
      );
    }

    // Save result along with user input
    let dbResult;
    try {
      dbResult = await db
        .insert(STUDY_MATERIAL_TABLE)
        .values({
          courseId: courseId,
          courseType: courseType,
          difficultyLevel: difficultyLevel,
          topic: topic,
          createdBy: createdBy,
          courseLayout: aiResult,
        })
        .returning({ resp: STUDY_MATERIAL_TABLE });
    } catch (error) {
      console.error("Database insertion failed:", error);
      return NextResponse.json(
        { error: "Failed to save course layout" },
        { status: 500 }
      );
    }

    console.log("Course created:", dbResult[0].resp);

    // Trigger Inngest function to generate chapter notes
    try {
      const result = await inngest.send({
        name: "notes.generate",
        data: {
          course: dbResult[0].resp,
        },
      });
      console.log("Inngest function triggered:", result);
    } catch (error) {
      console.error("Failed to trigger Inngest function:", error);
    }

    // Return success response
    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("Error in generate-course-outline:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}