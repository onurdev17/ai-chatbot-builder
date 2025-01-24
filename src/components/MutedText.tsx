import { cn } from "@/lib/utils";

export default function TypographyMuted({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  return <p className={cn(className, "text-sm text-gray-400")}>{children}</p>;
}
