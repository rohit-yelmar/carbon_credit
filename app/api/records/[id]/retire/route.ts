import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const result = await prisma.$transaction(
      async (tx) => {
        const record = await tx.record.findUnique({
          where: { id },
          include: {
            events: true,
          },
        });

        if (!record) {
          throw new Error("RECORD_NOT_FOUND");
        }

        const isAlreadyRetired = record.events.some(
          (event) => event.event_type === "retired"
        );

        if (isAlreadyRetired) {
          throw new Error("ALREADY_RETIRED");
        }

        const event = await tx.event.create({
          data: {
            record_id: id,
            event_type: "retired",
          },
        });

        return { event };
      },
      {
        isolationLevel: "Serializable", // Key addition!
      }
    );

    return NextResponse.json({
      message: "Record retired successfully",
      event: result.event,
    });
  } catch (error: any) {
    if (error.message === "RECORD_NOT_FOUND") {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }
    if (error.message === "ALREADY_RETIRED") {
      return NextResponse.json(
        { error: "Record is already retired" },
        { status: 400 }
      );
    }
    if (error.code === "P2034") {
      return NextResponse.json(
        { error: "Transaction conflict. Please retry." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
