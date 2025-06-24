import { BlockType } from "@/component/Block";
import { vectorToString } from "@/lib/util";
import seedrandom from "seedrandom";
import type { Vector3 } from "three";

export const getBlockTypeAt = (position: Vector3, seed: string): BlockType | null => {
    const key = `${seed}-${vectorToString(position)}`;

    const random = seedrandom(key);

    if (position.y > 0) return null;
    if (position.y === 0) return BlockType.DIRT;
    if (position.y > -10) return random() > 0.5 ? BlockType.DIRT : BlockType.STONE;
    return BlockType.STONE;
};
