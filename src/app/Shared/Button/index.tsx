import * as React from "react";

const baseButtonClass = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-50";

function getVariantClass(variant?: string) {
  switch (variant) {
    case "destructive":
      return "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60";
    case "outline":
      return "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50";
    case "secondary":
      return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    case "ghost":
      return "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";
    case "link":
      return "text-primary underline-offset-4 hover:underline";
    case "default":
    default:
      return "bg-primary text-primary-foreground hover:bg-primary/90";
  }
}

function getSizeClass(size?: string) {
  switch (size) {
    case "sm":
      return "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5";
    case "lg":
      return "h-10 rounded-md px-6 has-[>svg]:px-4";
    case "icon":
      return "size-9 rounded-md";
    case "default":
    default:
      return "h-9 px-4 py-2 has-[>svg]:px-3";
  }
}

export default function Button({
  className = "",
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> & {
  variant?: string;
  size?: string;
}) {
  const variantClass = getVariantClass(variant);
  const sizeClass = getSizeClass(size);
  const combinedClassName = [baseButtonClass, variantClass, sizeClass, className].filter(Boolean).join(" ");

  return <button className={combinedClassName} {...props} />;
}


