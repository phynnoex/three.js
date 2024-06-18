import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
//canvas
const canvas = document.getElementById

// Basic scene setup
const scene = new THREE.Scene();
scene.background = null;
// scene.fog = new THREE.Fog(0x000000, 10, 100);


// Camera setup
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(-5 * aspect, 5 * aspect, 5, -5, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.zoom = 1;
camera.updateProjectionMatrix();

// Rotate camera 45 degrees
camera.rotation.order = 'YXZ';
camera.rotation.y = Math.PI / 8;

const boxGeometry = new THREE.BoxGeometry(4, 4, 4)
const boxMaterial = new THREE.MeshStandardMaterial(
  {color: 0xffff22}
)
const box = 
// Add light
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.castShadow = true;
light.position.set(0, 10, 0);
scene.add(light); // Ensure the light is added to the scene



// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
document.getElementById('app').appendChild(renderer.domElement);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
controls.enablePan = false;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2; // Corrected to allow better control

// Handle mouse move
window.addEventListener('mousemove', (event) => {
  if (!model) return; // Ensure model is loaded
  let ratiox = event.clientX / window.innerWidth;
  let ratioy = event.clientY / window.innerHeight;
  model.rotation.y = transformequ(ratiox) * Math.cos(Math.PI / 12);
});

// Transform equation to linearly transform range from 0-1 to 3-5
function transformequ(num) {
  return 2 * num + 3;
}

// Animation loop
let step = 0;
const animate = function() {
  step += 0.04;
  if (model) {
    model.position.y = 0.5 * Math.cos(step);
  }

  requestAnimationFrame(animate);
  controls.update(); // Only required if controls.enableDamping or controls.autoRotate are set to true
  renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = -5 * aspect;
  camera.right = 5 * aspect;
  camera.top = 5;
  camera.bottom = -5;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation loop
animate();
