import React from "react";
import clsx from "clsx";

export function Label({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={clsx(
        "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
