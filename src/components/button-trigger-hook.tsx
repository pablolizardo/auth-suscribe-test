"use client";

import { ReactNode } from "react";

export const ButtonTriggerHook = ({
  children,
  endpoint,
  userId,
}: {
  children: ReactNode;
  endpoint: string;
  userId: string;
}) => {
  const requestCall = async () => {
    await fetch(endpoint, { method: "POST", body: JSON.stringify({ userId }) });
  };
  return (
    <button className="button" onClick={requestCall}>
      {children}
    </button>
  );
};
