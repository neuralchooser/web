import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  // Configure marked options
  const htmlContent = marked.parse(content, {
    gfm: true,
    breaks: true,
  }) as string;

  // Sanitize the HTML to prevent XSS
  const sanitizedHtml = DOMPurify.sanitize(htmlContent, {
    ADD_ATTR: ["target", "rel"],
  });

  return (
    <div
      className="prose dark:prose-invert max-w-none 
        [&>p]:my-4 [&>p]:leading-7 [&>p]:text-muted-foreground
        [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:tracking-tight [&>h1]:text-foreground
        [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:text-foreground
        [&>h3]:mt-6 [&>h3]:mb-2 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:tracking-tight [&>h3]:text-foreground
        [&>ul]:my-4 [&>ul]:ml-6 [&>ul]:list-disc [&>ul]:text-muted-foreground [&>ul_li]:mt-2
        [&>ol]:my-4 [&>ol]:ml-6 [&>ol]:list-decimal [&>ol]:text-muted-foreground [&>ol_li]:mt-2
        [&>blockquote]:my-6 [&>blockquote]:border-l-4 [&>blockquote]:border-border [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground
        [&>pre]:my-6 [&>pre]:overflow-x-auto [&>pre]:rounded-lg [&>pre]:border [&>pre]:border-border [&>pre]:bg-muted/30 [&>pre]:p-4 [&>pre_code]:text-sm
        [&>code]:rounded [&>code]:bg-muted/40 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:text-sm [&>code]:font-mono [&>code]:text-foreground
        [&>a]:font-medium [&>a]:text-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a]:transition-colors hover:[&>a]:text-primary"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
