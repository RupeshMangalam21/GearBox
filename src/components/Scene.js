"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import AudioToggleButton from "./AudioToggleButton";
import { useClerk } from "@clerk/clerk-react";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const ThreeDScene = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const modelRef = useRef(null);
  const isInteracting = useRef(false);
  const lastMouseX = useRef(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const { openSignIn } = useClerk();

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(4, 2, 10);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // // Load HDRI environment map
    // const pmremGenerator = new THREE.PMREMGenerator(renderer);
    // const textureLoader = new THREE.TextureLoader();
    // textureLoader.load("/images/autoshop_01.jpg", (texture) => {
    //   const hdrTexture = pmremGenerator.fromEquirectangular(texture).texture;
    //   scene.background = hdrTexture;
    //   scene.environment = hdrTexture;
    // });

    // Lights setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const sunlight = new THREE.DirectionalLight(0xffffff, 15);
    sunlight.position.set(10, 10, 10);
    sunlight.castShadow = true;
    scene.add(sunlight);

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load(
      "/model/free_porsche_911_carrera_4s.glb",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        modelRef.current = model;

        model.position.set(4, 0, -1.5);
        model.scale.set(2.5, 2.5, 2.5);

        // Animate the model with automatic horizontal rotation
        const animate = () => {
          requestAnimationFrame(animate);

          // Apply automatic rotation if not interacting
          if (!isInteracting.current) {
            model.rotation.y += 0.005; // Adjust speed as desired
          }
          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // Orbit controls with restricted rotation and no panning
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2.5;
    controls.target.set(0, 0, 0);

    // Resize function
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", resizeCanvas);

    // Mouse events for manual rotation
    const handleMouseDown = (event) => {
      isInteracting.current = true;
      lastMouseX.current = event.clientX;
    };

    const handleMouseMove = (event) => {
      if (isInteracting.current && modelRef.current) {
        const delta = event.clientX - lastMouseX.current;
        modelRef.current.rotation.y += delta * 0.005;
        lastMouseX.current = event.clientX;
      }
    };

    const handleMouseUp = () => {
      isInteracting.current = false;
    };

    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseup", handleMouseUp);

    // Synchronize audioPlaying state with the audio element
    const audioElement = audioRef.current;
    const handlePlay = () => setAudioPlaying(true);
    const handlePause = () => setAudioPlaying(false);

    if (audioElement) {
      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
    }

    return () => {
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      scene.clear();
      controls.dispose();
      window.removeEventListener("resize", resizeCanvas);

      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseup", handleMouseUp);

      if (audioElement) {
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
      }
    };
  }, []);

  const handleAudioToggle = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div
      id="3d-container"
      className="relative w-full h-full overflow-hidden bg-black dark:bg-grid-small-white/[0.2] bg-grid-small-white/[0.2]"
    >
      <canvas ref={canvasRef} className="w-full h-full " />

      {/* Glass Effect Overlay with dynamic text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10  rounded-md max-w-[40%] mx-10 py-0 h-auto ">
        {/* Title with TextGenerateEffect */}
        <div className="text-2xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
          <TextGenerateEffect words="Revolutionize Vehicle Diagnostics with AI" />
        </div>
        {/* Description with TextGenerateEffect */}
        <div className="text-lg md:text-2xl text-yellow-400 max-w-2xl drop-shadow-md">
          <TextGenerateEffect words="Harness the power of artificial intelligence to diagnose vehicle performance issues quickly and accurately." />
        </div>

        {/* Clerk Login Button */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={() => openSignIn()}
            className="px-6 py-2 my-0 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transition"
          >
            Start GearBox
          </button>
        </div>
      </div>

      {/* Audio Toggle Button in the top-right corner */}
      <div className="absolute top-4 right-4 z-10">
        <AudioToggleButton
          audioPlaying={audioPlaying}
          handleAudioToggle={handleAudioToggle}
        />
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} loop>
        <source
          src="/audio/EnginesOnpororo.mp3"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default ThreeDScene;
