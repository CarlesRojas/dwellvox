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
    const { camera } = useThree();

    const [, getKeys] = useKeyboardControls<Control>();

    useFrame((_, delta) => {
        const { FORWARD, BACK, LEFT, RIGHT } = getKeys();

        if (rigidBodyRef.current) {
            const pos = rigidBodyRef.current.translation();
            camera.position.copy(pos);

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
                position={[0, 0.6, 0]}
                enabledRotations={[false, false, false]}
            >
                {/** args={[halfCapsuleHeight-radius, radius] */}
                <CapsuleCollider args={[0.5, 0.5]} />
            </RigidBody>
        </Fragment>
    );
};

export default Player;
