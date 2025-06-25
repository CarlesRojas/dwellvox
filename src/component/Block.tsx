import { useBlockRegistry } from "@/provider/BlockProvider";
import type { BlockType } from "@/type/Block";
import { CuboidCollider } from "@react-three/rapier";
import { useEffect } from "react";
import type { Vector3 } from "three";

interface Props {
    type: BlockType;
    position: Vector3;
}

const InstanceBlock = ({ type, position }: Props) => {
    const { addBlock, removeBlock } = useBlockRegistry();

    useEffect(() => {
        addBlock(type, position);
        return () => {
            removeBlock(type, position);
        };
    }, [addBlock, removeBlock, type, position]);

    return <CuboidCollider position={position} args={[0.5, 0.5, 0.5]} />;
};

export default InstanceBlock;
