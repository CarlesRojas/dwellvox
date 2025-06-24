import { Vector3 } from "three";

export const vectorToString = (vector: Vector3) => `${vector.x}-${vector.y}-${vector.z}`;
export const stringToVector = (string: string): Vector3 => {
    const [x, y, z] = string.split("-").map(Number);
    return new Vector3(x, y, z);
};
