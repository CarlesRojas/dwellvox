import LoadingBar from "@/component/LoadingBar";
import { BlockType } from "@/type/BlockType";
import { useLoader } from "@react-three/fiber";
import { type ReactNode, Suspense, createContext, useContext, useMemo } from "react";
import * as THREE from "three";

const useLoadTextures = () => {
    const [block_dirt, block_stone] = useLoader(THREE.TextureLoader, [
        "src/asset/block/dirt.png",
        "src/asset/block/stone.png",
    ]);

    const textures = useMemo(() => ({ block_dirt, block_stone }), [block_dirt, block_stone]);

    const nearestTextures = useMemo(
        () =>
            Object.fromEntries(
                Object.entries(textures).map(([key, texture]) => {
                    texture.magFilter = THREE.NearestFilter;
                    texture.minFilter = THREE.NearestFilter;
                    return [key, texture];
                })
            ),
        [textures]
    );

    return nearestTextures;
};

interface TextureContextType extends ReturnType<typeof useLoadTextures> {}

const TextureContext = createContext<TextureContextType | undefined>(undefined);

export const useTextures = () => {
    const context = useContext(TextureContext);
    if (!context) throw new Error("useTextures must be used within a TextureProvider");

    const blockTextures: Record<BlockType, THREE.Texture> = useMemo(
        () => ({
            [BlockType.DIRT]: context.block_dirt,
            [BlockType.STONE]: context.block_stone,
        }),
        [context]
    );

    return {
        blockTextures,
        context,
    };
};

export const TextureProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Suspense fallback={<LoadingBar />}>
            <TextureProviderInner>{children}</TextureProviderInner>
        </Suspense>
    );
};

const TextureProviderInner = ({ children }: { children: ReactNode }) => {
    const textures = useLoadTextures();
    return <TextureContext.Provider value={textures}>{children}</TextureContext.Provider>;
};
