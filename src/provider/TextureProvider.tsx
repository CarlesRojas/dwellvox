import LoadingBar from "@/component/LoadingBar";
import { useLoader } from "@react-three/fiber";
import { type ReactNode, Suspense, createContext, useContext, useMemo } from "react";
import * as THREE from "three";

const useLoadTextures = () => {
    const [blockDirt] = useLoader(THREE.TextureLoader, ["src/asset/block/dirt.png"]);

    const textures = useMemo(() => ({ blockDirt }), [blockDirt]);

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

    return context;
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
