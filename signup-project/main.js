import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  axisHelper,
  axisHelperName,
  gridHelper,
  gridHelperName,
  polarGridHelper,
  polarGridHelperName,
} from "./helpers/helpers";
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Get canvas element
const canvas = document.getElementById('d-canvas');

// Basic scene setup
const scene = new THREE.Scene();
scene.background = null;

//grid helper
// gridHelper(scene)
axisHelper(scene)

// Camera setup
const aspect = canvas.offsetWidth / canvas.offsetHeight;
const camera = new THREE.OrthographicCamera(-5 * aspect, 5 * aspect, 5, -5, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.zoom = 1;
camera.updateProjectionMatrix();

// Rotate camera 45 degrees
camera.rotation.order = 'YXZ';
camera.rotation.y = Math.PI / 8;

// Add box to scene
// const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
// const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff22 });
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);


// Load GLTF model
const loader = new GLTFLoader();
let model;
let spade;
let club;
let sphere;
let diamond;

// chip
loader.load('/models/pokerassets.glb', 
  function(gltf) {
    model = gltf.scene;
    model.position.set(0.1, 0, 0.1);
    model.scale.set(2,2,2);
    model.castShadow = true;
    model.rotation.y = 5 * Math.PI / 4;
    visitChildren(model, (child) => {
      if (child.material) {
        child.material.depthWrite = true;
      }
    });
    scene.add(model);
    animate();
  },
  undefined,
  function(error) {
    console.error('An error happened', error);
  }
);

//spade
loader.load('/models/spade.glb', 
  function(gltf) {
    spade = gltf.scene;
    spade.position.set(2, 5, 0.1);
    spade.rotation.y = 3* Math.PI / 4;
    spade.scale.set(0.5,0.5,0.5)
    spade.castShadow = true;
    visitChildren(model, (child) => {
      if (child.material) {
        child.material.depthWrite = true;
      }
    });
    scene.add(spade);
    animate();
  },
  undefined,
  function(error) {
    console.error('An error happened', error);
  }
);

//club
loader.load('/models/club.glb', 
  function(gltf) {
    club = gltf.scene;
    club.position.set(-5, -3, 1);
    club.rotation.y = 3* Math.PI / 4;
    club.scale.set(1,1,1)
    club.castShadow = true;
    visitChildren(model, (child) => {
      if (child.material) {
        child.material.depthWrite = true;
      }
    });
    scene.add(club);
    animate();
  },
  undefined,
  function(error) {
    console.error('An error happened', error);
  }
);

//sphere
loader.load('/models/sphere.glb', 
  function(gltf) {
    sphere = gltf.scene;
    sphere.position.set(-5, 2, 0);
    sphere.rotation.y = 3* Math.PI / 4;
    sphere.scale.set(1,1,1)
    sphere.castShadow = true;
    visitChildren(model, (child) => {
      if (child.material) {
        child.material.depthWrite = true;
      }
    });
    scene.add(sphere);
    animate();
  },
  undefined,
  function(error) {
    console.error('An error happened', error);
  }
);

//diamond
loader.load('/models/diamond.glb', 
  function(gltf) {
    diamond = gltf.scene;
    diamond.position.set(4, -2, -1);
    diamond.rotation.y = 4* Math.PI / 4;
    diamond.scale.set(1,1,1)
    diamond.castShadow = true;
    visitChildren(model, (child) => {
      if (child.material) {
        child.material.depthWrite = true;
      }
    });
    scene.add(diamond);
    animate();
  },
  undefined,
  function(error) {
    console.error('An error happened', error);
  }
);
// Add light to scene
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.castShadow = true;
light.position.set(0, 10, 0);
scene.add(light);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
document.getElementById('d-canvas').appendChild(renderer.domElement);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
controls.enablePan = false;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2;

// Function to visit all children of a model
function visitChildren(object, callback) {
  object.traverse((child) => {
    callback(child);
  });
}

// Transform equation to linearly transform range from 0-1 to 3-5
function transformequ(num) {
  return 2 * num + 3;
}

let onPassword = false;
//input password
let password = document.getElementById("Password");

password.addEventListener("focus",function () {
  onPassword = true;
})
password.addEventListener("blur",function () {
  onPassword = false;
})


// Animation loop
let step = 0;
const animate = function() {
  if (onPassword == false) {
    step += 0.004;
  }
  model.rotation.y = 0.5 * Math.cos(step);
  model.rotation.x = 0.5 * Math.sin(step);
  spade.rotation.y = 0.5 * Math.cos(step);
  diamond.rotation.y = 0.5 * Math.cos(step);
  club.rotation.x = 0.5 * Math.cos(step);
  club.rotation.z = 0.5 * Math.cos(step);
  sphere.rotation.z = 0.5 * (Math.cos(step)-0.3);
  sphere.rotation.x = 0.5 * (Math.cos(step)-0.3);


  requestAnimationFrame(animate);
  controls.update();
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
