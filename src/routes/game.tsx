import Block, { BlockType } from "@/component/Block";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { createFileRoute } from "@tanstack/react-router";
import { Vector3 } from "three";

export const Route = createFileRoute("/game")({
    component: Game,
});

function Game() {
    return (
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 60 }} gl={{ antialias: true }}>
            <ambientLight intensity={0.5} />
            <directionalLight
                castShadow
                position={[10, 10, 5]}
                intensity={0.8}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            <OrbitControls enableDamping />

            <Block type={BlockType.DIRT} position={new Vector3(0, 0, 0)} />
        </Canvas>
    );
}
