import { default as Player } from "@/component/Player";
import World from "@/component/World";
import { PlayerProvider } from "@/provider/PlayerProvider";
import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game")({
    component: Game,
});

function Game() {
    return (
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 60 }} gl={{ antialias: true }}>
            <Physics>
                <ambientLight intensity={1} />
                <directionalLight
                    castShadow
                    position={[10, 10, 5]}
                    intensity={1}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />

                <PlayerProvider>
                    <World />

                    <Player />
                </PlayerProvider>
            </Physics>

            <Stats />
        </Canvas>
    );
}
