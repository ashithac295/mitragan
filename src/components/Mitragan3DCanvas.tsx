import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, RotateCcw, Sliders, Layers, Activity, Cpu } from "lucide-react";

export type RenderMode = "CRYSTALLINE" | "SWARM" | "WAVE";

export default function Mitragan3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // UI state
  const [mode, setMode] = useState<RenderMode>("CRYSTALLINE");
  const [speed, setSpeed] = useState<number>(1);
  const [complexity, setComplexity] = useState<number>(0.5); // 0.1 to 1.0
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Mouse coords ref (normalized to -1 to +1)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.12);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // ROOT 3D GROUP
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // LIGHTING (minimal monochrome style)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 50);
    pointLight2.position.set(-5, -5, 3);
    scene.add(pointLight2);

    // --- MODE 1: CRYSTALLINE LATTICE ---
    const crystallineGroup = new THREE.Group();
    mainGroup.add(crystallineGroup);

    // Inner Core Geometry
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    crystallineGroup.add(coreMesh);

    // Outer Cage Geometry
    const outerGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    crystallineGroup.add(outerMesh);

    // Node Points at vertices of the outer cage
    const vertexPositions = outerGeo.attributes.position;
    const nodeCount = vertexPositions.count;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount * 3; i++) {
      nodePositions[i] = vertexPositions.array[i];
    }
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.14,
      transparent: true,
      opacity: 0.9,
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMat);
    crystallineGroup.add(nodePoints);

    // Orbiting satelites/constellations
    const satCount = 45;
    const satPositions = new Float32Array(satCount * 3);
    const satVelocities: number[] = [];
    for (let i = 0; i < satCount; i++) {
      const radius = 3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      satPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      satPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      satPositions[i * 3 + 2] = radius * Math.cos(phi);

      satVelocities.push((Math.random() - 0.5) * 0.02);
    }
    const satGeo = new THREE.BufferGeometry();
    satGeo.setAttribute("position", new THREE.BufferAttribute(satPositions, 3));
    const satMat = new THREE.PointsMaterial({
      color: 0xcccccc,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
    });
    const satPoints = new THREE.Points(satGeo, satMat);
    crystallineGroup.add(satPoints);


    // --- MODE 2: QUANTUM SWARM ---
    const swarmGroup = new THREE.Group();
    swarmGroup.visible = false;
    mainGroup.add(swarmGroup);

    const swarmParticleCount = 1500;
    const swarmGeo = new THREE.BufferGeometry();
    const swarmPos = new Float32Array(swarmParticleCount * 3);
    const swarmColors = new Float32Array(swarmParticleCount * 3);

    for (let i = 0; i < swarmParticleCount; i++) {
      // Swirling double helix distribution
      const isHelixA = Math.random() > 0.5;
      const t = (i / swarmParticleCount) * Math.PI * 14; // helix angle
      const r = 0.5 + (i / swarmParticleCount) * 2.8; // spiral outwards
      const offset = isHelixA ? 0 : Math.PI;

      swarmPos[i * 3] = r * Math.cos(t + offset) + (Math.random() - 0.5) * 0.25;
      swarmPos[i * 3 + 1] = (i / swarmParticleCount - 0.5) * 6 + (Math.random() - 0.5) * 0.25;
      swarmPos[i * 3 + 2] = r * Math.sin(t + offset) + (Math.random() - 0.5) * 0.25;

      // Pure monochrome color shade variations
      const intensity = 0.4 + Math.random() * 0.6;
      swarmColors[i * 3] = intensity;
      swarmColors[i * 3 + 1] = intensity;
      swarmColors[i * 3 + 2] = intensity;
    }
    swarmGeo.setAttribute("position", new THREE.BufferAttribute(swarmPos, 3));
    swarmGeo.setAttribute("color", new THREE.BufferAttribute(swarmColors, 3));

    const swarmMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const swarmPoints = new THREE.Points(swarmGeo, swarmMat);
    swarmGroup.add(swarmPoints);


    // --- MODE 3: WAVE HARMONICS ---
    const waveGroup = new THREE.Group();
    waveGroup.visible = false;
    mainGroup.add(waveGroup);

    const waveGridSize = 28;
    const waveGeo = new THREE.PlaneGeometry(6, 6, waveGridSize, waveGridSize);
    waveGeo.rotateX(-Math.PI / 2); // Lay flat horizontally
    const waveMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
    });
    const wavePoints = new THREE.Points(waveGeo, waveMat);
    waveGroup.add(wavePoints);

    // Keep backup of original positions for the wave modifier
    const waveOrigPos = waveGeo.attributes.position.clone();


    // MOUSE TRACKING LISTENERS
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // ANIMATION LOOP
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const deltaSpeed = speed * 0.45;

      // Ease the mouse tracking position
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Subtle main group orientation based on mouse coordinates
      mainGroup.rotation.y = mouseRef.current.x * 0.55;
      mainGroup.rotation.x = -mouseRef.current.y * 0.55;

      // Apply visibility according to current mode
      crystallineGroup.visible = mode === "CRYSTALLINE";
      swarmGroup.visible = mode === "SWARM";
      waveGroup.visible = mode === "WAVE";

      // Rotation & updates based on mode
      if (mode === "CRYSTALLINE") {
        if (isRotating) {
          crystallineGroup.rotation.y += 0.005 * speed;
          crystallineGroup.rotation.x += 0.002 * speed;
        }

        // Dynamically rotate core vs outer cage differently
        coreMesh.rotation.y -= 0.008 * speed;
        outerMesh.rotation.y += 0.003 * speed;

        // Wave scale effect based on complexity
        const scaleVal = 1 + Math.sin(elapsedTime * 1.5) * 0.04 * complexity;
        coreMesh.scale.set(scaleVal, scaleVal, scaleVal);

        // Orbiting satellites updating positions
        const positions = satGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < satCount; i++) {
          // Slowly rotate satellite coordinates around Y axis
          const index = i * 3;
          const x = positions[index];
          const z = positions[index + 2];
          const angle = 0.006 * speed * (i % 2 === 0 ? 1 : -1);
          positions[index] = x * Math.cos(angle) - z * Math.sin(angle);
          positions[index + 2] = x * Math.sin(angle) + z * Math.cos(angle);
        }
        satGeo.attributes.position.needsUpdate = true;
      }

      if (mode === "SWARM") {
        if (isRotating) {
          swarmGroup.rotation.y += 0.008 * speed;
        }

        // Swarm particles ripple breathing
        const positions = swarmGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < swarmParticleCount; i++) {
          const index = i * 3;
          // Apply a tiny breathing movement using trigonometry
          const x = positions[index];
          const y = positions[index + 1];
          const z = positions[index + 2];
          const dist = Math.sqrt(x * x + z * z);
          
          positions[index + 1] = y + Math.sin(elapsedTime * 2 + dist) * 0.002 * complexity * speed;
        }
        swarmGeo.attributes.position.needsUpdate = true;
      }

      if (mode === "WAVE") {
        const positions = waveGeo.attributes.position.array as Float32Array;
        const orig = waveOrigPos.array as Float32Array;
        const totalPoints = waveGeo.attributes.position.count;

        for (let i = 0; i < totalPoints; i++) {
          const index = i * 3;
          const originalX = orig[index];
          const originalZ = orig[index + 2];

          // Calculate distance from center to make waves concentric
          const distFromCenter = Math.sqrt(originalX * originalX + originalZ * originalZ);

          // Wave height formula based on distance, time, and complexity
          const waveHeight =
            Math.sin(distFromCenter * (2.0 + complexity * 3.0) - elapsedTime * 3.0 * speed) *
            0.35 *
            complexity;

          // Influence wave peak with cursor distance (tactile interactive wave)
          const cursorDist = Math.sqrt(
            Math.pow(originalX - mouseRef.current.x * 3, 2) +
            Math.pow(originalZ + mouseRef.current.y * 3, 2)
          );
          const cursorInfluence = Math.max(0, 1.2 - cursorDist * 0.35);

          positions[index + 1] = waveHeight + cursorInfluence * 0.5;
        }
        waveGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, [mode, speed, complexity, isRotating]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] md:h-[550px] rounded-3xl bg-[#030303] border border-white/10 overflow-hidden flex flex-col justify-between group shadow-2xl"
    >
      {/* 3D Canvas element */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair z-0" />

      {/* Modern High-End Top Interface HUD */}
      <div className="relative z-10 w-full p-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none select-none bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              Core Renderer Engine
            </h4>
            <p className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">
              System Matrix: WebGL 2.0 • Active
            </p>
          </div>
        </div>

        {/* System parameters feedback */}
        <div className="hidden sm:flex items-center gap-8 text-[10px] font-mono text-gray-400">
          <div>
            <span className="text-gray-600 block text-[9px] uppercase tracking-widest">FPS</span>
            <span>60.0 hz</span>
          </div>
          <div>
            <span className="text-gray-600 block text-[9px] uppercase tracking-widest">Vertices</span>
            <span>
              {mode === "CRYSTALLINE" ? "180" : mode === "SWARM" ? "1,500" : "841"}
            </span>
          </div>
          <div>
            <span className="text-gray-600 block text-[9px] uppercase tracking-widest">Shader Channel</span>
            <span className="text-white">Monochrome Flat</span>
          </div>
        </div>
      </div>

      {/* Interactive HUD HUD overlay bottom-left */}
      <div className="relative z-10 p-6 w-full flex flex-col md:flex-row justify-between items-end md:items-center gap-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto">
        
        {/* Toggle Mode Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-[#0C0C0F] border border-white/5 p-1 rounded-xl">
          <button
            onClick={() => setMode("CRYSTALLINE")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              mode === "CRYSTALLINE"
                ? "bg-white text-black font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> Lattice Cage
          </button>
          <button
            onClick={() => setMode("SWARM")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              mode === "SWARM"
                ? "bg-white text-black font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Swarm Cloud
          </button>
          <button
            onClick={() => setMode("WAVE")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              mode === "WAVE"
                ? "bg-white text-black font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Wave harmonics
          </button>
        </div>

        {/* Sliders & Rotation controls */}
        <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
          {/* Speed slider */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 flex-1 md:flex-initial">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest">Speed:</span>
            <input
              type="range"
              min="0.1"
              max="2.5"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="accent-white h-1 w-20 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-white w-6 text-right">{speed.toFixed(1)}x</span>
          </div>

          {/* Complexity slider */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 flex-1 md:flex-initial">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest">Scale:</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={complexity}
              onChange={(e) => setComplexity(parseFloat(e.target.value))}
              className="accent-white h-1 w-20 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-white w-8 text-right">{(complexity * 100).toFixed(0)}%</span>
          </div>

          {/* Rotate Toggle button */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
              isRotating
                ? "bg-white/10 border-white/20 text-white hover:bg-white/15"
                : "bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/25"
            }`}
            title={isRotating ? "Pause Auto Rotation" : "Play Auto Rotation"}
          >
            {isRotating ? <Sliders className="w-4 h-4 animate-spin-slow" /> : <Play className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
}
