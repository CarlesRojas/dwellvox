import { useTextures } from "@/provider/TextureProvider";
import { useMemo } from "react";
import type { Texture, Vector3 } from "three";
import * as THREE from "three";

export enum BlockType {
    DIRT = "DIRT",
    STONE = "STONE",
}

interface BlockProps {
    type: BlockType;
    position: Vector3;
}

interface BlockTexture {
    right: Texture;
    left: Texture;
    top: Texture;
    bottom: Texture;
    front: Texture;
    back: Texture;
}
const BlockTextureOrder = ["right", "left", "top", "bottom", "front", "back"];

const Block = ({ type, position }: BlockProps) => {
    const textures = useTextures();

    const BlockTypeTextureMap: Record<BlockType, BlockTexture> = useMemo(
        () => ({
            [BlockType.DIRT]: {
                top: textures.block_dirt,
                bottom: textures.block_dirt,
                left: textures.block_dirt,
                right: textures.block_dirt,
                front: textures.block_dirt,
                back: textures.block_dirt,
            },
            [BlockType.STONE]: {
                top: textures.block_stone,
                bottom: textures.block_stone,
                left: textures.block_stone,
                right: textures.block_stone,
                front: textures.block_stone,
                back: textures.block_stone,
            },
        }),
        [textures]
    );

    const materials = useMemo(
        () =>
            Object.entries(BlockTypeTextureMap[type])
                .sort((a, b) => BlockTextureOrder.indexOf(a[0]) - BlockTextureOrder.indexOf(b[0]))
                .map(([_, texture]) => new THREE.MeshStandardMaterial({ map: texture })),
        [BlockTypeTextureMap, type]
    );

    return (
        <mesh position={position} material={materials} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
        </mesh>
    );
};

export default Block;
