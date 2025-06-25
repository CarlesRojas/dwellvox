import { usePlayer } from "@/provider/PlayerProvider";
import type { Control } from "@/type/Control";
import { PointerLockControls, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, type RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Fragment, useRef } from "react";
import { Vector3 } from "three";

const SPEED = 10;
const velocity = new Vector3();
const forwardDirectionVector = new Vector3();
const sidewaysDirectionVector = new Vector3();

const Player = () => {
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const currentPosition = useRef(new Vector3());
    const { camera } = useThree();
    const [, getKeys] = useKeyboardControls<Control>();
    const { setPosition } = usePlayer();

    useFrame((_, delta) => {
        const { FORWARD, BACK, LEFT, RIGHT } = getKeys();

        if (rigidBodyRef.current) {
            const pos = rigidBodyRef.current.translation();
            camera.position.copy(pos).add(new Vector3(0, 0.5, 0));
            const newPosition = new Vector3(Math.round(pos.x), Math.floor(pos.y) - 1, Math.round(pos.z));
            if (!newPosition.equals(currentPosition.current)) {
                currentPosition.current = newPosition;
                setPosition(newPosition);
            }

            forwardDirectionVector.set(0, 0, -Number(FORWARD) + Number(BACK));
            sidewaysDirectionVector.set(Number(RIGHT) - Number(LEFT), 0, 0);

            velocity.addVectors(forwardDirectionVector, sidewaysDirectionVector);

            velocity.normalize();

            velocity.multiplyScalar(SPEED);
            velocity.multiplyScalar(delta * 20);

            velocity.applyEuler(camera.rotation);
            rigidBodyRef.current.setLinvel(
                {
                    x: velocity.x,
                    y: rigidBodyRef.current.linvel().y,
                    z: velocity.z,
                },
                true
            );
        }
    });

    return (
        <Fragment>
            <PointerLockControls />

            <RigidBody
                ref={rigidBodyRef}
                colliders={false}
                mass={1}
                friction={0}
                restitution={0}
                position={[0, 1, 0]}
                enabledRotations={[false, false, false]}
            >
                {/** args={[halfCapsuleHeight-radius, radius] */}
                <CapsuleCollider args={[0.5, 0.5]} />
            </RigidBody>
        </Fragment>
    );
};

export default Player;
