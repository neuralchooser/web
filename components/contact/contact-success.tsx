"use client";

import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContactSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-card border border-border/80 rounded-2xl shadow-xl max-w-xl mx-auto space-y-6">
      <div className="p-3 bg-primary/10 rounded-full text-primary">
        <CheckCircle2 className="size-12 animate-in zoom-in duration-300" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Message Received
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
          Thanks for contacting NeuralChooser. Your message has been received and
          we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <Button
        onClick={onReset}
        variant="outline"
        className="w-full sm:w-auto font-medium shadow-sm transition-all hover:scale-[1.02]"
      >
        Send Another Message
      </Button>
    </div>
  );
}
