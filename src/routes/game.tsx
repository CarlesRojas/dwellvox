import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game")({
    component: Game,
});

function Game() {
    return (
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 60 }} gl={{ antialias: true }}>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight
                castShadow
                position={[10, 10, 5]}
                intensity={0.8}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            {/* Controls */}
            <OrbitControls enableDamping />

            {/* Environment */}
            <Environment preset="sunset" background />

            {/* Block and Ground */}
            <Block />
            <Ground />
        </Canvas>
    );
}
