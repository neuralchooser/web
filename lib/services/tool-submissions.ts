import { createToolSubmission } from "@/lib/repositories/tool-submissions-repository";
import type { ToolSubmissionInput } from "@/lib/validators/tool-submission-schema";

export async function submitToolService(input: ToolSubmissionInput): Promise<void> {
  await createToolSubmission(input);
}
