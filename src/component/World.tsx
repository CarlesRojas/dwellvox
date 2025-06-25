import { default as InstanceBlock } from "@/component/Block";
import { getBlockTypeAt } from "@/lib/getBlockTypeAt";
import { vectorToString } from "@/lib/util";
import { BlockProvider } from "@/provider/BlockProvider";
import { useTextures } from "@/provider/TextureProvider";
import { useMemo } from "react";
import { Vector3 } from "three";

const BLOCK_RENDER_DISTANCE = 10;
const SEED = "1234567890";

const World = () => {
    const textures = useTextures();

    const playerPosition = new Vector3(0, 0, 0);

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
        <BlockProvider textures={textures.blockTextures}>
            {blocksToRender.map((block) => (
                <InstanceBlock key={vectorToString(block.position)} {...block} />
            ))}
        </BlockProvider>
    );
};

export default World;
