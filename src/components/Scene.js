import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Header from "./header";

const ThreeDScene = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const modelRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const lastMouseX = useRef(0);
  const [audioPlaying, setAudioPlaying] = useState(false);

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

    // Load HDRI environment map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/images/autoshop_01.jpg', (texture) => {
      const hdrTexture = pmremGenerator.fromEquirectangular(texture).texture;
      scene.background = hdrTexture;
      scene.environment = hdrTexture;
    });

    // Lights setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const sunlight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunlight.position.set(10, 10, 10);
    sunlight.castShadow = true;
    scene.add(sunlight);

    const fillLight = new THREE.PointLight(0xffffff, 0.8, 100);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0xffffff, 0.5, 50);
    backLight.position.set(0, 5, -10);
    scene.add(backLight);

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load('/model/free_porsche_911_carrera_4s.glb', (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      modelRef.current = model;

      model.position.set(0, 0, -1.5);
      model.scale.set(2, 2, 2);

      const animate = () => {
        requestAnimationFrame(animate);
        if (!isMouseDownRef.current) {
          model.rotation.y += 0.005;
        }
        renderer.render(scene, camera);
      };

      animate();
    }, undefined, (error) => {
      console.error('Error loading model:', error);
    });

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.target.set(0, 0, 0);

    // Resize function
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', resizeCanvas);

    // Synchronize audioPlaying state with the audio element
    const audioElement = audioRef.current;

    const handlePlay = () => setAudioPlaying(true);
    const handlePause = () => setAudioPlaying(false);

    if (audioElement) {
      audioElement.addEventListener('play', handlePlay);
      audioElement.addEventListener('pause', handlePause);
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
      window.removeEventListener('resize', resizeCanvas);

      // Remove audio event listeners
      if (audioElement) {
        audioElement.removeEventListener('play', handlePlay);
        audioElement.removeEventListener('pause', handlePause);
      }
    };
  }, []);

  const handleAudioToggle = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleMouseDown = (event) => {
    isMouseDownRef.current = true;
    lastMouseX.current = event.clientX;
  };

  const handleMouseMove = (event) => {
    if (isMouseDownRef.current && modelRef.current) {
      const delta = event.clientX - lastMouseX.current;
      modelRef.current.rotation.y += delta * 0.005;
      lastMouseX.current = event.clientX;
    }
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
  };

  return (
    <div
      id="3d-container"
      className="relative w-full h-screen overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Header Component */}
      <Header
        audioPlaying={audioPlaying}
        handleAudioToggle={handleAudioToggle}
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Revolutionize Vehicle Diagnostics with AI
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-2xl drop-shadow-md">
          Harness the power of artificial intelligence to diagnose vehicle performance issues quickly and accurately.
        </p>
        <button className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} loop>
        <source src="public/audio/modern-and-futuristic-beats-15s-237355.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default ThreeDScene;
