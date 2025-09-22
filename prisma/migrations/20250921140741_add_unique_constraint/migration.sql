/*
  Warnings:

  - A unique constraint covering the columns `[record_id,event_type]` on the table `events` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "events_record_id_event_type_key" ON "public"."events"("record_id", "event_type");
