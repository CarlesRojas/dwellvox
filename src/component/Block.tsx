import { useTextures } from "@/provider/TextureProvider";
import { useMemo } from "react";
import type { Texture, Vector3 } from "three";
import * as THREE from "three";

export enum BlockType {
    DIRT = "DIRT",
}

interface BlockProps {
    type: BlockType;
    position: Vector3;
}

const Block = ({ type, position }: BlockProps) => {
    const textures = useTextures();

    const BlockTypeTextureMap: Record<BlockType, Texture> = useMemo(
        () => ({
            [BlockType.DIRT]: textures.blockDirt,
        }),
        [textures]
    );

    const materials = useMemo(
        () => [
            new THREE.MeshStandardMaterial({ map: BlockTypeTextureMap[type] }),
            new THREE.MeshStandardMaterial({ map: BlockTypeTextureMap[type] }),
            new THREE.MeshStandardMaterial({ map: BlockTypeTextureMap[type] }),
            new THREE.MeshStandardMaterial({ map: BlockTypeTextureMap[type] }),
            new THREE.MeshStandardMaterial({ map: BlockTypeTextureMap[type] }),
            new THREE.MeshStandardMaterial({ map: BlockTypeTextureMap[type] }),
        ],
        [BlockTypeTextureMap, type]
    );

    return (
        <mesh position={position} material={materials} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
        </mesh>
    );
};

export default Block;
