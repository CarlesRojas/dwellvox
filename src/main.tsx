import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import * as QueryProvider from "./provider/QueryProvider.tsx";

import { routeTree } from "./routeTree.gen";

import "./styles.css";

const router = createRouter({
    routeTree,
    context: { ...QueryProvider.getContext() },
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById("app");

if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <StrictMode>
            <QueryProvider.Provider>
                <RouterProvider router={router} />
            </QueryProvider.Provider>
        </StrictMode>
    );
}
