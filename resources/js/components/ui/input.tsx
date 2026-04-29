import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ 
  className, 
  type, 
  size = "default",
  ...props 
}: React.ComponentProps<"input"> & {
  size?: "sm" | "default" | "lg"
}) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 rounded-md border bg-transparent px-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "data-[size=default]:h-9 data-[size=sm]:h-8 data-[size=lg]:h-12",
        className
      )}
      {...props}
    />
  )
}

export { Input }
