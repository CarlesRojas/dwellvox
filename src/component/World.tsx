import { default as InstanceBlock, type InstanceBlockProps } from "@/component/Block";
import { getBlockTypeAt } from "@/lib/getBlockTypeAt";
import { vectorToString } from "@/lib/util";
import { BlockProvider } from "@/provider/BlockProvider";
import { usePlayer } from "@/provider/PlayerProvider";
import { useTextures } from "@/provider/TextureProvider";
import { useMemo, useRef } from "react";
import { Vector3 } from "three";

const BLOCK_RENDER_DISTANCE = 10;
const SEED = "1234567890";

const World = () => {
    const textures = useTextures();
    const { position: playerPosition } = usePlayer();
    const worldCache = useRef(new Map<string, InstanceBlockProps>());

    const blocksToRender = useMemo(() => {
        const newBlocks = [];
        const positionsInRange = new Set<string>();

        for (let x = -BLOCK_RENDER_DISTANCE; x < BLOCK_RENDER_DISTANCE; x++) {
            for (let z = -BLOCK_RENDER_DISTANCE; z < BLOCK_RENDER_DISTANCE; z++) {
                for (let y = -BLOCK_RENDER_DISTANCE; y < BLOCK_RENDER_DISTANCE; y++) {
                    const pos = new Vector3(playerPosition.x + x, playerPosition.y + y, playerPosition.z + z);

                    const key = vectorToString(pos);
                    positionsInRange.add(key);

                    let block = worldCache.current.get(key);
                    if (!block) {
                        const blockType = getBlockTypeAt(pos, SEED);
                        if (!blockType) continue;
                        block = { type: blockType, position: pos };
                        worldCache.current.set(key, block);
                    }

                    newBlocks.push(block);
                }
            }
        }

        for (const key of worldCache.current.keys()) if (!positionsInRange.has(key)) worldCache.current.delete(key);

        return newBlocks;
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
