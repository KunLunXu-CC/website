"use client";

import { FC, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface ReactQueryProps {
  children: ReactNode;
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
  },
});

const ReactQueryProps: FC<ReactQueryProps> = ({ children }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

export default ReactQueryProps;
