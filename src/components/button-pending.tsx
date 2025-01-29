"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export const ButtonPending = ({
  children,
  ...props
}: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      className={`button ${pending ? "opacity-60 pointer-events-none" : " "}`}
    >
      {pending ? "Loading..." : children}
    </button>
  );
};
