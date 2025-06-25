import InstanceBlock from "@/component/Block";
import { getBlockTypeAt } from "@/lib/getBlockTypeAt";
import { vectorToString } from "@/lib/util";
import { BlockProvider } from "@/provider/BlockProvider";
import { useTextures } from "@/provider/TextureProvider";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Vector3 } from "three";

export const Route = createFileRoute("/game")({
    component: Game,
});

const BLOCK_RENDER_DISTANCE = 10;
const SEED = "1234567890";

function Game() {
    const playerPosition = new Vector3(0, 0, 0);
    const textures = useTextures();

    const blocksToRender = useMemo(() => {
        const blocks = [];

        for (let x = playerPosition.x - BLOCK_RENDER_DISTANCE; x < playerPosition.x + BLOCK_RENDER_DISTANCE; x++) {
            for (let z = playerPosition.z - BLOCK_RENDER_DISTANCE; z < playerPosition.z + BLOCK_RENDER_DISTANCE; z++) {
                for (
                    let y = playerPosition.y - BLOCK_RENDER_DISTANCE;
                    y < playerPosition.y + BLOCK_RENDER_DISTANCE;
                    y++
                ) {
                    const position = new Vector3(x, y, z);
                    const blockType = getBlockTypeAt(position, SEED);
                    if (blockType) blocks.push({ type: blockType, position });
                }
            }
        }
        return blocks;
    }, [playerPosition]);

    return (
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 60 }} gl={{ antialias: true }}>
            <ambientLight intensity={1} />
            <directionalLight
                castShadow
                position={[10, 10, 5]}
                intensity={1}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            <OrbitControls enableDamping />

            <BlockProvider textures={textures.blockTextures}>
                {blocksToRender.map((block) => (
                    <InstanceBlock key={vectorToString(block.position)} {...block} />
                ))}
            </BlockProvider>
        </Canvas>
    );
}
