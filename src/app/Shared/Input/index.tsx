import * as React from "react";

export default function Input({ className = "", type = "text", ...props }: React.ComponentProps<"input">) {
  const baseClasses = "file:text-foreground placeholder:text-muted-foreground border border-input flex h-9 w-full rounded-md px-3 py-1 text-base bg-input-background transition outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:bg-input/30 aria-invalid:border-destructive";

  const combinedClassName = [baseClasses, className].filter(Boolean).join(" ");

  return <input type={type} className={combinedClassName} {...props} />;
}


