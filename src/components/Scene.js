import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import AudioToggleButton from "./AudioToggleButton";  // Import the button component

const ThreeDScene = () => {
  const canvasRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);  // Default audio state is playing
  const audioRef = useRef(null);  // Reference for audio element
  const modelRef = useRef(null);  // To reference the 3D model for manual rotation
  const isMouseDownRef = useRef(false);  // Track if mouse is being held down for rotation
  const lastMouseX = useRef(0);  // Store last mouse X position for smooth rotation calculation

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup (fixed position and angle)
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4, 2, 6);  // Camera fixed at (4, 2, 6)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Apply tone mapping for realistic lighting
    renderer.toneMappingExposure = 1.0; // Adjust exposure for daylight look
    document.getElementById("3d-container").appendChild(renderer.domElement);

    // Load HDRI environment map for realistic lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const textureLoader = new THREE.TextureLoader();
    const environmentTexture = textureLoader.load('/images/autoshop_01.jpg', () => {
      const hdrTexture = pmremGenerator.fromEquirectangular(environmentTexture).texture;
      scene.background = hdrTexture; // Set background to HDRi for environment
      scene.environment = hdrTexture; // Set environment for reflections and lighting
    });

    // Lights setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Increased intensity for a brighter scene
    scene.add(ambientLight);

    const sunlight = new THREE.DirectionalLight(0xffffff, 1.5); // White light for daylight
    sunlight.position.set(10, 10, 10); // Position to simulate sunlight at an angle
    sunlight.castShadow = true; // Enable shadows
    scene.add(sunlight);

    const fillLight = new THREE.PointLight(0xffffff, 0.8, 100); // Soft fill light for overall brightness
    fillLight.position.set(-5, 3, -5); // Behind and slightly below the model
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0xffffff, 0.5, 50); // Additional back light (rim light)
    backLight.position.set(0, 5, -10); // Positioned behind the model
    scene.add(backLight);

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load('/model/free_porsche_911_carrera_4s.glb', (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      modelRef.current = model;  // Store the model reference for manual rotation

      // Position the car at ground level (y=0) and adjust the scale to life-size
      model.position.set(0, 0, -1.5);  // Place car at ground level
      model.scale.set(3, 3, 3); // Assuming the model is already at life size; adjust if needed.
      
      const animate = () => {
        requestAnimationFrame(animate);
        if (!isMouseDownRef.current) {
          model.rotation.y += 0.005; // Auto-rotate the car when not manually rotating
        }
        renderer.render(scene, camera);
      };

      animate();
    }, undefined, (error) => {
      console.error('Error loading model:', error);
    });

    // Orbit controls for user interaction (rotation only)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    // Disable panning and zooming
    controls.enablePan = false;  // Disable panning (no movement of the camera)
    controls.enableZoom = false; // Disable zooming (camera zoom stays fixed)
    controls.enableRotate = true;  // Allow rotation but only on the Y-axis (horizontal)

    // Keep the camera's target at the center of the car
    controls.target.set(0, 0, 0); // Make sure the camera always looks at the car at the origin

    // Resize function for responsiveness
    const resizeCanvas = () => {
      renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
      camera.aspect = window.innerWidth / (window.innerHeight * 0.8);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', resizeCanvas);

    // Start playing audio automatically when the scene is loaded
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
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
    };
  }, []);

  const [isManualRotation, setIsManualRotation] = useState(false);  // Track if the user is rotating the car manually

  const handleAudioToggle = () => {
    if (audioPlaying) {
      audioRef.current.pause(); // Pause audio if it's playing
    } else {
      audioRef.current.play();  // Play audio if it's not playing
    }
    setAudioPlaying(!audioPlaying);  // Toggle audio state
  };

  const handleMouseDown = (event) => {
    isMouseDownRef.current = true;
    lastMouseX.current = event.clientX; // Store initial mouse X position
  };

  const handleMouseMove = (event) => {
    if (isMouseDownRef.current && modelRef.current) {
      const delta = event.clientX - lastMouseX.current; // Calculate the horizontal movement delta
      modelRef.current.rotation.y += delta * 0.005;  // Adjust rotation speed
      lastMouseX.current = event.clientX; // Update the last mouse position
    }
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
  };

  return (
    <div id="3d-container" style={{ width: '100%', height: '80vh', maxWidth: '1440px', margin: '0 auto', position: 'relative' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      
      {/* Audio Toggle Button */}
      <AudioToggleButton audioPlaying={audioPlaying} handleAudioToggle={handleAudioToggle} />
      
      {/* Hidden audio element */}
      <audio ref={audioRef} loop>
        <source src="/audio/modern-and-futuristic-beats-15s-237355.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default ThreeDScene;
