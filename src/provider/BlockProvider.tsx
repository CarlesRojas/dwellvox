import { BlockType } from "@/type/Block";
import { type ReactNode, createContext, useCallback, useContext, useRef } from "react";
import { type InstancedMesh, Object3D, type Texture, type Vector3 } from "three";

type BlockRegistry = {
    [key in BlockType]: Vector3[];
};

const BlockContext = createContext<{
    addBlock: (type: BlockType, position: Vector3) => void;
    removeBlock: (type: BlockType, position: Vector3) => void;
} | null>(null);

export const useBlockRegistry = () => {
    const context = useContext(BlockContext);
    if (!context) throw new Error("useBlockRegistry must be inside <BlockProvider>");
    return context;
};

interface BlockProviderProps {
    textures: Record<BlockType, Texture>;
    children: ReactNode;
}

export const BlockProvider = ({ textures, children }: BlockProviderProps) => {
    const registry = useRef<BlockRegistry>({
        [BlockType.DIRT]: [],
        [BlockType.STONE]: [],
    });

    const meshes = useRef<Record<BlockType, InstancedMesh | null>>({
        [BlockType.DIRT]: null,
        [BlockType.STONE]: null,
    });

    const dummy = new Object3D();
    const updateMatrices = useCallback(
        (type: BlockType) => {
            const mesh = meshes.current[type];
            if (!mesh) return;
            const positions = registry.current[type];
            for (let i = 0; i < positions.length; i++) {
                dummy.position.copy(positions[i]);
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
            }
            mesh.count = positions.length;
            mesh.instanceMatrix.needsUpdate = true;
        },
        [dummy]
    );

    const addBlock = useCallback(
        (type: BlockType, position: Vector3) => {
            const mesh = meshes.current[type];
            if (!mesh) return;
            registry.current[type].push(position);
            updateMatrices(type);
        },
        [updateMatrices]
    );

    const removeBlock = useCallback(
        (type: BlockType, position: Vector3) => {
            const mesh = meshes.current[type];
            if (!mesh) return;
            const index = registry.current[type].findIndex((p) => p.equals(position));
            if (index === -1) return;
            registry.current[type].splice(index, 1);
            updateMatrices(type);
        },
        [updateMatrices]
    );

    return (
        <BlockContext.Provider value={{ addBlock, removeBlock }}>
            {Object.entries(textures).map(([type, texture]) => (
                <instancedMesh
                    key={type}
                    ref={(ref) => {
                        meshes.current[type as BlockType] = ref;
                    }}
                    args={[undefined, undefined, 10000]}
                    castShadow
                    receiveShadow
                    frustumCulled={false}
                >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial map={texture} />
                </instancedMesh>
            ))}
            {children}
        </BlockContext.Provider>
    );
};
