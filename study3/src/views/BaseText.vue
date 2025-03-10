<!-- 文字 -->
<template>
  <main id="canvas"></main>
</template>

<script setup>
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { onMounted } from 'vue'

THREE.Cache.enabled = true;

let container;
let camera, cameraTarget, scene, renderer;
let group, textMesh1, textMesh2, textGeo, materials;

let text = 'three.js', bevelEnabled = true, font = undefined;

const depth = 20,
  size = 70,
  hover = 30,
  curveSegments = 4,
  bevelThickness = 2,
  bevelSize = 1.5;

onMounted(() => {
  init()
})

function init() {
  container = document.createElement('div');
  const elemNode = document.getElementById('canvas');
  elemNode.appendChild(container);

  // CAMERA
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
  camera.position.set(0, 400, 700);

  cameraTarget = new THREE.Vector3(0, 150, 0);

  // SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 250, 1400);

  // LIGHTS
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0);
  pointLight.color.setHSL(Math.random(), 1, 0.5);
  pointLight.position.set(0, 100, 90);
  scene.add(pointLight);

  materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
  ];

  group = new THREE.Group();
  group.position.y = 100;

  scene.add(group);

  loadFont();

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true })
  );
  plane.position.y = 100;
  plane.rotation.x = - Math.PI / 2;
  scene.add(plane);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  animate();
}

function loadFont() {
  const loader = new FontLoader();
  loader.load('fonts/helvetiker_regular.typeface.json', function (response) {
    font = response;
    createText();
  });
}

function createText() {
  textGeo = new TextGeometry(text, {
    font: font,
    size: size,
    depth: depth,
    curveSegments: curveSegments,
    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelEnabled: bevelEnabled
  });

  textGeo.computeBoundingBox();

  const centerOffset = - 0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

  textMesh1 = new THREE.Mesh(textGeo, materials);

  textMesh1.position.x = centerOffset;
  textMesh1.position.y = hover;
  textMesh1.position.z = 0;

  textMesh1.rotation.x = 0;
  textMesh1.rotation.y = Math.PI * 2;

  group.add(textMesh1);

  textMesh2 = new THREE.Mesh(textGeo, materials);

  textMesh2.position.x = centerOffset;
  textMesh2.position.y = - hover;
  textMesh2.position.z = depth;

  textMesh2.rotation.x = Math.PI;
  textMesh2.rotation.y = Math.PI * 2;

  group.add(textMesh2);
}

//
function animate() {
  requestAnimationFrame(animate);
  camera.lookAt(cameraTarget);
  renderer.render(scene, camera);
}

</script>

<style scoped>
#canvas {
  width: 100vw;
  height: 100vh;
}
</style>