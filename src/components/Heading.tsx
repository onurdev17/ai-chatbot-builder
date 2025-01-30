import { cn } from "@/lib/utils";

export default function Heading({
  className,
  children,
  variant = "primary",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: string;
}) {
  if (variant == "primary") {
    return (
      <h1
        className={cn(className, "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl")}
      >
        {children}
      </h1>
    );
  } else if (variant == "secondary") {
    return (
      <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent">
        {children}
      </h2>
    );
  }
}
