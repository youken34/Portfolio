import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/DRACOLoader.js";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
);
dracoLoader.preload();

const loadingManager = new THREE.LoadingManager();

const progressBar = document.getElementById("progress-bar");

loadingManager.onProgress = function (url, loaded, total) {
  progressBar.value = (loaded / total) * 100;
};

const progressBarContainer = document.querySelector(".progress-bar-container");
loadingManager.onLoad = function () {
  progressBarContainer.style.display = "none";
};

const loader = new GLTFLoader(loadingManager);
loader.setDRACOLoader(dracoLoader);

const mainScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000); // Use 1 for initial aspect ratio, it will update later
const renderer = new THREE.WebGLRenderer({ alpha: true });

// Initially set size to 100% width and height
renderer.setSize("100%", "100%");

document.getElementById("laptop").appendChild(renderer.domElement);
renderer.domElement.style.position = "relative";
renderer.domElement.style.backgroundColor = "rgb(88, 44, 193)";
let gltfObject; // Declare a variable to hold the loaded GLTF object

loader.load(
  "/../videograph-master/gltf/gaming_laptop.glb",
  function (gltf) {
    gltfObject = gltf.scene; // Store the loaded object for later access
    gltfObject.position.set(0, -1, 0);

    mainScene.add(gltfObject);

    camera.position.set(3.46, 2.77, -2.45);
    camera.lookAt(gltfObject.position);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    mainScene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-1, 2, 1);
    directionalLight.intensity = 2;
    mainScene.add(directionalLight);
  },
  function (xhr) {
    // console.log((xhr.loaded / xhr.total) * 100 + "loaded");
  },
  function (error) {
    console.log(error);
  }
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false; // Disable zoom
controls.enablePan = false; // Disable panning
controls.enableRotate = false;

const rotateSpeed = 0.005; // Adjust the rotation speed as needed

const animate = () => {
  if (gltfObject) {
    gltfObject.rotation.y += rotateSpeed; // Rotate the loaded object
  }

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(mainScene, camera);
};

// Function to update renderer size
const updateRendererSize = () => {
  const container = document.getElementById("laptop"); // Get the container element

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // Set renderer size based on the container's width and height
  renderer.setSize(containerWidth, containerHeight);

  // Update camera aspect ratio based on the container's dimensions
  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix(); // Update the camera's projection matrix to match the new aspect ratio
};

// Initial size update
updateRendererSize();

// Update size on window resize
window.addEventListener("resize", updateRendererSize);

animate();
renderer.setClearColor(0x000000, 0); // Set default clear color
