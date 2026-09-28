import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const EarthCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Camera positioned slightly high to look at the majestic curvature
    camera.position.set(0, 1.8, 8.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Realistic Starfield Background
    const starCount = 1800;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = Math.random() * 40 - 2; // Spread across top and mid
      const z = (Math.random() - 0.5) * 60 - 15;
      starPositions[i * 3] = x;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = z;

      const brightness = 0.7 + Math.random() * 0.3;
      starColors[i * 3] = brightness;
      starColors[i * 3 + 1] = brightness * 0.95;
      starColors[i * 3 + 2] = brightness;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 3. Texture Loader for Real NASA Satellite Earth
    const textureLoader = new THREE.TextureLoader();
    
    // High-resolution real satellite texture
    const earthDayTexture = textureLoader.load('/earth_day.jpg');
    earthDayTexture.colorSpace = THREE.SRGBColorSpace;

    let earthBumpTexture: THREE.Texture | undefined;
    try {
      earthBumpTexture = textureLoader.load('/earth_topology.png');
    } catch {
      // optional
    }

    // 4. Real Earth Mesh (Exact Curvature matching the reference in-flight screen)
    const earthRadius = 6.2;
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 96, 96);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthDayTexture,
      bumpMap: earthBumpTexture,
      bumpScale: 0.04,
      roughness: 0.65,
      metalness: 0.1
    });

    const earthGroup = new THREE.Group();
    // Position Earth so its upper limb curves across the lower screen half
    earthGroup.position.set(0, -4.9, 0);
    // Initial tilt to show Europe/Mediterranean/India exactly like the reference
    earthGroup.rotation.x = 0.42;
    earthGroup.rotation.y = 3.6;

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);
    scene.add(earthGroup);

    // 5. Atmospheric Rim Glow Shader (The electric cyan/blue halo on Earth's curvature)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          gl_FragColor = vec4(0.35, 0.72, 1.0, 1.0) * intensity * 2.2;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });

    const atmosphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(earthRadius + 0.18, 96, 96),
      atmosphereMaterial
    );
    earthGroup.add(atmosphereMesh);

    // 6. Flight / Telemetry Trajectory Arc (Like the glowing white/blue flight line in reference)
    // Connecting London / Europe to Upper Assam Basin / Hong Kong
    const arcPoints: THREE.Vector3[] = [];
    const arcCount = 80;
    // Lat/Long to Vector3 on sphere helper
    const latLongToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const startCoord = { lat: 51.5, lon: -0.1 }; // London
    const endCoord = { lat: 27.5, lon: 94.9 };   // Upper Assam Basin / India

    const pStart = latLongToVector3(startCoord.lat, startCoord.lon, earthRadius + 0.02);
    const pEnd = latLongToVector3(endCoord.lat, endCoord.lon, earthRadius + 0.02);

    for (let i = 0; i <= arcCount; i++) {
      const t = i / arcCount;
      // Spherical linear interpolation with altitude arch
      const v = new THREE.Vector3().lerpVectors(pStart, pEnd, t);
      v.normalize();
      const altitude = (earthRadius + 0.03) + Math.sin(t * Math.PI) * 0.48; // Arcs over the atmosphere
      v.multiplyScalar(altitude);
      arcPoints.push(v);
    }

    const arcCurve = new THREE.CatmullRomCurve3(arcPoints);
    const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcCurve.getPoints(100));
    const arcMaterial = new THREE.LineBasicMaterial({
      color: 0x7cc4ff,
      transparent: true,
      opacity: 0.85,
      linewidth: 2
    });
    const arcLine = new THREE.Line(arcGeometry, arcMaterial);
    earthMesh.add(arcLine);

    // Origin & Destination Waypoint Rings on Earth surface
    const createWaypointRing = (pos: THREE.Vector3, color: number) => {
      const ringGeo = new THREE.RingGeometry(0.06, 0.1, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      return ring;
    };
    earthMesh.add(createWaypointRing(pStart, 0xffffff));
    earthMesh.add(createWaypointRing(pEnd, 0x42d6a4));

    // Animated Plane / Telemetry Node moving along the trajectory (like the airplane in reference)
    const planeGroup = new THREE.Group();
    const planeBody = new THREE.Mesh(
      new THREE.ConeGeometry(0.08, 0.22, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    planeBody.rotation.x = Math.PI / 2;
    planeGroup.add(planeBody);

    // Small glowing wings
    const wingGeo = new THREE.BoxGeometry(0.3, 0.02, 0.08);
    const wingMat = new THREE.MeshBasicMaterial({ color: 0x7cc4ff });
    const wings = new THREE.Mesh(wingGeo, wingMat);
    planeGroup.add(wings);

    earthMesh.add(planeGroup);

    // 7. Lighting: Bright sunlight from top-left, realistic shadows and ocean glow
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    sunLight.position.set(-8, 7, 9);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x0a1835, 1.1);
    scene.add(ambientLight);

    const softRimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    softRimLight.position.set(6, -2, -3);
    scene.add(softRimLight);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.25;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.15;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth real-time planetary rotation
      earthMesh.rotation.y += 0.0012;

      // Animate the airplane / telemetry vehicle along the trajectory arc
      const progress = (time * 0.08) % 1.0;
      const currentPoint = arcCurve.getPoint(progress);
      const nextPoint = arcCurve.getPoint(Math.min(1.0, progress + 0.01));

      planeGroup.position.copy(currentPoint);
      planeGroup.lookAt(nextPoint);

      // Camera parallax
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (1.8 - mouseY * 1.0 - camera.position.y) * 0.04;
      camera.lookAt(0, -0.6, 0);

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};
