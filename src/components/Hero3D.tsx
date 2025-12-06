import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const AnimatedShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);
  const mesh3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.y = time * 0.2;
    }
    
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x = -time * 0.1;
      mesh2Ref.current.rotation.z = time * 0.15;
    }
    
    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.y = time * 0.25;
      mesh3Ref.current.rotation.z = -time * 0.1;
    }
  });

  return (
    <>
      {/* Main glowing sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={[0, 0, 0]} scale={1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#7fff00"
            emissive="#7fff00"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Cyan ring */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <mesh ref={mesh2Ref} position={[0, 0, 0]} scale={2.5}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Purple accent ring */}
      <Float speed={1} rotationIntensity={0.8} floatIntensity={0.3}>
        <mesh ref={mesh3Ref} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]} scale={3}>
          <torusGeometry args={[1, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#9966ff"
            emissive="#9966ff"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.5}
          floatIntensity={1}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 4,
            ]}
            scale={0.05 + Math.random() * 0.1}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#7fff00" : i % 3 === 1 ? "#00ffff" : "#9966ff"}
              emissive={i % 3 === 0 ? "#7fff00" : i % 3 === 1 ? "#00ffff" : "#9966ff"}
              emissiveIntensity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#7fff00" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
          <pointLight position={[0, 10, -10]} intensity={0.3} color="#9966ff" />
          
          <AnimatedShape />
        </Suspense>
      </Canvas>
    </div>
  );
};
