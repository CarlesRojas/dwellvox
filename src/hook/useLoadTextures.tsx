// hooks/useBlockTextures.js
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export const useLoadTextures = () => {
    const [textureTop, textureBottom, textureLeft, textureRight, textureFront, textureBack] = useLoader(
        THREE.TextureLoader,
        [
            "/textures/top.jpg",
            "/textures/bottom.jpg",
            "/textures/left.jpg",
            "/textures/right.jpg",
            "/textures/front.jpg",
            "/textures/back.jpg",
        ]
    );

    return {
        top: textureTop,
        bottom: textureBottom,
        left: textureLeft,
        right: textureRight,
        front: textureFront,
        back: textureBack,
    };
};
