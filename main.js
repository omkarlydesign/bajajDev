import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

gsap.registerPlugin(ScrollTrigger);

// sizes
let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// camera
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

// camera and rotation controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.enableZoom = false;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

const textureLoader = new THREE.TextureLoader();
const bgImg = textureLoader.load("images/city.jpg");
renderer.setClearColor(0x000000, 1); // Set clear color to black with alpha 0
scene.background = bgImg;

// render 3D model
let mesh = null;
const loader = new GLTFLoader().setPath("public/");

function loadModelDesktop() {
  loader.load("Bike.glb", (gltf) => {
    mesh = gltf.scene;
    //set the position of the model
    mesh.position.set(-6.5, -3.1, 0);

    //rotate the model horizontally
    mesh.rotation.y = Math.PI / 2.4;

    //mesh scale the model
    mesh.scale.set(6.2, 6.2, 6.2);

    scene.add(mesh);
  });
}

function loadModelTablet() {
  loader.load("Bike.glb", (gltf) => {
    mesh = gltf.scene;
    //set the position of the model
    mesh.position.set(-4.5, -3.1, 0);

    //rotate the model horizontally
    mesh.rotation.y = Math.PI / 2.4;

    //mesh scale the model
    mesh.scale.set(4.2, 4.2, 4.2);

    scene.add(mesh);
  });
}
// loader.load("Bike.glb", (gltf) => {
//   mesh = gltf.scene;
//   //set the position of model
//   mesh.position.set(-6.5, -4.1, 0);

//   //rotate the model horizontal
//   mesh.rotation.y = Math.PI / 2.4;

//   mesh.scale.set(6.2, 6.2, 6, 2);

//   scene.add(mesh);
//   //   gsap.to(mesh.position, {
//   //     x: -6.88,
//   //     duration: 3,
//   //     ease: "power1.inOut",
//   //     scrollTrigger: {
//   //       trigger: ".section",
//   //       start: "top center",
//   //       end: "bottom center",
//   //       scrub: true,
//   //     },
//   //   });
//   //   gsap.to(".info1", {
//   //     y: -100,
//   //     duration: 3,
//   //     ease: "power2.inOut",
//   //   });
// });

function loadModelMobile() {
  loader.load("Bike.glb", (gltf) => {
    mesh = gltf.scene;
    //set the position of the model
    mesh.position.set(-2.5, -3.1, 0);

    //rotate the model horizontally
    mesh.rotation.y = Math.PI / 2.4;

    //mesh scale the model
    mesh.scale.set(3.2, 3.2, 3.2);

    scene.add(mesh);
  });
}

// responsiveness
// window.addEventListener("resize", () => {
//   sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//   };
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();
//   renderer.setSize(sizes.width, sizes.height);
// });

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
  const windowWidth = window.innerWidth;
  if (windowWidth === 320) {
    loadModelMobile();
  } else if (windowWidth === 768) {
    loadModelTablet();
  } else if (windowWidth === 1440) {
    loadModelDesktop();
  }
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
