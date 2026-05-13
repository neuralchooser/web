import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] w-full max-w-3xl place-items-center px-4 py-20 text-center">
      <div>
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          This route does not exist in the NeuralChooser directory.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/models">Browse models</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
