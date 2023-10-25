import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

gsap.registerPlugin(ScrollTrigger);

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//canvas
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 10);
scene.add(camera);

// adding light in the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 2, 0);
scene.add(directionalLight);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//controls for model and camera movement
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

// render 3D model
let mesh = null;
const loader = new GLTFLoader().setPath("public/");
loader.load("Bike.glb", (gltf) => {
  mesh = gltf.scene;
  //set the position of the model
  mesh.position.set(-6.5, -3.1, 0);

  //rotate the model horizontally
  mesh.rotation.y = Math.PI / 2.5;

  //mesh scale the model
  mesh.scale.set(6.2, 6.2, 6.2);

  scene.add(mesh);
});

window.addEventListener("resize", () => {
  let sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.render(scene, camera); // -> Also needed
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// const section = gsap.utils.toArray(".section");
// section.forEach((s) => {
//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: s,
//       pin: true,
//       pinSpacing: false,
//       scrub: 1,
//       markers: true,
//     },
//   });
//   tl.to(s, {
//     x: "100%",
//     duration: 1,
//     ease: "power2.inOut",
//   }).to(
//     mesh.position,
//     {
//       x: -3.5,
//       duration: 2,
//       ease: "power1.inOut",
//     },
//     "-=2"
//   );
// });

const masterTimeline = gsap.timeline();
masterTimeline.add(sections).add(bikeAnimation, 0);
