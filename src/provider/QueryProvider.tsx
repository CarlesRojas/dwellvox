import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export function getContext() {
    return { queryClient };
}

interface QueryProviderProps {
    children: ReactNode;
}

export const Provider = ({ children }: QueryProviderProps) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
