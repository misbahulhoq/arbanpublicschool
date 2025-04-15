"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

// Custom 3D Scene with Three.js
const ThreeDBackground = () => {
  const mountRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // ScrollY value for animation
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!mountRef.current || isInitialized) return;

    // Initialize scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating shapes
    const shapes = [];
    const colors = [0x4299e1, 0x48bb78, 0x9f7aea, 0xed8936, 0xf56565];

    // Create 15 random geometric shapes
    for (let i = 0; i < 15; i++) {
      let geometry;
      const shapeType = Math.floor(Math.random() * 3);

      switch (shapeType) {
        case 0:
          geometry = new THREE.IcosahedronGeometry(
            Math.random() * 0.5 + 0.5,
            0,
          );
          break;
        case 1:
          geometry = new THREE.OctahedronGeometry(Math.random() * 0.5 + 0.5, 0);
          break;
        case 2:
          geometry = new THREE.TetrahedronGeometry(
            Math.random() * 0.5 + 0.5,
            0,
          );
          break;
      }

      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.7,
        flatShading: true,
      });

      const shape = new THREE.Mesh(geometry, material);

      // Position randomly within view
      shape.position.x = Math.random() * 20 - 10;
      shape.position.y = Math.random() * 20 - 10;
      shape.position.z = Math.random() * 10 - 15;

      // Random rotation speed
      shape.userData = {
        rotationSpeed: {
          x: Math.random() * 0.01 - 0.005,
          y: Math.random() * 0.01 - 0.005,
          z: Math.random() * 0.01 - 0.005,
        },
        floatSpeed: {
          x: Math.random() * 0.01 - 0.005,
          y: Math.random() * 0.01 - 0.005,
          z: Math.random() * 0.005 - 0.0025,
        },
      };

      shapes.push(shape);
      scene.add(shape);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    let scrollOffset = 0;
    const handleScroll = () => {
      scrollOffset = window.scrollY * 0.003;
    };

    window.addEventListener("scroll", handleScroll);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate and move shapes
      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;

        // Add subtle floating movement
        shape.position.x +=
          Math.sin(Date.now() * 0.001) * shape.userData.floatSpeed.x;
        shape.position.y +=
          Math.cos(Date.now() * 0.001) * shape.userData.floatSpeed.y;

        // Scroll-based movement
        shape.position.z = shape.userData.originalZ + scrollOffset;
      });

      // Camera slight movement based on scroll
      camera.position.y = -scrollOffset * 2;
      camera.lookAt(0, -scrollOffset * 2, 0);

      renderer.render(scene, camera);
    };

    // Store original z positions
    shapes.forEach((shape) => {
      shape.userData.originalZ = shape.position.z;
    });

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    animate();
    setIsInitialized(true);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      mountRef.current?.removeChild(renderer.domElement);

      shapes.forEach((shape) => {
        shape.geometry.dispose();
        shape.material.dispose();
      });

      renderer.dispose();
    };
  }, [mountRef, isInitialized]);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

// Animated floating shapes (2D backup or enhancement)
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated shapes */}
      <motion.div
        className="absolute h-40 w-40 rounded-full bg-blue-500 opacity-10"
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{ left: "10%", top: "20%" }}
      />
      <motion.div
        className="absolute h-24 w-24 rounded-full bg-green-500 opacity-10"
        animate={{
          x: [100, 50, 0, 100],
          y: [50, 100, 50, 50],
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        style={{ right: "15%", top: "10%" }}
      />
      <motion.div
        className="absolute h-32 w-32 rounded-full bg-purple-500 opacity-10"
        animate={{
          x: [50, 0, 50, 50],
          y: [0, 50, 100, 0],
        }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        style={{ left: "30%", bottom: "20%" }}
      />
    </div>
  );
};

// Hero section component
export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  // Transform values based on scroll
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.2]);
  const imageY = useTransform(scrollYProgress, [0, 0.1], [0, -30]);
  const buttonX = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Three.js background */}
      <ThreeDBackground />

      {/* 2D animated background (fallback/enhancement) */}
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-between px-4 md:flex-row">
        {/* Text Content */}
        <motion.div
          className="pt-16 text-center md:w-1/2 md:pt-0 md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <motion.h1
            className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Inspiring <span className="text-blue-600">Bright Futures</span>
          </motion.h1>

          <motion.p
            className="mb-8 text-lg text-gray-600 md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Empowering students with knowledge, creativity, and skills for
            tomorrow's challenges.
          </motion.p>

          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ x: buttonX, opacity: buttonOpacity }}
          >
            <motion.button
              className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white shadow-lg transition duration-300 hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
            </motion.button>
            <motion.button
              className="rounded-lg border border-blue-200 bg-white px-8 py-3 font-medium text-blue-600 shadow-lg transition duration-300 hover:bg-blue-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Take a Tour
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Element */}
        <motion.div
          className="mt-12 flex items-center justify-center md:mt-0 md:w-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ y: imageY, scale: imageScale }}
        >
          <div className="relative h-64 w-full max-w-lg">
            <div className="absolute inset-0 animate-pulse rounded-full bg-blue-600 bg-opacity-10"></div>
            <img
              src="/api/placeholder/500/400"
              alt="Students learning"
              className="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 transform rounded-xl object-cover shadow-2xl"
            />

            {/* Floating elements */}
            <motion.div
              className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-lg bg-yellow-400 font-bold text-white shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              <span className="text-2xl">A+</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-white shadow-lg"
              animate={{
                y: [0, 10, 0],
                x: [0, 5, 0, -5, 0],
              }}
              transition={{ repeat: Infinity, duration: 7 }}
            >
              <span className="text-3xl">100%</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform flex-col items-center text-gray-500"
        animate={{
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ opacity: titleOpacity }}
      >
        <p className="mb-2 text-sm">Scroll to explore</p>
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </motion.div>
    </div>
  );
}
