
import React, { useEffect, useRef } from 'react';
// Fix: Import THREE for 3D robot companion
import * as THREE from 'three';

const GamerRobot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const robotRef = useRef<THREE.Group | null>(null);
  const rightArmRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(180, 180);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00f3ff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Robot Parts
    const robotGroup = new THREE.Group();
    
    // Body
    const bodyGeo = new THREE.BoxGeometry(1.5, 1.8, 1);
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0x1e293b });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    robotGroup.add(body);

    // Head
    const headGeo = new THREE.BoxGeometry(1.2, 1, 0.8);
    const headMat = new THREE.MeshPhongMaterial({ color: 0x334155 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.6;
    robotGroup.add(head);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const eyeMat = new THREE.MeshPhongMaterial({ 
      color: 0x00f3ff, 
      emissive: 0x00f3ff, 
      emissiveIntensity: 2 
    });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.3, 1.6, 0.45);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.3, 1.6, 0.45);
    robotGroup.add(eyeL);
    robotGroup.add(eyeR);

    // Right Arm (Waving Part)
    const rightArmGroup = new THREE.Group();
    const armGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.2);
    const armMat = new THREE.MeshPhongMaterial({ color: 0x1e293b });
    const arm = new THREE.Mesh(armGeo, armMat);
    arm.position.y = -0.6;
    rightArmGroup.add(arm);
    rightArmGroup.position.set(1, 0.6, 0);
    robotGroup.add(rightArmGroup);

    // Left Arm
    const leftArmGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.2);
    const leftArm = new THREE.Mesh(leftArmGeo, armMat);
    leftArm.position.set(-1, 0, 0);
    robotGroup.add(leftArm);

    scene.add(robotGroup);
    
    // Refs for animation
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    robotRef.current = robotGroup;
    rightArmRef.current = rightArmGroup;

    // Events
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.002;
      
      if (robotRef.current) {
        // Idle Bobbing
        robotRef.current.position.y = Math.sin(time) * 0.1;
        
        // Look at mouse
        robotRef.current.rotation.y = THREE.MathUtils.lerp(robotRef.current.rotation.y, mouseRef.current.x * 0.5, 0.1);
        robotRef.current.rotation.x = THREE.MathUtils.lerp(robotRef.current.rotation.x, -mouseRef.current.y * 0.2, 0.1);
      }

      // Waving logic
      const scrollPos = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight - 50;
      
      if (rightArmRef.current) {
        if (scrollPos >= threshold) {
          // Wave
          rightArmRef.current.rotation.z = Math.sin(time * 5) * 0.8 + 1.5;
        } else {
          // Return to side
          rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0, 0.1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      className="fixed bottom-24 right-4 md:right-12 z-[60] pointer-events-none select-none"
      title="Scroll to bottom for a high five!"
    >
      <div ref={containerRef} className="w-[180px] h-[180px]" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-neonCyan uppercase tracking-widest opacity-0 hover:opacity-100 transition-opacity">
        Bot Companion
      </div>
    </div>
  );
};

export default GamerRobot;
