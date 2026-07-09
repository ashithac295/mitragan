import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  theme?: "light" | "dark";
}

export default function ThreeBackground({ theme = "dark" }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Configuration based on theme
    const isDark = theme === "dark";
    const particleColor = isDark ? 0xffffff : 0x000000;
    const lineColor = isDark ? 0xffffff : 0x000000;
    const particleOpacity = isDark ? 0.22 : 0.08;
    const lineOpacity = isDark ? 0.08 : 0.04;
    const starCount = 300;
    const constellationCount = 65;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();

    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ROOT GROUP
    const bgGroup = new THREE.Group();
    scene.add(bgGroup);

    // 1. STAR FIELD (Floating dust)
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSpeeds = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      // Scatter in a large 3D area
      starPositions[i * 3] = (Math.random() - 0.5) * 45;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      starSpeeds[i] = 0.01 + Math.random() * 0.02;
    }
    
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.08,
      transparent: true,
      opacity: particleOpacity * 0.7,
      sizeAttenuation: true,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    bgGroup.add(starPoints);

    // 2. CONSTELLATION NETWORK
    const constellationGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(constellationCount * 3);
    const nodeVelocities = new Float32Array(constellationCount * 3);

    for (let i = 0; i < constellationCount; i++) {
      // Main cluster area in the center/middle ground
      nodePositions[i * 3] = (Math.random() - 0.5) * 24;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Slow random velocity vectors
      nodeVelocities[i * 3] = (Math.random() - 0.5) * 0.012;
      nodeVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.012;
      nodeVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }

    constellationGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const constellationMat = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.16,
      transparent: true,
      opacity: particleOpacity,
      sizeAttenuation: true,
    });
    const constellationPoints = new THREE.Points(constellationGeo, constellationMat);
    bgGroup.add(constellationPoints);

    // 3. NEURAL CONNECTIONS (Dynamic Lines)
    // We will dynamically construct lines in the render loop using LineSegments
    const maxConnections = constellationCount * 4;
    const connectionPositions = new Float32Array(maxConnections * 2 * 3); // 2 points per line, 3 coords each
    const connectionColors = new Float32Array(maxConnections * 2 * 4); // RGBA per point
    
    const connectionGeo = new THREE.BufferGeometry();
    connectionGeo.setAttribute("position", new THREE.BufferAttribute(connectionPositions, 3));
    connectionGeo.setAttribute("color", new THREE.BufferAttribute(connectionColors, 4));

    // Custom material supporting vertex colors and transparency
    const connectionMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const connectionLines = new THREE.LineSegments(connectionGeo, connectionMat);
    bgGroup.add(connectionLines);

    // EVENT LISTENERS: MOUSE TRACKING
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    // EVENT LISTENERS: SCROLL TRACKING
    const handleScroll = () => {
      // Normalized scroll coordinate (0 to 1)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      scrollRef.current.targetY = window.scrollY / maxScroll;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

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
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Ease mouse tracking coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Ease scroll tracking depth
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.08;

      // Apply subtle rotational and translation drifts based on mouse and scroll
      bgGroup.rotation.y = elapsedTime * 0.015 + mouseRef.current.x * 0.15;
      bgGroup.rotation.x = mouseRef.current.y * 0.12;
      
      // Translate the group vertically depending on the scroll position
      bgGroup.position.y = scrollRef.current.y * 6;
      bgGroup.position.z = Math.sin(elapsedTime * 0.1) * 2;

      // 1. UPDATE STAR FIELD (Slowly fall/drift)
      const stars = starGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        // Drifts down
        stars[i * 3 + 1] -= starSpeeds[i] * 0.04;
        // Drifts left/right
        stars[i * 3] += Math.sin(elapsedTime + i) * 0.001;

        // Reset if out of bounds
        if (stars[i * 3 + 1] < -25) {
          stars[i * 3 + 1] = 25;
          stars[i * 3] = (Math.random() - 0.5) * 45;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      // 2. UPDATE CONSTELLATION NODES
      const nodes = constellationGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < constellationCount; i++) {
        const idx = i * 3;
        
        // Add random velocity movement
        nodes[idx] += nodeVelocities[idx];
        nodes[idx + 1] += nodeVelocities[idx + 1];
        nodes[idx + 2] += nodeVelocities[idx + 2];

        // Soft boundaries bounce
        if (Math.abs(nodes[idx]) > 14) nodeVelocities[idx] *= -1;
        if (Math.abs(nodes[idx + 1]) > 10) nodeVelocities[idx + 1] *= -1;
        if (Math.abs(nodes[idx + 2]) > 6) nodeVelocities[idx + 2] *= -1;
      }
      constellationGeo.attributes.position.needsUpdate = true;

      // 3. RE-CONSTRUCT DYNAMIC LINES
      const lines = connectionGeo.attributes.position.array as Float32Array;
      const colors = connectionGeo.attributes.color.array as Float32Array;
      let lineIndex = 0;

      // Find nearby nodes to connect
      for (let i = 0; i < constellationCount; i++) {
        for (let j = i + 1; j < constellationCount; j++) {
          const idxA = i * 3;
          const idxB = j * 3;

          const dx = nodes[idxA] - nodes[idxB];
          const dy = nodes[idxA + 1] - nodes[idxB + 1];
          const dz = nodes[idxA + 2] - nodes[idxB + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Connect if they are within a threshold
          if (distance < 5.2 && lineIndex < maxConnections) {
            const lineOffset = lineIndex * 2 * 3;
            const colorOffset = lineIndex * 2 * 4;

            // Start point (Node A)
            lines[lineOffset] = nodes[idxA];
            lines[lineOffset + 1] = nodes[idxA + 1];
            lines[lineOffset + 2] = nodes[idxA + 2];

            // End point (Node B)
            lines[lineOffset + 3] = nodes[idxB];
            lines[lineOffset + 4] = nodes[idxB + 1];
            lines[lineOffset + 5] = nodes[idxB + 2];

            // Opacity falls off with distance
            const alpha = (1 - distance / 5.2) * lineOpacity;

            // Set colors for A and B endpoints
            const r = isDark ? 1.0 : 0.05;
            const g = isDark ? 1.0 : 0.05;
            const b = isDark ? 1.0 : 0.05;

            // Point A Color
            colors[colorOffset] = r;
            colors[colorOffset + 1] = g;
            colors[colorOffset + 2] = b;
            colors[colorOffset + 3] = alpha;

            // Point B Color
            colors[colorOffset + 4] = r;
            colors[colorOffset + 5] = g;
            colors[colorOffset + 6] = b;
            colors[colorOffset + 7] = alpha;

            lineIndex++;
          }
        }
      }

      // Fill remaining connection buffer with zeros to hide unused segments
      const totalElements = maxConnections * 2 * 3;
      for (let i = lineIndex * 2 * 3; i < totalElements; i++) {
        lines[i] = 0;
      }
      
      const totalColorElements = maxConnections * 2 * 4;
      for (let i = lineIndex * 2 * 4; i < totalColorElements; i++) {
        colors[i] = 0;
      }

      connectionGeo.attributes.position.needsUpdate = true;
      connectionGeo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      // Clean up ThreeJS objects from memory
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      constellationGeo.dispose();
      constellationMat.dispose();
      connectionGeo.dispose();
      connectionMat.dispose();
      scene.clear();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden select-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
