import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    return (
        <main className="w-full h-full flex items-center justify-center">
            <p className="text-2xl font-bold">Hello</p>
        </main>
    );
}
