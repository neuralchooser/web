"use client";

import * as React from "react";
import { SubmitToolForm } from "@/components/submissions/submit-tool-form";
import { SubmitToolSuccess } from "@/components/submissions/submit-tool-success";
import type { PlatformCategory } from "@/types/platform";
import type { SubmissionActionState } from "@/lib/actions/tool-submission-actions";
import type { ToolSubmissionFormValues } from "@/lib/validators/tool-submission-schema";

interface SubmitFormWrapperProps {
  categories: PlatformCategory[];
  action: (values: ToolSubmissionFormValues) => Promise<SubmissionActionState>;
}

export function SubmitFormWrapper({ categories, action }: SubmitFormWrapperProps) {
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <div className="animate-in fade-in zoom-in duration-300">
        <SubmitToolSuccess onReset={() => setSubmitted(false)} />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <SubmitToolForm
        categories={categories}
        action={action}
        onSuccess={() => setSubmitted(true)}
      />
    </div>
  );
}
