import crypto from "crypto";

export function generateDeterministicId(data: {
  project_name: string;
  registry: string;
  vintage: number;
  quantity: number;
  serial_number: string;
}): string {
  const input = `${data.project_name}-${data.registry}-${data.vintage}-${data.quantity}-${data.serial_number}`;
  return crypto
    .createHash("sha256")
    .update(input)
    .digest("hex")
    .substring(0, 16);
}
