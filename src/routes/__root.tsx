import { KeyboardControlsProvider } from "@/provider/KeyboardControls";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

interface MyRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <KeyboardControlsProvider>
            <Outlet />
        </KeyboardControlsProvider>
    ),
});
