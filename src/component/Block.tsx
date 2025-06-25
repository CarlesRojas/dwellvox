import { useBlockRegistry } from "@/provider/BlockProvider";
import type { BlockType } from "@/type/BlockType";
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

    return null; // does not render anything directly
};

export default InstanceBlock;
