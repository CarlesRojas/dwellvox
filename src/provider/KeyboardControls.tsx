import { Control } from "@/type/Control";
import { KeyboardControls, type KeyboardControlsEntry } from "@react-three/drei";
import { type ReactNode, useMemo } from "react";

export const KeyboardControlsProvider = ({ children }: { children: ReactNode }) => {
    const map = useMemo<KeyboardControlsEntry<Control>[]>(
        () => [
            { name: Control.FORWARD, keys: ["ArrowUp", "KeyW"] },
            { name: Control.BACK, keys: ["ArrowDown", "KeyS"] },
            { name: Control.LEFT, keys: ["ArrowLeft", "KeyA"] },
            { name: Control.RIGHT, keys: ["ArrowRight", "KeyD"] },
            { name: Control.JUMP, keys: ["Space"] },
            { name: Control.CROUCH, keys: ["ShiftLeft", "ShiftRight"] },
        ],
        []
    );

    return <KeyboardControls map={map}>{children}</KeyboardControls>;
};
