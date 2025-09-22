import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateDeterministicId } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { project_name, registry, vintage, quantity, serial_number } = body;

    if (!project_name || !registry || !vintage || !quantity || !serial_number) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const id = generateDeterministicId({
      project_name,
      registry,
      vintage: parseInt(vintage),
      quantity: parseInt(quantity),
      serial_number,
    });

    const existingRecord = await prisma.record.findUnique({
      where: { id },
    });

    if (existingRecord) {
      return NextResponse.json(
        { error: "Record with this combination already exists", id },
        { status: 409 }
      );
    }

    const existingSerial = await prisma.record.findUnique({
      where: { serial_number },
    });

    if (existingSerial) {
      return NextResponse.json(
        { error: "Serial number already exists" },
        { status: 409 }
      );
    }

    const record = await prisma.record.create({
      data: {
        id,
        project_name,
        registry,
        vintage: parseInt(vintage),
        quantity: parseInt(quantity),
        serial_number,
      },
    });

    await prisma.event.create({
      data: {
        record_id: id,
        event_type: "created",
      },
    });

    return NextResponse.json({ record, id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
