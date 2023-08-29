import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const mainScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / 600,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, 684);
document.getElementById("hero").appendChild(renderer.domElement);

let gltfObject; // Declare a variable to hold the loaded GLTF object

new GLTFLoader().load(
  "/Portfolio/videograph-master/gltf/laptop.glb",
  function (gltf) {
    gltfObject = gltf.scene; // Store the loaded object for later access
    gltfObject.position.set(0, 0, 0);

    mainScene.add(gltfObject);

    camera.position.set(3.46, 2.77, -2.45);
    camera.lookAt(gltfObject.position);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    mainScene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-1, 2, 1);
    mainScene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(mainScene, camera);
    };

    animate();
  }
  // Progress and error handlers...
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false; // Disable zoom
controls.enablePan = false; // Disable panning

const rotateSpeed = 0.005; // Adjust the rotation speed as needed

const animate = () => {
  if (gltfObject) {
    gltfObject.rotation.y += rotateSpeed; // Rotate the loaded object
  }

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(mainScene, camera);
};

animate();
renderer.setClearColor(0x000000, 0); // the default
