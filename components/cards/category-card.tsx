import {
  AppWindow,
  BadgeDollarSign,
  Bot,
  Boxes,
  Clapperboard,
  Code2,
  Globe,
  Headset,
  Image,
  LayoutTemplate,
  Megaphone,
  MessageSquareText,
  Music2,
  NotebookPen,
  Presentation,
  SearchCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { PlatformCategory } from "@/types/platform";

const icons: Record<string, { icon: LucideIcon; color: string }> = {
  "text-generation": {
    icon: MessageSquareText,
    color: "from-sky-500 to-cyan-400",
  },
  "image-generation": {
    icon: Image,
    color: "from-fuchsia-500 to-rose-400",
  },
  "video-generation": {
    icon: Clapperboard,
    color: "from-amber-500 to-orange-400",
  },
  coding: {
    icon: Code2,
    color: "from-emerald-500 to-teal-400",
  },
  "app-builder": {
    icon: AppWindow,
    color: "from-green-500 to-emerald-400",
  },
  "website-builder": {
    icon: Globe,
    color: "from-cyan-500 to-blue-400",
  },
  "ui-design": {
    icon: LayoutTemplate,
    color: "from-violet-500 to-fuchsia-400",
  },
  agents: {
    icon: Bot,
    color: "from-indigo-500 to-violet-400",
  },
  automation: {
    icon: Workflow,
    color: "from-orange-500 to-red-400",
  },
  research: {
    icon: SearchCheck,
    color: "from-blue-500 to-indigo-400",
  },
  "lead-generation": {
    icon: Users,
    color: "from-yellow-500 to-amber-400",
  },
  marketing: {
    icon: Megaphone,
    color: "from-pink-500 to-rose-400",
  },
  sales: {
    icon: BadgeDollarSign,
    color: "from-lime-500 to-green-40<PASSWORD>",
  },
  "customer-support": {
    icon: Headset,
    color: "from-sky-5<PASSWORD> to-blue-4<PASSWORD>",
  },
  productivity: {
    icon: NotebookPen,
    color: "from-stone-5<PASSWORD> to-zinc-4<PASSWORD>",
  },
  presentation: {
    icon: Presentation,
    color: "from-rose-500 to-pink-400",
  },
  "data-analysis": {
    icon: Music2,
    color: "from-purple-500 to-violet-400",
  },
  "search-check": {
    icon: SearchCheck,
    color: "from-blue-500 to-indigo-400",
  },
};

export function CategoryCard({
  category,
  count,
}: {
  category: PlatformCategory;
  count?: number;
}) {
  const iconMeta = icons[category.slug] ?? {
    icon: Boxes,
    color: "from-slate-500 to-gray-400",
  };
  const Icon = iconMeta.icon;

  return (
    <Link href={`/categories/${category.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden bg-card/80 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
        <CardContent className="p-5">
          <div
            className={`flex size-11 items-center justify-center rounded-lg bg-gradient-to-br ${iconMeta.color} text-white shadow-sm`}
          >
            <Icon className="size-5" />
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <h3 className="font-semibold tracking-tight">{category.name}</h3>
            {typeof count === "number" ? (
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                {count}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {category.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
