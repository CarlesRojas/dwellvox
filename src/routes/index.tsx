import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    return (
        <main className="w-full h-full flex items-center justify-center">
            <Link to="/game">Start</Link>
        </main>
    );
}
